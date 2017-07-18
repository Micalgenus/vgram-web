/**
 * Created by JHLee on 2017-01-25.
 */
"use strict";

const models = require('../../models');
const post = models.post;
const room = models.room;
const Media = models.media;
const Post_Media_relationship = models.post_media_relationship;
const _ = require('lodash');
const moment = require("moment");

const postController = require('../web/view-post');

var config = require("../../config/main");
var log = require('console-log-level')({
  prefix: function () {
    return new Date().toISOString()
  },
  level: config.logLevel
});

//공지사항 출력
exports.viewNotice = function (req, res) {
  let pageSize, pageStartIndex;

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


  let userID = req.user.ID;
  let email = req.user.email;

  let imageJSON;
  for (var key in req.body) {
    imageJSON = JSON.parse(key);
  }

  let postID = imageJSON.postID;
  let thumbnail_image_path = imageJSON.images[0].thumb;
  var medias = [];
  var m_relation = [];
  for (var i = 0; i < imageJSON.images.length; ++i) {

    let imageType = imageJSON.images[i].type;
    let imageFileName = imageJSON.images[i].file_name;

    let imageMetaValue = {
      mimetype: imageJSON.images[i].mimetype,
      size: imageJSON.images[i].size,
      desktop_dir: imageJSON.images[i].desktop_dir_name,
      mobile_dir: imageJSON.images[i].mobile_dir_name,
      original_dir: imageJSON.images[i].original_dir_name
    };

    var json = new Object();
    json.user_id = userID;
    json.type = imageType;
    json.date = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    json.file_path = "/medias/images/" + email;
    json.file_name = imageFileName;
    json.meta_value = imageMetaValue;
    medias.push(json);
  }
  //console.log("medias>>>>>>>>>>>>>>>>>>>>>>>>>>>\n" + medias);
  return models.sequelize.transaction(function (t) {
    return Media.bulkCreate(
      medias
      , { transaction: t, returning: true, individualHooks: true }).then(function (createMedia) {

        for (var i = 0; i < createMedia.length; ++i) {

          var relation_json = new Object();
          relation_json.post_id = postID;
          relation_json.media_id = createMedia[i].ID;
          m_relation.push(relation_json);
        }
        //console.log("m_relation>>>>>>>>>>>>>>>>>>>>>>>>>>>\n" + m_relation);
        return Post_Media_relationship.bulkCreate(
          m_relation
          , { transaction: t, returning: true, individualHooks: true });
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
exports.createVRImageVtourInfo = function (req, res) {

  let token = req.headers['authorization'];
  //토큰 확인
  if (!token) {
    return res.status(400).json({
      errorMsg: 'Do not have a token',
      statusCode: -1
    });
  }

  let userID = req.user.ID;
  let email = req.user.email;


  let vrJSON;
  for (var key in req.body) {
    vrJSON = JSON.parse(key);
  }

  let postID = vrJSON.postID;
  let vrFilePath = "/medias/vrimages/" + email;
  //-----------------------------------------------
  //        vr이미지
  //---------------------------------------------
  var vr_medias = [];
  var vr_relation = [];
  var post_vrimage = [];
  var post_thumb = [];
  for (var i = 0; i < vrJSON.vrImages.length; ++i) {

    let vrType = vrJSON.vrImages[i].type;
    let vrFileName = vrJSON.vrImages[i].file_name;


    let vrMetaValue = {
      mimetype: vrJSON.vrImages[i].mimetype,
      size: vrJSON.vrImages[i].size,
      tile_dir_name: vrJSON.vrImages[i].tile_dir_name,
      thumbnail_image_name: vrJSON.vrImages[i].thumbnail_image_name,// 단일면 이미지
      preview_image_name: vrJSON.vrImages[i].preview_image_name,// 세로형 이미지(각 면->하나의 이미지)
      mobile_dir_name: vrJSON.vrImages[i].mobile_dir_name  // 모바일용 이미지 저장 폴더 이름
    };

    var json = new Object();
    json.user_id = userID;
    json.type = vrType;
    json.date = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    json.file_path = vrFilePath;
    json.file_name = vrFileName;
    json.meta_value = vrMetaValue;
    vr_medias.push(json);
  }

  return models.sequelize.transaction(function (t) {
    return Media.bulkCreate(
      vr_medias
      , { transaction: t, returning: true, individualHooks: true })
      .then(function (createVrMedia) {

        // vrimages의 릴레이션을 표시하기위해서
        // post_media_relationship테이블에 넣기 위해 JSON을 만드는 부분
        // 예제 >> { post_id : id , media_id : id }
        for (var i = 0; i < createVrMedia.length; ++i) {

          var relation_json = new Object();
          relation_json.post_id = postID;
          relation_json.media_id = createVrMedia[i].ID;
          vr_relation.push(relation_json);

          var post_vrimages_json = new Object();
          post_vrimages_json.ID = createVrMedia[i].ID;
          post_vrimages_json.thumb = vrFilePath + '/' + vrJSON.vrImages[i].tile_dir_name + "/thumb.jpg";
          post_vrimage.push(post_vrimages_json);

        }

        return Post_Media_relationship.bulkCreate(
          vr_relation
          , { transaction: t, returning: true, individualHooks: true });
      }).then(function (result) {
        //정상적으로 되었을 경우
        //-----------------------------------------------
        //        vtour 이미지
        //---------------------------------------------

        var vtour_medias = [];
        var vtour_relation = [];
        for (var i = 0; i < vrJSON.vtour.length; ++i) {

          let vtourType = vrJSON.vtour[i].type;
          let vtourFileName = vrJSON.vtour[i].file_name;
          let vtourFilePath = "/medias/vtours/" + email + '/' + vrJSON.vtour[i].file_path;

          let vtourMetaValue = {};

          var json = new Object();
          json.user_id = userID;
          json.type = vtourType;
          json.date = moment.utc().format('YYYY-MM-DD HH:mm:ss');
          json.file_path = vtourFilePath;
          json.file_name = vtourFileName;
          json.meta_value = vtourMetaValue;
          vtour_medias.push(json);
        }

        return Media.bulkCreate(
          vtour_medias
          , { transaction: t, returning: true, individualHooks: true })
          .then(function (createMedia) {

            // vtour의 릴레이션을 표시하기위해서
            // post_media_relationship테이블에 넣기 위해 JSON을 만드는 부분
            // 예제 >> { post_id : id , media_id : id }
            for (var i = 0; i < createMedia.length; ++i) {
              var relation_json = new Object();
              relation_json.post_id = postID;
              relation_json.media_id = createMedia[i].ID;
              vtour_relation.push(relation_json);

              var post_vtour_id = new Object();
              post_vtour_id.ID = createMedia[i].ID;
              post_vtour_id.vrimages = post_vrimage;
              post_thumb.push(post_vtour_id);
            }

            return Post_Media_relationship.bulkCreate(
              vtour_relation
              , { transaction: t, returning: true, individualHooks: true });
          });
      });
  }).then((result) => {
    //정상적으로 되었을 경우
    res.status(200).json({
      statusCode: 1
    });

    return post.update({
      thumbnail_image_path: post_thumb,
    }, {
        where: {
          ID: postID
        }
      });
  }).catch((err) => {
    //error occured
    상세정보
    log.error("posts - createVRImageVtourInfo error : " + err.message);
    res.status(401).json({
      errorMsg: 'DB create error',
      statusCode: -1
    });

    return models.sequelize.Promise.reject(err);
  });
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

exports.getPostInfoJson = function (req, res) {
  var idx = req.params.postIdx;

  return postController.getPostInfo(idx).then(function (d) {
    return res.send({
      postId: d.post.ID,

      comments: d.comments,
      commentCount: d.commentCount,

      data: d
    });
  });
}