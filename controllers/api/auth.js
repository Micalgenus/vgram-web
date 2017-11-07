/**
 * Created by KIMSEONHO on 2017-01-10.
 */
"use strict";

const crypto = require('crypto'),
  models = require('../../models'),
  user = models.user,
  moment = require("moment"),
  _ = require('lodash'),
  mailgun = require('../../config/mailgun'),
  mailchimp = require('../../config/mailchimp'),
  config = require('../../config/main'),
  genToken = require("../../utils/genToken");


/**
 * passport의 LocalStrategy(ID, Password)를 이용함
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

//------------------------------------------
//  로그인
//------------------------------------------
exports.login = function (req, res, next) {
}
// exports.login = function(req, res, next) {

//    let userInfo = genToken.setUserInfo(req.user);   // passport에서 받은 object

//    res.append('Authorization', 'Bearer ' + genToken.generateUserToken(userInfo));
//    res.cookie('Authorization', 'Bearer ' + genToken.generateUserToken(userInfo));

//    return res.status(201).json({
//       id_token: 'Bearer ' + genToken.generateUserToken(userInfo),
//       user: userInfo,    // password가 hash로 오기 때문에,
//       statusCode: 1
//    });
// }

exports.setToken = function (req, res, next) {
  // delete unused property to reduce cookie character
  req.user.profile = _.omit(req.user.profile,
    ['given_name', 'family_name', 'picture_large', 'context', 'age_range', 'devices',
      'favorite_teams', 'name_format']);  // 페이스북 불필요 prop 삭제

  let userToken = genToken.generateToken(req.user.profile); // passport에서 받은 object

  // header와 cookies에 id_token을 붙여서 전송
  res.clearCookie('authorization');
  res.clearCookie('access_token');
  res.clearCookie('user_profile_token');

  // cdn.auth0.com/js/lock/10.18.0/lock.min.js:9 Set-Cookie header is ignored in response from
  // url: http://localhost:3000/auth/login-callback?code=fKx9Jp018uW-K1cT.
  // Cookie length should be less than or equal to 4096 characters.
  // res.cookie('authorization', [req.user.tokenType, userToken].join(" "));

  let token = null;
  if (req.user.idToken) {
    token = [req.user.tokenType, req.user.idToken].join(" ");
  } else {
    token = [req.user.tokenType, userToken].join(" ");
  }

  res.cookie('authorization', token);
  res.cookie('access_token', req.user.accessToken);
  res.cookie('user_profile_token', userToken);

  return res.json({
    token: token
  });
}

exports.checkUser = function (req, res, next) {
  return User.findOne({
    where: {
      auth0_user_id: req.user.profile.user_id
    }
  }).then(function (u) {
    // exist user(기존 회원 로그인)
    if (u) return next();

    let info = req.user.profile;

    /**
     * ID/PWD 방식의 경우 user_metadata, app_metadata가 있으나
     * SNS 연동 방식의 경우 두 정보가 없기 때문에 예외처리가 필요하다
     * 자세한 user object 정보는 auth0 tester client로 확인이 가능함
     * 각 회원가입방법별로 object 모양이 다르기 때문에 SNS 로그인 기능 추가 지원시
     * 코드수정, 예외처리가 중요할 것 같다
     * SNS 로그인의 경우 전화번호, 국가, 취미, 친구목록, 성별등 다양한 정보가 나오기 때문에
     * 향후 기능 연동이 가능 할 것 같다.
     * https://manage.auth0.com/#/connections/database
     * https://manage.auth0.com/#/connections/social
     */
    let userInfo = {
      email: info.email,
      member_type: info.app_metadata ? (info.app_metadata.roles[0] || value.memberType.PUBLIC) : value.memberType.PUBLIC,
      nickname: info.user_metadata ? (info.user_metadata.nickname || info.nickname) : info.nickname,
      user_status: info.app_metadata ? (info.app_metadata.user_status || 1) : 1,  // -1 : 탈퇴요청, 0 : 휴면, 1 : 활성
      telephone: "",
      createdAt: moment(info.created_at).format('YYYY-MM-DD'),
      auth0_user_id: info.user_id,
      locale: info.user_metadata ? info.user_metadata.locale : value.langCode["ko-kr"].codes[1],   // ko-kr
      profile_image_path: info.user_metadata ? info.user_metadata.profile_image_path : info.picture,
      updatedAt: moment(info.updated_at).format('YYYY-MM-DD'),
      meta_value: {
        registered_number: "",
        address: {
          post_code: "",
          addr1: "",
          addr2: "",
          detail: "",
          extra_info: ""
        },
        point: 0,
        user_name: "",
        owner_name: "",
        business_type: "",
        comment: "",
        phone_number: "",
        sns: {
          "website": "",
          "facebook": "",
          "instagram": "",
          "blog": "",
          "twitter": ""
        }
      }
    };
    return User.create(userInfo).then(function (newUser) {
      userInfo.ID = newUser.ID;
      // req.user.profile.ID = newUser.ID;

      return auth.getAdminToken().then((token) => {
        let options = {
          method: 'PATCH',
          uri: config.auth0.IDENTIFIER + 'users/' + info.user_id,
          json: {
            user_metadata: {
              nickname: userInfo.nickname,
              telephone: userInfo.telephone,
              profile_image_path: info.picture,
              locale: userInfo.locale,
              registered_number: userInfo.meta_value.registered_number,
              address: {
                post_code: userInfo.meta_value.address.post_code,
                addr1: userInfo.meta_value.address.addr1,
                addr2: userInfo.meta_value.address.addr2,
                detail: userInfo.meta_value.address.detail,
                extra_info: userInfo.meta_value.address.extra_info
              },
              username: userInfo.meta_value.user_name,
              business_type: userInfo.meta_value.business_type,
              comment: "",
              phone_number: userInfo.meta_value.telephone,
              sns: {
                "website": "",
                "facebook": "",
                "instagram": "",
                "blog": "",
                "twitter": ""
              }
            },
            app_metadata: {
              roles: [
                userInfo.member_type
              ],
              user_status: userInfo.user_status,
              updated_at: userInfo.updatedAt,
              point: userInfo.meta_value.point,
              owner_name: userInfo.meta_value.owner_name,
              ID: userInfo.ID,
            }
          },

          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        };

        return requestp(options).then(function (body) {
          req.user.profile.ID = body.app_metadata.ID;
          return models.Sequelize.Promise.resolve();
        });
      });
    });
  }).then((newUser) => {
    return next();
  }).catch(next);
}

//------------------------------------------
//  로그아웃
//------------------------------------------
exports.logout = function (req, res, next) {
}

//------------------------------------------
// 회원가입
//------------------------------------------
exports.register = function (req, res, next) {
}

/**
 * 회원탈퇴
 * @param req
 * @param res
 * @param next
 */
exports.quit = function (req, res, next) {
}
// exports.register = function(req, res, next) {

//    // Check for registration errors
//    const email = req.body.email;
//    const password = req.body.password;
//    const member_type = req.body.member_type;
//    //사업자는 전화번호 필수로
//    let telephone = req.body.telephone;

//    //init
//    if(telephone === undefined ){
//       telephone = '';
//    }

//    // Return error if no email provided
//    if (!email) {
//       return res.status(400).send({
//          errorMsg: 'You must enter an email address.',
//          statusCode: -1
//       });
//    }

//    // Return error if no password provided
//    if (!password) {
//       return res.status(400).send({errorMsg: 'You must enter a password.', statusCode: -1});
//    }

//    // Return error if no member_type provided
//    if (!member_type) {
//       return res.status(400).send({
//          errorMsg: 'You must enter an member_type.',
//          statusCode: -1
//       });
//    }

//    // Return error if no telephone provided
//    if (member_type ==='BUSINESS' && !telephone) {
//       return res.status(400).send({errorMsg: 'You must enter a telephone.', statusCode: -1});
//    }
//    //이메일로 조회
//    return user.findOne({
//       where: {
//          email: email
//       }
//    }).then(function (existingUser) {
//       if (existingUser) {  // If user is not unique, return error
//          return res.status(400).send({
//             errorMsg: 'That email address is already in use.',
//             statusCode: 2
//          });
//       } else {     // If email is unique and password was provided, create account
//          let user = {
//             email: email,
//             password: password,
//             member_type: member_type,
//             telephone: telephone
//          };

//          // 회원 가입시
//          user.create(user).then(function (newUser) {
//             // Respond with JWT if user was created
//             let userInfo = genToken.setUserInfo(newUser);
//             let token = 'Bearer ' + genToken.generateUserToken(userInfo);
//             res.append('Authorization', token);

//             return res.status(201).json({
//                id_token: token,
//                user: userInfo,
//                status: 1
//             });
//          }).catch(function (err) {    // end Member.create
//             if (err) {
//                res.status(422).json({errorMsg: 'Internal Error', statusCode: 9});
//             }
//          });
//       }
//    }).catch(function (err) {    // end Member.findOne
//       if (err) {
//          return next(err);
//       }
//    });
// }

//------------------------------------------
//  탈퇴
//------------------------------------------
// exports.quit = function (req, res, next) {

//    //탈퇴버튼 누를시 req_drop_data에 현재 시간과 user_status에 0을 넣음
//    const email = req.body.email;
//    const day = moment.utc().format('YYYY-MM-DD HH:mm:ss');
//    let token = req.headers['authorization'];

//    if(!token){
//       return res.status(400).json({
//          errorMsg: 'Do not have a token',
//          statusCode: -1
//       });
//    }

//    if (!email) {
//       return res.status(400).send({
//          errorMsg: 'You must enter an email address.',
//          statusCode: -2
//       });
//    }
//    //이메일과 user상태가 1(활성화된 사람)을 찾아서 update문을 날림.
//    return user.findOne({
//       where: {
//          email: email,
//          user_status: 1
//       }
//    }).then(function (existingUser) {
//       if (existingUser) {  // If user is not unique, return error
//          models.sequelize.query("update user set user_status = -1, updated_date = ?  where email = ?", {
//                replacements: [day, email]
//          }).then(function (result) {
//             return res.status(200).json({
//                msg: 'Clear update user quit',
//                statusCode: 1
//             });
//          }).catch(function(err) {
//             if (err) {
//                return res.status(401).json({
//                   errorMsg: 'DB error.',
//                   statusCode: 9
//                });
//             }
//          });
//       } else {     // If email is unique and password was provided, create account
//          return res.status(401).json({
//             errorMsg: 'do not have user in DB.',
//             statusCode: -2
//          });
//       }
//    }).catch(function (err) {
//       if (err) {
//          return res.status(401).json({
//             errorMsg: 'DB error.',
//             statusCode: 9
//          });
//       }
//    });
// }

//------------------------------------------
//이메일을 받으면 정보와 메타데이터를 전송 하는 api
//------------------------------------------
// exports.info = function(req, res, next) {

//    const email = req.body.email;
//    //여기서는 client -> server 토근 날려줌
//    //server- >client로는 토큰 X

//    // Return error if no email provided
//    if (!email) {
//       return res.status(400).json({
//          errorMsg: 'You must enter an email address.',
//          statusCode: -1
//       });
//    }

//    return models.sequelize.query("select * from user where email = (?)",
//       { replacements: [email],type: models.sequelize.QueryTypes.SELECT})
//    .then(function (data) {
//          if(data.length <= 0){   // not exist user
//             return res.status(401).json({
//                errorMsg: 'Email do not exist DB',
//                statusCode: 2
//             });
//          }else{                  // exist user
//             return res.status(201).json({
//                user_info: data,
//                status: 1
//             });
//          }
//       }).catch(function (err) {    // end select
//       if (err) {
//          return res.status(401).json({
//             errorMsg: 'DB error.',
//             statusCode: 9
//          });
//       }
//    });
// }

//------------------------------------------
//  회원정보 수정
//------------------------------------------
// exports.modifyInfo = function(req, res, next) {
//    // 회원정보 수정 되면 server -> client 토큰 필요
//    // 비밀번호 바뀌면 새로운 패스워드(new_password)로  토큰 만듬
//    // 비밀번호 안바뀌면 이전에 있던걸(password)로 토큰 만듬
//    const email = req.body.email;
//    const password = req.body.password;             //이전의 패스워드
//    const new_password = req.body.new_password;        //새로운 패스워드
//    let telephone = req.body.telephone;
//    let display_name = req.body.display_name;
//    let profile_image_path = req.body.profile_image_path;
//    let user_info = {};

//    let token = req.headers['authorization'];
//    //토큰 확인
//    if (!token) {
//       return res.status(400).json({
//          errorMsg: 'Do not have a token',
//          statusCode: -1
//       })
//    }
//    //이메일 확인
//    if (!email) {
//       return res.status(400).json({
//          errorMsg: 'You must enter an email address.',
//          statusCode: -1
//       });
//    }

//    //없을때 null로 초기화
//    if (telephone === undefined) {
//       telephone = null;
//    }
//    if (display_name === undefined) {
//       display_name = null;
//    }
//    if (profile_image_path === undefined) {
//       profile_image_path = null;
//    }

//    //새로운 패스워드가 없으면 비밀번호는 변경하지 않는다.
//    if (new_password === undefined || new_password === null || new_password.length <= 0) {
//       user_info = {
//          telephone: telephone,
//          display_name: display_name,
//          profile_image_path: profile_image_path
//       }
//    } else {    //비밀번호도 같이 변경
//       user_info = {
//          password: new_password,
//          telephone: telephone,
//          display_name: display_name,
//          profile_image_path: profile_image_path
//       }
//    }
//    //활성화가 되어있는 유저를 찾음
//    return user.findOne({
//       where: {
//          email: email,
//          user_status: 1
//       }
//    }).then(function (existingUser) {
//       //찾은경우에는 업데이트 실행
//       if(existingUser) {
//          return user.update(
//             user_info,
//             {where: {email: email, user_status: 1}}
//          ).then(function (result) {
//             // passport에서 받은 object
//             return user.findOne({
//                where: {
//                   email: email,
//                   user_status: 1
//                }
//             }).then(function (data){
//                let userInfo = genToken.setUserInfo(data);   // passport에서 받은 object

//                return res.status(200).json({
//                   id_token: 'Bearer ' + genToken.generateUserToken(userInfo),
//                   msg: 'update success',
//                   statusCode: 1
//                });
//             }).catch(function (err) {
//                if (err) {
//                   return res.status(401).json({
//                      errorMsg: 'DB select error',
//                      statusCode: -2
//                   });
//                }
//             })
//          }).catch(function (err) {
//             if (err) {
//                return res.status(401).json({
//                   errorMsg: 'DB update error',
//                   statusCode: -3
//                })
//             }
//          })
//       }else {
//          //아닌경우 유저가 없을경우
//          return res.status(402).json({
//             errorMsg: 'do not user in DB or quit user',
//             statusCode: -4
//          });
//       }
//    }).catch(function (err) {
//       if (err) {
//          return res.status(401).json({
//             errorMsg: 'DB first select error',
//             statusCode: -2
//          })
//       }
//    });
// }


//========================================
// Forgot Password Route   - 예전에 있던거 가져옴
//========================================
exports.forgotPassword = function (req, res, next) {
}
// exports.forgotPassword = function (req, res, next) {
//    const email = req.body.email;

//    return user.findOne({where: {email: email}}).then(function (existingUser) {
//       // If user is not found, return error
//       if (existingUser == null) {
//          res.status(422).json({errorMsg: 'Your request could not be processed as entered. Please try again.'});
//          return next(new Error("not matching, please check again."));
//       }

//       // If user is found, generate and save resetToken

//       // Generate a token with Crypto
//       crypto.randomBytes(48, function (err, buffer) {
//          const resetToken = buffer.toString('hex');
//          if (err) {
//             return next(err);
//          }

//          existingUser.resetPasswordToken = resetToken;
//          existingUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//          existingUser.save().then(function (user) {

//             const message = {
//                subject: 'Reset Password',
//                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//                'http://' + req.headers.host + '/reset-password/' + resetToken + '\n\n' +
//                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//             }

//             // Otherwise, send user email via Mailgun
//             mailgun.sendEmail(existingUser.email, message);

//             res.status(200).json({message: 'Please check your email for the link to reset your password.'});
//             next();
//          }).catch(function (err) {
//             // If error in saving token, return it
//             if (err) {
//                return next(err);
//             }
//          });
//       });
//    }).catch(function (err) {    //end Member.findOne
//       // If user is not found, return error
//       if (err) {
//          res.status(422).json({errorMsg: 'Your request could not be processed as entered. Please try again.'});
//          return next(err);
//       }
//    });
// }

//========================================
// Reset Password Route
//========================================
exports.verifyToken = function (req, res, next) {
}
