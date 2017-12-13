/**
 * Created by JHLee on 2017-01-25.
 */
"use strict";

const models = require('../../models');
const Post = models.post;
const User = models.user;
const Translation = models.icl_translation;
const Coordinate = models.coordinate;
const Address = models.address;
const Comment = models.comment;
const Media = models.media;
const Post_Media_relationship = models.post_media_relationship;

const _ = require('lodash');
const moment = require("moment");
const path = require("path");

const postCore = require('../core/post');
const Firebase = require('../core/firebase');

const genToken = require("../../utils/genToken");

const config = require("../../config/main");
var log = require('console-log-level')({
  prefix: function () {
    return new Date().toISOString()
  },
  level: config.logLevel
});


exports.getPostInfo = function (req, res, next) {
  return postCore.getPostInfo(req.params.postIdx).then(function (post) {
    if (post) return res.json(post);
    return res.status(404).json({
      errorMsg: 'post doesn\'t exist',
      statusCode: -1
    });
  });
};

exports.getPostComment = function (req, res, next) {

  let postIdx = req.params.postIdx;
  let page = req.params.commentListIdx;
  let count = req.query.count | 6;
  let index = count * (page - 1);
  return Comment.findAll({
    include: [{
      model: User,
      attributes: ["ID", "nickname"]
    }],
    where: {
      post_id: postIdx,
    },
    limit: count,
    offset: index,
  }).then(function (c) {
    if (c.length == 0) return res.status(404).json({
      errorMsg: 'overhead comment list',
      statusCode: -1
    });

    return res.status(200).json(c);
  });
}

exports.createPostComment = function (req, res, next) {
  var postIdx = req.params.postIdx;
  var comment = req.body.comment;
  var userIdx = req.user.ID;
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

  return Post.findOne({
    where: {
      ID: postIdx
    }
  }).then(function (p) {
    if (!p) {
      return res.status(404).json({
        errorMsg: 'post doesn\'t exist',
        statusCode: -1
      });
    }
    return Comment.create({
      post_id: postIdx,
      user_id: userIdx,
      content: comment,
      createdAt: createdAt
    }).then(function (c) {
      return res.json(c);
    });
  })
};

exports.deletePostComment = function (req, res, next) {
  var postIdx = req.params.postIdx;
  var commentIdx = req.params.commentIdx;
  var userIdx = req.user.ID;

  // userIdx가 존재하지 않는 경우(로그인 안된경우)
  if (!userIdx) {
    return res.status(401).json({
      errorMsg: 'please login.',
      statusCode: -1
    });
  }

  return Comment.findOne({
    where: {
      $and: {
        ID: commentIdx,
      }
    }
  }).then(function (c) {
    if (!c) {
      return res.status(404).json({
        errorMsg: 'comment doesn\'t exist',
        statusCode: -2
      });
    }

    // 다른 게시글의 번호
    if (c.post_id != postIdx) {
      return res.status(404).json({
        errorMsg: 'postIdx dosn\'t match',
        statusCode: -3
      });
    }

    // 다른사람이 작성한 댓글
    if (c.user_id != userIdx) {
      return res.status(401).json({
        errorMsg: 'userIdx dosn\'t match',
        statusCode: -4
      });
    }

    return Comment.destroy({
      where: {
        $and: {
          ID: commentIdx,
          post_id: postIdx,
          user_id: userIdx,
        }
      }
    }).then(function (numOfDeletedRow) {
      return res.status(200).json({
        statusCode: numOfDeletedRow
      });
    }).catch(function () {
      return res.status(400).json({
        errorMsg: 'failed to delete comment.',
        statusCode: -5
      });
    });
  });
};

exports.reEnrollPost = function (req, res, next) {
  var postIdx = req.params.postIdx;

  // userIdx가 존재하지 않는 경우(로그인 안된경우)
  if (!req.user.ID) {
    return res.status(401).json({
      errorMsg: 'please login.',
      statusCode: -1
    });
  }

  // postIdx 존재하지 않는 경우
  if (!postIdx) {
    return res.status(404).json({
      errorMsg: 'please enter postIdx.',
      statusCode: -2
    });
  }

  let updateData = {
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
  }

  return Post.update(updateData, {
    where: {
      $and: {
        ID: postIdx,
        user_id: req.user.ID
      }
    }
  }).then(function (p) {
    // 변경 성공
    if (p[0]) {
      return res.status(200).json({
        statusCode: 0
      });
    }

    return Post.findOne({
      where: {
        ID: postIdx
      }
    }).then(function (p) {
      // 게시글 존재하지 않음
      if (!p) {
        return res.status(400).json({
          errorMsg: 'post doesn\'t exist',
          statusCode: -3
        });
      }

      // 다른 회원의 게시글
      if (p.user_id != req.user.ID) {
        return res.status(400).json({
          errorMsg: 'userIdx dosn\'t match',
          statusCode: -4
        });
      }

      return res.status(400).json({
        errorMsg: 'failed to re enroll post.',
        statusCode: -5
      });
    }).catch(function () {
      return res.status(400).json({
        errorMsg: 'failed to re enroll post.',
        statusCode: -6
      });
    });
  }).catch(function (err) {
    return res.status(400).json({
      errorMsg: 'failed to re enroll post.',
      statusCode: -7
    });
  });
};

//공지사항 출력
exports.viewNotice = function (req, res) {
}
// exports.viewNotice = function (req, res) {
//   let pageSize, pageStartIndex;

//   // 페이지 정보 확인
//   if (!req.query.pageSize || !req.query.pageStartIndex) {
//     // query가 제대로 오지 않으면 초기값으로 보낸다.
//     pageSize = 10;
//     pageStartIndex = 0;
//   } else {
//     pageSize = _.toNumber(req.query.pageSize);
//     pageStartIndex = _.toNumber(req.query.pageStartIndex);
//   }
//   //공지사항 조회
//   return models.sequelize.query("select u.email, u.display_name, p.* " +
//     "from users as u, post as p where u.ID = p.user_id and p.post_type = 'notice' limit ?,?",
//     { replacements: [pageStartIndex, pageSize], type: models.sequelize.QueryTypes.SELECT }
//   ).then(function (noticeList) {
//     if (noticeList.length == 0) {
//       return res.status(400).json({
//         errorMsg: '정보 없음',
//         statusCode: -1
//       });
//     } else {
//       return res.status(200).json({
//         noticeList: noticeList,
//         statusCode: 1
//       });
//     }
//   }).catch(function (err) {
//     return res.status(400).json({
//       errorMsg: 'DB select error',
//       statusCode: -2
//     });
//   });
// }

exports.getPostList = function (req, res, next) {

  let page = req.params.postListIdx;
  let count = req.query.count | 6;
  let index = count * (page - 1);

  return Post.findAll({
    include: [{
      model: User
    }, {
      model: Comment,
      as: 'Comments',
      // attributes: ["ID", "post_id"]

      include: [{
        model: User,
        attributes: ["ID", "nickname"]
      }]
    }, {
      model: User,
      as: 'LikeUsers',
      attributes: ["ID"]
    }, {
      model: Media,
    }],
    limit: count,
    offset: index,
    order: [
      ['createdAt', 'DESC'],
      ['ID', 'DESC']
    ],
    where: {
      post_type: {
        $notIn: ['NOTICE', 'EVENT']
      }
    }
  }).then(function (p) {
    if (p.length == 0) return res.status(404).json({
      errorMsg: 'overhead postlist',
      statusCode: -1
    });

    // device별 path 변환
    for (let post of p) {
      for (let media of post.media) {
        media.file_path = media.getDevicePath(req.device.type);
      }

      post.thumbnail_image_path = JSON.parse(post.thumbnail_image_path);

      let images = [];
      for (let image of post.thumbnail_image_path[0].vrimages) {
        images.push([config.mediaUrl, image.thumb].join('/'));
      }
      post.thumbnail_image_path = images;
    }

    return res.json(p);
  });
}

exports.viewPost = function (req, res, next) {
}

exports.createPostInfo = function (req, res, next) {
  let profile = genToken.decodedToken(req.cookies['user_profile_token']);

  var postId = null;

  return models.sequelize.transaction(function (t) {
    return Post.create({
      user_id: req.user.ID,
      title: req.body.title,
      content: req.body.content,
      post_status: req.body.post_status,
      post_type: req.body.post_type,
      locale: profile.user_metadata.locale || profile.locale.toLowerCase(),
      meta_value: {
        written_device: '' // mobile??
      }
    }, { transaction: t }).then(function (post) {
      return Translation.create({
        element_id: post.ID,
        // element_type: "post", // ??
        group_id: 0,
        language_code: profile.user_metadata.locale || profile.locale.toLowerCase(),
      }, { transaction: t }).then(function (translation) {
        return Translation.update({
          group_id: translation.ID
        }, { where: { ID: translation.ID }, transaction: t }).then(function () {
          return Coordinate.create({
            translation_group_id: translation.ID,
            // region_code:
            lat: req.body.lat,
            lng: req.body.lng,
          }, { transaction: t }).then(function (coordinate) {
            return Address.create({
              translation_id: translation.ID,
              coordinate_id: coordinate.ID,
              // post_code:
              // region_code:
              addr1: req.body.addr1 || req.body.addr2,
              addr2: req.body.addr2 || req.body.addr1,
              detail: req.body.detail || req.body.addr1 || req.body.addr2,
              // extra_info:
              locale: translation.language_code,
              translation_group_id: translation.ID
            }, { transaction: t }).then(function (addr) {
              Firebase.notificationCreatePost(req.user, post);
              postId = post.ID;
            });
          });
        });
      });
    });
  }).then(function () {
    return postCore.getPostInfo(postId).then(function (p) {
      return res.json(p);
    });
  });
}

exports.modifyPostInfo = function (req, res, next) {
  let profile = genToken.decodedToken(req.cookies['user_profile_token']);

  if (!req.body.title) {
    return res.status(400).json({
      errorMsg: 'title doesn\'t exist',
      statusCode: -1
    });
  }

  if (!req.body.content) {
    return res.status(400).json({
      errorMsg: 'content doesn\'t exist',
      statusCode: -2
    });
  }

  if (!req.body.post_status) {
    return res.status(400).json({
      errorMsg: 'post_status doesn\'t exist',
      statusCode: -3
    });
  }

  if (!req.body.post_type) {
    return res.status(400).json({
      errorMsg: 'post_type doesn\'t exist',
      statusCode: -4
    });
  }

  if (!req.body.lat) {
    return res.status(400).json({
      errorMsg: 'lat doesn\'t exist',
      statusCode: -5
    });
  }

  if (!req.body.lng) {
    return res.status(400).json({
      errorMsg: 'lng doesn\'t exist',
      statusCode: -6
    });
  }

  if (!req.body.address1) {
    return res.status(400).json({
      errorMsg: 'address1 doesn\'t exist',
      statusCode: -7
    });
  }

  if (!req.body.address2) {
    return res.status(400).json({
      errorMsg: 'address2 doesn\'t exist',
      statusCode: -8
    });
  }

  return Post.findOne({
    where: {
      ID: req.params.postId
    }
  }).then(function (p) {
    if (!p) {
      return res.status(404).json({
        errorMsg: 'post doesn\'t exist',
        statusCode: -9
      });
    }

    if (p.user_id != req.user.ID) {
      return res.status(401).json({
        errorMsg: 'userIdx dosn\'t match',
        statusCode: -10
      });
    }

    return models.sequelize.transaction(function (t) {
      return Post.update({
        title: req.body.title,
        content: req.body.content,
        post_status: req.body.post_status,
        post_type: req.body.post_type,
        locale: profile.user_metadata.locale || profile.locale.toLowerCase(),
        meta_value: {
          written_device: ''
        }
      }, { where: { ID: req.params.postId }, transaction: t }).then(function (post) {

        return Translation.update({
          language_code: profile.user_metadata.locale || profile.locale.toLowerCase(),
        }, { where: { element_id: req.params.postId }, transaction: t }).then(function () {
          return Translation.findOne({
            where: {
              element_id: req.params.postId
            },
            transaction: t
          }).then(function (translation) {
            return Coordinate.update({
              lat: req.body.lat,
              lng: req.body.lng,
            }, { where: { translation_group_id: translation.ID }, transaction: t }).then(function () {
              return Coordinate.findOne({
                where: {
                  translation_group_id: translation.ID
                },
                transaction: t
              }).then(function (coordinate) {
                return Address.update({
                  addr1: req.body.address1,
                  addr2: req.body.address1,
                  detail: req.body.address2,
                }, { where: { coordinate_id: coordinate.ID }, transaction: t }).then(function (address) {
                  // Firebase.notificationCreatePost(req.user, post); // -> update로 변경해야함
                  return res.status(200).json({
                    ID: req.params.postId,
                    title: req.body.title,
                    content: req.body.content,
                    post_status: req.body.post_status,
                    post_type: req.body.post_type,
                    locale: profile.user_metadata.locale || profile.locale.toLowerCase(),
                    meta_value: {
                      written_device: ''
                    },

                    language_code: profile.user_metadata.locale || profile.locale.toLowerCase(),

                    lat: req.body.lat,
                    lng: req.body.lng,

                    addr1: req.body.address1,
                    addr2: req.body.address1,
                    detail: req.body.address2,
                  });
                });
              });
            });
          });
        });
      });
    }).catch(function (err) {
      return res.status(400).json({
        errorMsg: 'post update error',
        statusCode: -11
      });
    });
  });
}
exports.deletePost = function (req, res, next) {
  var postIdx = req.params.postIdx;

  // 유저 로그인 안됨
  if (!req.user.ID) {
    return res.status(401).json({
      errorMsg: 'please login.',
      statusCode: -1
    });
  }

  // 게시글 번호 받지 않음
  if (!postIdx) {
    return res.status(404).json({
      errorMsg: 'please enter postIdx.',
      statusCode: -2
    });
  }

  return Post.findOne({
    where: {
      $and: {
        ID: postIdx
      }
    }
  }).then(function (p) {
    // 게시글 존재 하지 않음
    if (!p) {
      return res.status(404).json({
        errorMsg: 'post doesn\'t exist',
        statusCode: -3
      });
    }

    // 다른사람의 게시글
    if (p.user_id != req.user.ID) {
      return res.status(401).json({
        errorMsg: 'userIdx dosn\'t match',
        statusCode: -4
      });
    }

    return Post.destroy({
      where: {
        ID: postIdx
      }
    }).then(function (p) {
      return res.status(200).json({
        statusCode: 0
      });
    }).catch(function () {
      return res.status(400).json({
        errorMsg: 'failed to delete post.',
        statusCode: -5
      });
    });
  });

}
exports.getPostInfoByIdx = function (req, res, next) {
  var idx = req.params.postIdx;

  return postCore.getPostInfo(idx).then(function (d) {
    return res.json({
      postId: d.post.ID,

      likeUserCount: d.post.LikeUsers.length,
      comments: d.comments,
      commentCount: d.commentCount,

      mediaUrl: config.mediaUrl,

      loginedUserId: req.user.logined ? req.user.ID : null,

      data: d
    });
  });
}

exports.searchPost = function (req, res, next) {

  // 페이지 정보 확인
  if (!req.query.pageSize || !req.query.pageStartIndex) {
    // query가 제대로 오지 않으면 초기값으로 보낸다.
    pageSize = 10;
    pageStartIndex = 0;
  } else {
    pageSize = _.toNumber(req.query.pageSize);
    pageStartIndex = _.toNumber(req.query.pageStartIndex);
  }
  //공지사항 조회
  return models.sequelize.query("select u.email, u.display_name, p.* " +
    "from users as u, post as p where u.ID = p.user_id and p.post_type = 'notice' limit ?,?",
    { replacements: [pageStartIndex, pageSize], type: models.sequelize.QueryTypes.SELECT }
  ).then(function (noticeList) {
    if (noticeList.length == 0) {
      return res.status(400).json({
        errorMsg: '정보 없음',
        statusCode: -1
      });
    } else {
      return res.status(200).json({
        noticeList: noticeList,
        statusCode: 1
      });
    }
  }).catch(function (err) {
    return res.status(400).json({
      errorMsg: 'DB select error',
      statusCode: -2
    });
  });
}

//2017-05-29 이정현 개발
// media, attached 파일정보 DB 저장
// media insert, post_media_relationship insert에 값 넣기
// return 은 상태코드만 날려주기
// url 접근 > api/post/normal-image
exports.createNormalImageInfo = function (req, res) {

  let token = req.headers['authorization'];
  //토큰 확인
  if (!token) {
    return res.status(400).json({
      errorMsg: 'Do not have a token',
      statusCode: -1
    });
  }

  let imageJSON;
  for (var key in req.body) {
    imageJSON = JSON.parse(key);
  }

  // let thumbnail_image_path = imageJSON.images[0].thumb;
  let medias = [];
  let m_relation = [];

  for (let i = 0; i < imageJSON.images.length; ++i) {

    let imageMetaValue = {
      mimetype: imageJSON.images[i].mimetype,
      size: imageJSON.images[i].size,
      desktop_dir: imageJSON.images[i].desktop_dir_name,
      mobile_dir: imageJSON.images[i].mobile_dir_name,
      original_dir: imageJSON.images[i].original_dir_name
    };

    medias.push({
      user_id: req.user.ID,
      type: imageJSON.images[i].type,
      date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "/medias/images/" + req.user.email,
      file_name: imageJSON.images[i].file_name,
      meta_value: imageMetaValue
    });
  }

  return models.sequelize.transaction(function (t) {
    return Media.bulkCreate(
      medias,
      { transaction: t, returning: true, individualHooks: true }).then(function (createMedia) {

        for (var i = 0; i < createMedia.length; ++i) {

          m_relation.push({
            post_id: imageJSON.postID,
            media_id: createMedia[i].ID
          });
        }

        return Post_Media_relationship.bulkCreate(
          m_relation,
          { transaction: t, returning: true, individualHooks: true });
      })
  }).then(function (result) {
    //정상적으로 되었을 경우
    res.status(200).json({
      statusCode: 1
    });

    return models.sequelize.Promise.resolve(result);
  }).catch(function (err) {
    //에러 발생했을 경우
    res.status(401).json({
      errorMsg: 'DB create error',
      statusCode: -1
    });

    return models.sequelize.Promise.reject(err);
  });
}

// vr 이미지 DB
exports.createVRImageVtourInfo = function (req, res, next) {

  let token = req.headers['authorization'];
  //토큰 확인
  if (!token) {
    return res.status(400).json({
      errorMsg: 'Do not have a token',
      statusCode: -1
    });
  }

  let vrJSON;
  for (var key in req.body) {
    vrJSON = JSON.parse(key);
  }

  let vrFilePath = "/medias/vrimages";
  let vtourPath = "/medias/vtours";

  let vrImages = [];
  let medias_relation = [];

  let post_vrimages = [];
  let post_thumb_image_path = [];

  // vrimage 정보 저장
  for (let i = 0; i < vrJSON.vrImages.length; ++i) {

    let vrType = vrJSON.vrImages[i].type;

    let vrImageMetaValue = {
      mimetype: vrJSON.vrImages[i].mimetype,
      size: vrJSON.vrImages[i].size,
      real_file_name: vrJSON.vrImages[i].real_file_name,
    };

    vrImages.push({
      user_id: req.user.ID,
      type: vrType,
      date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: vrFilePath + '/' + req.user.email,
      file_name: vrJSON.vrImages[i].file_name,
      meta_value: vrImageMetaValue
    });
  }

  return models.sequelize.transaction(function (t) {
    return Media.bulkCreate(
      vrImages, { transaction: t, returning: true, individualHooks: true }).then(function (vrimages) {

        // vrimage, vtour의 릴레이션을 표시하기위해서
        // post_media_relationship 테이블에 넣기 위해 JSON을 만드는 부분
        // 예제 >> { post_id : id , media_id : id }

        // vtour 정보 저장
        let vtourInfo = {
          user_id: req.user.ID,
          type: vrJSON.vtour.type,
          date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
          file_path: "/medias/vtours/" + vrJSON.vtour.file_path,
          file_name: vrJSON.vtour.file_name,
          meta_value: {
            tiles: [],
            thumbnail_image_name: vrJSON.vtour.thumbnail_image_name,  // 단일면 이미지
            preview_image_name: vrJSON.vtour.preview_image_name,  // 세로형 이미지(각 면->하나의 이미지)
            mobile_dir_name: vrJSON.vtour.mobile_dir_name  // 모바일용 이미지 저장 폴더 이름
          }
        };

        _.forEach(vrimages, (vrimage, i) => {
          medias_relation.push({
            post_id: vrJSON.postID,
            media_id: vrimage.ID
          });

          if (vrimage.type === "VR_IMAGE") {
            vtourInfo.meta_value.tiles.push({
              ID: vrimage.ID,
              dir_name: path.basename(vrimage.file_name, path.extname(vrimage.file_name)) + ".tiles"
            });
          }
        });

        return Media.create(
          vtourInfo, { transaction: t, returning: true, individualHooks: true }).then(function (vtour) {

            medias_relation.push({
              post_id: vrJSON.postID,
              media_id: vtour.ID
            });

            _.forEach(vtour.meta_value.tiles, (tile, i) => {
              post_vrimages.push({
                ID: tile.ID,
                thumb: vtour.file_path + '/panos/' + tile.dir_name + "/thumb.jpg"
              });
            });

            post_thumb_image_path.push({
              ID: vtour.ID,
              vrimages: post_vrimages
            })

            return Post_Media_relationship.bulkCreate(
              medias_relation,
              { transaction: t, returning: true, individualHooks: true }
            );
          });
      });
  }).then(() => {
    //정상 완료

    return Post.update({
      thumbnail_image_path: post_thumb_image_path,
    }, {
        where: {
          ID: vrJSON.postID
        }
      }).then(() => {
        res.status(200).json({
          statusCode: 1
        });
      });
  }).catch(next);
}


//게시글 출력
exports.viewPosts = function (req, res) {
  let pageSize, pageStartIndex;
  //이메일을 통해서 찜목록과 좋아요목록 조회를 함.
  const email = req.query.email;

  // 페이지 정보 확인
  if (!req.query.pageSize || !req.query.pageStartIndex) {
    // query가 제대로 오지 않으면 초기값으로 보낸다.
    pageSize = 10;
    pageStartIndex = 0;
  } else {
    pageSize = _.toNumber(req.query.pageSize);
    pageStartIndex = _.toNumber(req.query.pageStartIndex);
  }

  //post리스트를 조회
  return models.sequelize.query("select u.email, u.display_name, p.*, r.* from users as u, post as p, room as r " +
    "where u.ID = p.user_id and p.id = r.post_id and p.post_type = 'room' limit ?,?",
    { replacements: [pageStartIndex, pageSize], type: models.sequelize.QueryTypes.SELECT }
  ).then(function (postList) {
    //post정보가 없을때
    if (postList.length == 0) {
      return res.status(400).json({
        errorMsg: '정보 없음',
        statusCode: -1
      });
    } else {
      //만약 이메일이 없을 경우에는 찜목록이랑 좋아요 목록이 필요없음.
      if (!email) {
        return res.status(200).json({
          postList: postList,
          likeList: '',
          jjimList: '',
          statusCode: 1
        });
      } else {
        //이메일이 있는경우에는 찜목록이랑 좋아요 목록 필요
        //찜목록 조회
        return models.sequelize.query("select post_id from user_post_relationships where user_id = " +
          "(select ID from users where email= (?))",
          { replacements: [email], type: models.sequelize.QueryTypes.SELECT }
        ).then(function (jjimList) {
          //좋아요 목록 조회
          return models.sequelize.query("select post_id as post_like_id from user_post_like_relationships where user_id = " +
            "(select ID from users where email= (?))",
            { replacements: [email], type: models.sequelize.QueryTypes.SELECT }
          ).then(function (likeList) {
            // 모든 데이터를 Jsom으로 만들어서 전송
            return res.status(200).json({
              postList: postList,
              likeList: likeList,
              jjimList: jjimList,
              statusCode: 1
            });
          }).catch(function (err) {
            return res.status(400).json({
              errorMsg: 'DB 좋아요 select error',
              statusCode: -2
            });
          });
        }).catch(function (err) {
          return res.status(400).json({
            errorMsg: 'DB 찜하기 select error',
            statusCode: -2
          });
        });
      }
    }
  }).catch(function (err) {
    return res.status(400).json({
      errorMsg: 'DB room select error',
      statusCode: -2
    });
  });


}

//게시글 클릭시 룸 세부정보 볼수있게 하는 API
exports.viewRoomDetail = function (req, res) {

  const roomInfoIdx = req.params.roomInfoIdx;
  //이메일을 통해서 찜목록과 좋아요목록 조회를 함.
  const email = req.query.email;

  //룸 세부정보 조회
  return models.sequelize.query("select u.email, u.display_name, u.telephone, p.*, r.* " +
    "from users as u, post as p, room as r " +
    "where u.ID = p.user_id and p.id = r.post_id and p.id = (?) and p.post_type = 'room'",
    { replacements: [roomInfoIdx], type: models.sequelize.QueryTypes.SELECT }
  ).then(function (detailList) {
    //세부정보가 없을 때
    if (detailList.length == 0) {
      return res.status(400).json({
        errorMsg: '정보 없음',
        statusCode: -1
      });
    } else {
      //meida table에서 얻어오는 부분
      return models.sequelize.query("select * from medias where ID in (select media_id from post_media_relationships where post_id = (?))",
        { replacements: [roomInfoIdx], type: models.sequelize.QueryTypes.SELECT }
      ).then(function (mediasList) {
        //만약 이메일이 없을 경우에는 찜목록이랑 좋아요 목록이 필요없음.
        if (!email) {
          return res.status(200).json({
            detailList: detailList,
            mediasList: mediasList,
            jjimList: '',
            likeList: '',
            statusCode: 1
          });
        }
        else {
          //이메일이 있는경우에는 찜목록이랑 좋아요 목록 필요
          //찜목록 조회
          return models.sequelize.query("select post_id from user_post_relationships where user_id = " +
            "(select ID from users where email= (?))",
            { replacements: [email], type: models.sequelize.QueryTypes.SELECT }
          ).then(function (jjimList) {
            //좋아요 목록 조회
            return models.sequelize.query("select post_id as post_like_id from user_post_like_relationships where user_id = " +
              "(select ID from users where email= (?))",
              { replacements: [email], type: models.sequelize.QueryTypes.SELECT }
            ).then(function (likeList) {
              // 모든 데이터를 Jsom으로 만들어서 전송
              return res.status(200).json({
                detailList: detailList,
                mediasList: mediasList,
                jjimList: jjimList,
                likeList: likeList,
                statusCode: 1
              });
            }).catch(function (err) {
              return res.status(400).json({
                errorMsg: 'DB 좋아요 select error',
                statusCode: -2
              });
            });
          }).catch(function (err) {
            return res.status(400).json({
              errorMsg: 'DB 찜하기 select error',
              statusCode: -2
            });
          });
        }
      }).catch(function (err) {
        return res.status(400).json({
          errorMsg: 'DB select post error',
          statusCode: -2
        });
      });
    }
  })
};
