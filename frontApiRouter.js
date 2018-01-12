/**
 * Created by KIMSEONHO on 2016-08-16.
 */
const passport = require('passport'),
  jwt = require('express-jwt'),
  express = require('express'),
  // multer = require('multer'),
  _ = require("lodash"),
  i18n = require('i18n');

const jwksRsa = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');

var env = process.env.NODE_ENV || "development";

var config = require('./config/main');
const value = require('./utils/staticValue');

var api = {
  authController: require('./controllers/api/auth'),
  postController: require('./controllers/api/post'),
  userController: require('./controllers/api/user'),
  messageController: require('./controllers/api/message'),
  mapController: require('./controllers/api/map'),
  testController: require('./controllers/api/test')    // test route
};

const passportService = require('./config/passport');   // 설정값 로딩때문에 필요함

// Middleware to require login/authRoute
const requireApiAuth = passport.authenticate('jwt', { session: false });
const requireAuth0Login = passport.authenticate('auth0', { session: false, failureRedirect: '/auth/login' });
// const requireApiAuth = jwt({
//   // Dynamically provide a signing key
//   // based on the kid in the header and
//   // the singing keys provided by the JWKS endpoint.

//   // secret: jwksRsa.expressJwtSecret({
//   //   cache: true,
//   //   rateLimit: true,
//   //   jwksRequestsPerMinute: 5,
//   //   jwksUri: config.auth0.JWKS_URI
//   // }),

//   secret: config.secret,

//   // Validate the audience and the issuer.
//   aud: config.auth0.IDENTIFIER,
//   issuer: config.auth0.ISSUER,
//   algorithms: [config.auth0.ALGORITHM]
// });

const checkScopes = jwtAuthz(['read:messages']);

const init = function (req, res, next) {
  req.env = process.env.NODE_ENV || "development";
  req.lang = req.getLocale();
  req.ID = req.user ? (req.user.logined ? req.user.ID : null) : null;

  if (!req.user.logined) {
    req.msg = 'login please';
    return res.status(401).json({
      errorMsg: 'Unauthorized',
      statusCode: -1
    });
  }

  if (_.isEmpty(req.msg)) {
    req.msg = undefined;
  }

  // 로그인이 되지 않았거나, 유효기간이 만료된 경우 쿠키 삭제
  if (req.user) {
    if (req.user.expired) {
      res.clearCookie('authorization');
      res.clearCookie('access_token');
      res.clearCookie('user_profile_token');
    }

    if (req.user.meta_value) {
      if (req.user.meta_value.lang) {
        req.lang = req.user.meta_value.lang;      // user의 설정이 우선이다.
        i18n.setLocale([req, res, res.locals], req.user.meta_value.lang);
      }
    }
  }
  // 본 코드는 잠재적으로 문제가 있을 것 같기 때문에 삭제를 권장함.
  // 쿠키 만료시간(expiredDate)과 임의로 동일한 이름으로 쿠키를 만들수도 있기 때문에
  // req.logined = (req.cookies.Authorization ? true : false);

  return next();
}

module.exports = function (app) {
  // Initializing route groups
  api.rootRoute = express.Router();

  api.authRoute = express.Router();
  api.userRoute = express.Router();
  api.postRoute = express.Router();
  api.roomRoute = express.Router();
  api.mapRoute = express.Router();
  api.messageRoute = express.Router();
  api.testRoute = express.Router();


  // Set url for View, API group routes
  app.use('/api', api.rootRoute);


  //=========================
  // API - Test Routes
  //=========================
  api.rootRoute.use('/test', api.testRoute);

  // Test API route
  api.testRoute.get('/', api.testController.getQuoterAPI);
  api.testRoute.get('/hello', api.testController.helloAPI);
  api.testRoute.get('/protected', requireApiAuth, api.testController.protectedRouteAPI);


  //=========================
  // api - Auth Routes
  // @reference : https://auth0.com/docs/api/authentication
  //=========================
  api.rootRoute.use('/auth', api.authRoute);

  //유저 모든정보 출력 api
  // api.authRoute.post('/info', api.authController.info);

  // Login route
  api.authRoute.get('/login-callback', requireAuth0Login, init, api.authController.checkUser, api.authController.setToken); // 테스트 필요

  // Logout route: logout은 token을 삭제하기만 하면 됨

  // Registration View route
  // web.authRoute.get('/signup', requireApiAuth, init, web.authController.signup, web.redirectController.redirectMain);

  // Registration route
  // web.authRoute.post('/signup', requireApiAuth, init, web.authController.signup, web.authController.register, web.redirectController.redirectMain);

  //탈퇴 라우터
  api.authRoute.delete('/quit', requireApiAuth, api.authController.quit); 

  // Forgot password
  api.authRoute.post('/forgot-password', api.authController.forgotPassword);  // 2순위
  // authRouteView.get('/forgot-password', authRouteController.register);

  // Password reset request route (generate/send token)
  api.authRoute.post('/reset-password/:token', api.authController.verifyToken);  // 2순위
  // authRouteView.get('/reset-password/:token', authRouteController.verifyToken);


  //=========================
  // api - Member Routes
  //=========================

  // Set userRoute routes as a subgroup/middleware to api.rootRoute
  api.rootRoute.use('/user', api.userRoute);

  api.userRoute.get('/:userIdx', requireApiAuth, api.userController.getUserInfoByIdx); 

  api.userRoute.put('/', requireApiAuth,api.userController.modifyUserInfoByIdx, api.authController.setToken); // 테스트 필요

  //비밀번호 변경
  api.userRoute.put('/change-password', requireApiAuth, init, api.userController.changePassword); // 2순위

  // member정보를 json형식으로 출력
  api.userRoute.get('/:userIdx([0-9]+)/follower', requireApiAuth, init, api.userController.getFollower); 
  api.userRoute.get('/:userIdx([0-9]+)/following', requireApiAuth, init, api.userController.getFollowing); 
  api.userRoute.get('/:userIdx([0-9]+)/posts', requireApiAuth, init, api.userController.getPosts); 
  // api.userRoute.get('/:userIdx([0-9]+)/json/replies', requireApiAuth, init, api.userController.getReplies);
  api.userRoute.get('/:userIdx([0-9]+)/notice', requireApiAuth, init, api.userController.getNotice);
  api.userRoute.get('/:userIdx([0-9]+)/likeposts', requireApiAuth, init, api.userController.getLikeposts); 

  api.userRoute.get('/list/:userIdxList(\[[0-9,]+\])', requireApiAuth, init, api.userController.getUserList); 


  //=========================
  // api - Post Routes
  //=========================
  api.rootRoute.use('/post', api.postRoute);

  // post info를 json로 받음
  api.postRoute.get('/:postIdx([0-9]+)', requireApiAuth, api.postController.getPostInfo); 

  // post info list를 json로 받음
  api.postRoute.get('/list/:postListIdx([0-9]+)', requireApiAuth, api.postController.getPostList);

  // create new Post Info from authenticated userRoute
  api.postRoute.post('/', requireApiAuth, api.postController.createPostInfo); 

  // modify Post Info from authenticated userRoute
  api.postRoute.put('/:postIdx([0-9]+)', requireApiAuth, init, api.postController.modifyPostInfo); //만듬

  // get all comments
  api.postRoute.get('/:postIdx([0-9]+)/comment', requireApiAuth, api.postController.getPostComment); 
  
  // add comment
  api.postRoute.post('/:postIdx([0-9]+)/comment', requireApiAuth, api.postController.createPostComment); 
  
  // delete comment
  api.postRoute.delete('/:postIdx([0-9]+)/comment/:commentIdx([0-9]+)', requireApiAuth, api.postController.deletePostComment); 

  // delete post
  api.postRoute.delete('/:postIdx([0-9]+)', requireApiAuth, api.postController.deletePost); 

  // re enroll post - 재게시하기
  api.postRoute.put('/re-enroll/:postIdx([0-9]+)', requireApiAuth, api.postController.reEnrollPost); 

  // search post
  api.postRoute.get('/search', api.postController.searchPost);  // 2순위

  //media, attached 정보 저장(image-server에서 이용함)
  api.postRoute.post('/images', requireApiAuth, api.postController.createNormalImageInfo); // 만듬
  api.postRoute.post('/vtour', requireApiAuth, api.postController.createVRImageVtourInfo); // 만듬

  //=========================
  // api - Map Info Routes
  //=========================

  api.rootRoute.use('/map', api.mapRoute);

  api.mapRoute.get('/json/list/:postIdxList(\[[0-9,]+\])', api.mapController.getPostInfoList);

  api.mapRoute.get('/json/locations/:east/:west/:south/:north', api.mapController.getPostLocations);


  //=========================
  // api - Room Info Routes
  //=========================
  api.postRoute.use('/room', api.roomRoute);

  //룸세부정보 출력
  // api.roomRoute.get('/:roomInfoIdx', api.postController.viewRoomDetail);


  //=========================
  // api - Message Routes
  //=========================
  api.rootRoute.use('/message', api.messageRoute);

  api.messageRoute.get('/:userId', requireApiAuth, init, api.messageController.viewChatByMember);
  api.messageRoute.post('/:userId/:chatRoomId', requireApiAuth, init, api.messageController.inviteUserToRoom);

};
