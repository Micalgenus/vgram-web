"use strict";

const models = require('../../models');

const Room = models.room;
const Post = models.post;
const User = models.user;
const Translation = models.icl_translation;
const Address = models.address;
const Coordinate = models.coordinate;
const Comment = models.comment;

const postController = require('./web-post');

const _ = require('lodash');
const Promise = require("bluebird");
const moment = require("moment");

const roomInfo = require('../core/room-info');

var env = process.env.NODE_ENV || "development";
var config = require("../../config/main");

var log = require('console-log-level')({
   prefix: function () {
      return new Date().toISOString()
   },
   level: config.logLevel
});

const value = require('../../utils/staticValue');

exports.roomInfoListView = function (req, res) {
   return res.render('room/room-list', {
      ENV: req.env,
      logined: req.user ? req.user.logined : false,
      title: "roomInfoListView",     // locale과 매칭되는 변수명을 적어야함.
      msg: req.msg,
      lat: value.mapLocationCenter.lat,
      lng: value.mapLocationCenter.lng,
      value: {
         placeType: value.placeType,
         room: value.room,
         lang: req.lang
      }
   });
}

/**
 * 시공사례입력(use vrpano-promise)
 * @param req
 * @param res
 * @param next
 */
exports.createRoomInfoView = function (req, res, next) {

   if (!req.user.logined) {
      req.flash('msg', "requiredLogin");
      // return res.redirect('/post/room');
      return res.redirect('back');
   }

   // 기본적으로 user의 기본언어 선택사항을 따라가고,
   // 향후에 글 작성시 언어를 선택할 수 있도록 하자.
   return res.render('post/room/new', {
      ENV: req.env,
      logined: req.user ? req.user.logined : false,
      title: "createRoomInfoView",
      msg: req.msg,
      update: false,
      value: {
         placeType: value.placeType,
         room: value.room,
         floors: value.floors,
         postStatus: value.postStatus,
         postType: value.postType,
         lang: req.lang
      }
   });
}

// 1. file 다운로드, request parameter check
// 2. core.createRoomInfoAndVRPano -> return promise
// 3. promise에 따른 결과값 return
/**
 * Action - 방 정보 입력
 * @param req
 * @param res
 * @param next
 */
exports.createRoomInfo = function (req, res, next) {
   var sendPostID;
   var sendRoomID;
   if (!req.user.logined) {
      req.flash('msg', "requiredLogin");
      // return res.redirect('/post/room');
      return res.redirect('back');
   }

   if (!req.body.title) {
      return res.status(401).json({
         errorMsg: 'You must enter an required field! please check title',
         statusCode: -1
      });
   }

   if (!req.body.roomType) {
      return res.status(401).json({
         errorMsg: 'You must enter an required field! please check roomType',
         statusCode: -1
      });
   }

   if (!req.body.address) {
      return res.status(401).json({
         errorMsg: 'You must enter an required field! please check address',
         statusCode: -1
      });
   }

   const metaData = {

      shortTerm: req.body.shortTermContract == ""? false: true,
      conditionType:   req.body.conditionType,
      floor: req.body.floors,
      manageExpense: req.body.contactformManageExpense == ""? null: _.toNumber(req.body.contactformManageExpense),
      // 라디오 버튼 클릭이 안됨
      //    options:
      //    0:  "internet"
      //    1:  "TV"
      //    2:  "washer"
      //    3:  "airConditioner"
      //    4:  "bed"
      //    5:  "desk"
      //    6:  "closet"
      //다중 클릭이 가능해져서 어떤것을 넣어야될지를 모름
      //    parking:boolean
      //    elevator:boolean
       heatingType: req.body.heatingType == "" ? null : req.body.heatingType

   };

   // DB에 insert하는 부분
   return models.sequelize.transaction(function (t) {

      // post 테이블 내용 추가
      return Post.create({
         user_id: req.user.ID,
         title: req.body.title,
         content: req.body.detail,
         post_status: "PUBLISH",
         post_type: "ROOM",
         locale: "ko_KR",
         post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         post_modified_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         like: 0,
         read_count: 0,
         // 체크박스가 제대로 되지 않아서 일부부만 넣음.
         meta_value: metaData
      }, {transaction: t}).then(function (createPost) {
         sendPostID = createPost.ID;
         //room 테이블 내용 추가
         return Room.create({
            post_id: createPost.ID,
            room_type: req.body.roomType,
            deposit: req.body.deposit,
            monthly_rent_fee: req.body.monthly,
            area_size: req.body.actualSize,
            //meta_value:,
            // thumbnail_image_path:,
            // thumbnail_media_id :
         }, {transaction: t}).then(function (createRoom) {
            sendRoomID = createRoom.ID;
            // icl_translation 테이블 내용 추가
            return Translation.create({
               element_id: createPost.ID,
               element_type: 'post',
               group_id: createPost.ID,
               language_code: 'ko-kr',
               original_language_code: 'ko-kr'
            }, {transaction: t}).then(function (createTranslation) {

               //Coordinate 테이블 내용 추가
               return Coordinate.create({
                  translation_group_id: createTranslation.ID,
                  // 넘어오는곳이 없음. 그래서 임시로 temp 문자열을 넣음
                   region_code: 'temp',
                   lat: 'temp',
                   lng: 'temp'
               }, {transaction: t}).then(function (createCoordinate) {
                  //Address 테이블 내용 추가
                  return Address.create({
                     translation_id: createPost.ID,
                     coordinate_id: createCoordinate.ID,
                     post_code: req.body.postcode,
                     //region_code: ,
                     // 도로명 주소인지 지번주소인지 구별할 구분자가 없음.
                     // 그래서 그냥 req로 넘어오는 주소 다 때려박음
                     // add1, add2 나중에 수정하기
                     addr1: req.body.address,
                     addr2: req.body.address,
                     detail:req.body.detail,
                     extra_info :req.body.extraInfo,
                     locale :createTranslation.language_code,
                     translation_group_id :createCoordinate.translation_group_id
                  }, {transaction: t});
               }).then(function (result) {
                  // post_id 와 room의 id를 저장해놓고 이미지 서버로 전송해야함.

                  res.status(200).json({
                     postID: sendPostID,
                     roomID: sendRoomID
                  });

                  return models.sequelize.Promise.resolve();
               }).catch(function (err) {
                  return console.log(err);
               });
            });
         });
      });
   });
}


// preview image 수정 후 잘 뜨는지 확인해야함.
exports.changeRoomInfoView = function (req, res, next) {
   if (!req.user.logined) {
      req.flash('msg', "requiredLogin");
      return res.redirect('back');
   }

   return res.render('room/room-update', {
      ENV: req.env,
      logined: req.user ? req.user.logined : false,
      title: "updateRoomInfoView",
      msg: req.msg,
      update: true,
      value: {
         placeType: value.placeType,
         roomContractCondition: value.roomContractCondition,
         floors: value.floors,
         postStatus: value.postStatus,
         postType: value.postType,
         roomInfoIdx : req.params.roomInfoIdx
      }
   });
}


// preview image 수정 후 잘 뜨는지 확인해야함.
exports.updateRoomInfo = function (req, res, next) {
//   console.log(req);
   if (!req.body.roomInfoIdx) {
     return res.status(401).json({
       errorMsg: 'You must enter an required param! please check :roomInfoIdx',
       statusCode: -1
     });
   }
   const roomInfoIdx = _.toNumber(req.body.roomInfoIdx);
   console.log("roomInfoIDX = " + roomInfoIdx);
   // if (req.user.memberType != value.memberType.LEASE_MEMBER) {
   //   return res.status(401).json({
   //     errorMsg: 'You are not authorized to create roominfo case.',
   //     statusCode: 2
   //   });
   // }

   if (!req.body.title) {
     return res.status(401).json({
       errorMsg: 'You must enter an required field! please check title',
       statusCode: -1
     });
   }

   if (!req.body.roomType) {
     return res.status(401).json({
       errorMsg: 'You must enter an required field! please check roomType',
       statusCode: -1
     });
   }

   if (!req.body.address) {
     return res.status(401).json({
       errorMsg: 'You must enter an required field! please check address',
       statusCode: -1
     });
   }

   if (!req.files[value.fieldName.prevImg]) {
     return res.status(401).json({
       errorMsg: 'You must enter an required field! please check file["previewImage"]',
       statusCode: -1
     });
   }

   // let updateRoomInfo = Promise.method(function (initWriteDate, previewImagePath) {
   //   // 나중에 VR Tour 변경될 때 promise 형식으로 한번에 바꾸자
   //   const room = {
   //     memberIdx: req.user.idx,
   //     title: req.body.title,
   //     roomType: req.body.roomType == "" ? null : _.toNumber(req.body.roomType),
   //     address: req.body.address == "" ? null : req.body.address,    // JSON.stringify(address) 형식 그대로 온다.
   //     mainPreviewImage: _.isNil(previewImagePath) ? null : previewImagePath,
   //     deposit: req.body.deposit == "" ? null : _.toNumber(req.body.deposit),
   //     monthlyRentFee: req.body.monthlyRentFee == "" ? null : _.toNumber(req.body.monthlyRentFee),
   //     floor: req.body.floor == "" ? null : _.toNumber(req.body.floor),
   //     manageExpense: req.body.manageExpense == "" ? null : _.toNumber(req.body.manageExpense),
   //     manageService: req.body.manageService == "" ? null : req.body.manageService,
   //     areaSize: req.body.areaSize == "" ? null : _.toNumber(req.body.areaSize),
   //     actualSize: req.body.actualSize == "" ? null : _.toNumber(req.body.actualSize),
   //     parking: req.body.parking == "" ? null : _.toNumber(req.body.parking),
   //     elevator: req.body.elevator == "" ? null : _.toNumber(req.body.elevator),
   //     supplyOption: req.body.supplyOption == "" ? null : _.toNumber(req.body.supplyOption),
   //     availableDate: req.body.availableDate == "" ? null : req.body.availableDate,
   //     HTMLText: req.body.HTMLText == "" ? null : req.body.HTMLText,
   //     // VRImages: _.isNil(vrImages) ? null : JSON.stringify(vrImages),   // 현재는 변환 전임을 표시함.
   //     locationInfo: req.body.locationInfo == "" ? null : req.body.locationInfo,
   //     coordinate: req.body.coordinate == "" ? null : req.body.coordinate,    // JSON.stringify() 형식 그대로 오기 때문에
   //     regionCategory: req.body.regionCategory == "" ? null : req.body.regionCategory,   // JSON.stringify() 형식 그대로
   //     initWriteDate: _.isNil(initWriteDate) ? null : moment(_.toNumber(initWriteDate)).format("YYYY-MM-DD HH:MM:SS"),   // timestamp로 변환
   //     fileRef: _.isNil(initWriteDate) ? null : _.toNumber(initWriteDate)
   //   }
   //
   //   // return Array[0] = affectedRows
   //   return RoomInfoBoard.update(room, {where: {idx: roomInfoIdx}}).then(function (array) {
   //     return res.status(200).json({
   //       msg: 'changed ' + array[0] + ' rows',
   //       statusCode: 1
   //     });
   //   }).catch(function (err) {
   //     if (err) {
   //       res.status(400).json({
   //         errorMsg: 'RoomInfoBoard Error : No user could be found for this ID.',
   //         statusCode: 2
   //       });
   //       return next(err);
   //     }
   //   });
   // });
   //
   // return moveImagePromise.makeNewSavePath(req)
   //   .then(function (newSavePath) {
   //     return Promise.join(
   //       moveImagePromise.movePreviewImage(req, value.fieldName.prevImg, newSavePath, config.resourcePath), function (previewImage) {
   //         return {initWriteDate: newSavePath, previewImage: previewImage};
   //       });
   //   }).then(function (result) {
   //   return updateRoomInfo(result.initWriteDate, result.previewImage);
   // }).done(function (result) {
   //   log.debug(result);
   //   next();
   // }, function (err) {
   //   log.error(err);
   //   next(err);
   // });
   req.flash('msg', "editPostComplete");
   return res.redirect('/post/room');
   // return res.redirect('/room/[:roomInfoIdx]');    <- redirect를 이렇게 걸자
}

exports.deleteRoomInfo = function (req, res) {
   // const roomInfoIdx = req.params.roomInfoIdx;
   //
   // return RoomInfoBoard.findOne({
   //   where: {
   //     idx: roomInfoIdx
   //   }
   // }).then(function(room) { // 다른 회원의 내용일 경우 열람 불가능
   //   if (req.user.idx != room.memberIdx) {
   //     return res.status(400).json({
   //         errorMsg: '다른 회원',
   //         statusCode: -1
   //       });
   //   }
   //
   //   return RoomInfoBoard.destroy({
   //     where: {
   //       idx: roomInfoIdx
   //     }
   //   }).then(function() {
   //     return res.status(200).json({ statusCode: 1 });
   //   }).catch(function(err) {
   //     if (err) {
   //       return res.status(400).json({
   //         errorMsg: '삭제 실패',
   //         statusCode: -1
   //       });
   //     }
   //   });
   // }).catch(function(err) {
   //   console.log(err);
   //   if (err) {
   //     return res.status(400).json({
   //       errorMsg: '정보 없음',
   //       statusCode: -1
   //     });
   //   }
   // });
   req.flash('msg', "deletePostComplete");
   return res.redirect('/post/room');
}

exports.roomInfoDetailView = function(req, res) {

    let idx = req.params.roomInfoIdx;

    return Room.findOne({
        where: {
            ID: idx
        },
        attributes: ['room_type', 'createdAt', 'deposit', 'monthly_rent_fee', 'post_id', 'area_size'],
    }).then(function(room) {
        if (!room) return res.redirect('/post/room/');

        return postController.getPostInfo(room.post_id).then(function(d) {
            let lat = d.positions[0].lat;
            let lng = d.positions[0].lng;

            // return res.send(d.comment);

            return res.status(200).render('room/room-detail', {
                ENV: req.env,
                logined: req.user ? req.user.logined : false,
                msg: req.msg,
                title: "roomInfoDetailView",
                roomIdx: idx,

                // 게시글 정보
                postTitle: d.post.title,
                read: d.post.read_count,
                createdAt: d.post.createdAt,
                likeCount: d.likeCount,

                // 위치정보
                lat: lat,
                lng: lng,

                // 방정보
                deposit: room.deposit,
                monthlyRentFee: room.monthly_rent_fee,
                roomType: room.room_type,
                area_size: room.area_size,

                // 작성자 정보
                email: d.post.user.email,
                phone: d.post.user.telephone,
                nickname: d.post.user.nickname,

                comments: d.comments,
                commentCount: d.commentCount
            });
        });
    });
}

exports.searchRoomListView = function (req, res) {
   // let pageSize, pageStartIndex, query = req.query.query;
   //
   // // 페이지 정보 확인
   // if (!req.query.pageSize || !req.query.pageStartIndex) {
   //   // query가 제대로 오지 않으면 초기값으로 보낸다.
   //   pageSize = 10;
   //   pageStartIndex = 0;
   // } else {
   //   pageSize = _.toNumber(req.query.pageSize);
   //   pageStartIndex = _.toNumber(req.query.pageStartIndex);
   // }
   //
   // return RoomInfoBoard.findAll({
   //   limit: pageSize,
   //   offset: pageStartIndex,
   //   //where: {}
   // }).then(function(roomInfoList) {
   //   return res.status(200).json({
   //     RoomInfo: roomInfoList,
   //     statusCode: 1
   //   });
   // }).catch(function(err) {
   //   return res.status(400).json({
   //     errorMsg: '정보 없음',
   //     statusCode: -1
   //   });
   // });

   // room-list에서 if 처리를 해서 search시에만 보여주는 항목을 보여주자
   return res.status(200).render('room/room-list', {
      ENV: req.env,
      logined: req.user ? req.user.logined : false,
      title: "roomInfoListView",
      msg: req.msg,
      email: "123@123.com",
      search: true
   });
}

exports.roomInfoDetailJson = function (req, res) {
   let idx = req.params.roomInfoIdx;

   return Room.findOne({
      where: {
         ID: idx
      },
      // attributes: [],
   }).then(function (room) {
      var result = room;
      result.test = 'test';
      return res.status(200).send(result);
   });
}

// exports.roomInfoListJson = function(req, res) {
//   let list = JSON.parse(req.params.roomIdxList);
//   var data = [];
//   var p = [];


//   if (list.length == 0) return res.send([]);

//   for (var i in list) {
//     var idx = list[i];
//     p.push(Room.findOne({
//       where: {
//         ID: idx
//       }
//     }).then(function(room) {
//       var r = room.dataValues;
//       r.address = JSON.parse(r.address);

//       data.push(room.dataValues);
//     }));
//   }

//   waitPromise(p);

//   function waitPromise(p) {
//     setTimeout(function() {
//       // console.log(list.length, data.length);
//       // console.log(list, data);
//       if (list.length == data.length) return promiseReturn(p);
//       else return waitPromise(p);
//     }, 100);
//   }

//   // return promiseReturn(p);

//   function promiseReturn(promiseArray) {
//     let nowPromise = promiseArray.pop();
//     // console.log(nowPromise);
//     return nowPromise.then(function() {
//       if (promiseArray.length > 1) {
//         return promiseReturn(promiseArray);
//       } else {
//         return res.send(data);
//       }
//     }).catch(function(error) {
//       return res.send([]);
//     });
//   };
// }

exports.roomInfoListJson = function (req, res) {
   let list = JSON.parse(req.params.roomIdxList);

   if (list.length == 0) return res.send([]);

   return Room.findAll({
      include: [{
        model: Post,
        attributes: ['ID', 'title', 'read_count', 'thumbnail_image_path'],
        include: [ {
          model: User,
          attributes: ['email', 'telephone'],
        }, {
          model: Translation,
          attributes: ['group_id'],
          include: [ {
            model: Coordinate,
            attributes: ['lat', 'lng']
          }, {
            model: Address,
            attributes: ['addr1', 'addr2']
          } ]
        } ],
      }],
      where: {
         ID: {
            $in: list
         }
      }
   }).then(function (room) {
      return res.status(200).send(room);
   });
}

exports.roomInfoAddressJsonInit = function(req, res) {
  return res.status(200).send([]);
}

exports.roomInfoAddressJson = function(req, res) {
  let address = '%' + req.params.address + '%';

  return Address.findAll({
    include: [ {
      model: Translation,
      include: [ {
        model: Post,
        include: [ {
          model: Room
        } ],
      } ],
    } ],
    where: {
      addr1: {
        $like: address
      }
    }
  }).then(function(rooms) {
    // console.log(rooms);
    return res.status(200).send(rooms);
  });
}

exports.roomInfoAddressOneJson = function(req, res) {
  let address = req.params.address;

  return Address.findOne({
    include: [ {
      model: Coordinate,
    } ],
    where: {
      addr1: {
        $like: address
      }
    }
  }).then(function(room) {
    console.log(room);
    return res.status(200).send(room);
  });
}

exports.roomCommentWrite = function(req, res) {

  let idx = req.params.room;
  let content = req.body.comment;

  if (req.user.logined == false) {
    req.flash('msg', '로그인 해주시길 바랍니다.');
    return res.redirect('/post/room/' + idx);
  }

  return Room.findOne({
    include: [{
      model: Post,
    }],
    where: {
      ID: idx
    },
  }).then(function(r) {
    let date = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    // return res.send(req.user);

    return Comment.create({
      post_id: r.post.ID,
      user_id: req.user.ID,
      content: content,
      createdAt: date,
      updatedAt: date
    }).then(function(c) {
      // return res.status(200).send(req.body);
      return res.redirect('/post/room/' + idx);
    });
  });
}
