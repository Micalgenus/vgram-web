/**
 * Created by KIMSEONHO on 2016-08-16.
 */
const passport = require('passport'),
  jwt = require('express-jwt'),
  express = require('express'),
  multer = require('multer'),
  _ = require("lodash"),
  i18n = require('i18n');

const jwksRsa = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');

var env = process.env.NODE_ENV || "development";

var config = require('./config/main');
const value = require('./utils/staticValue');

var web = {
  authController: require('./controllers/web/auth'),
  roomController: require('./controllers/web/view-room'),
  mapController: require('./controllers/web/view-map'),
  redirectController: require('./controllers/web/redirect'),
  userController: require('./controllers/web/view-user'),
  testController: require('./controllers/web/test'),
  postController: require('./controllers/web/view-post'),
};

var api = {
  authController: require('./controllers/api/rest-auth'),
  postController: require('./controllers/api/post'),
  userController: require('./controllers/api/user'),
  testController: require('./controllers/api/test')    // test route
};

const passportService = require('./config/passport');   // 설정값 로딩때문에 필요함

// Middleware to require login/authRoute
const requireWebAuth = passport.authenticate('jwt', { session: false });
const auth0WebLogin = passport.authenticate('auth0', { session: false, failureRedirect: '/url-if-something-fails' });
const requireAPIAuth = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the singing keys provided by the JWKS endpoint.

  // secret: jwksRsa.expressJwtSecret({
  //   cache: true,
  //   rateLimit: true,
  //   jwksRequestsPerMinute: 5,
  //   jwksUri: config.auth0.JWKS_URI
  // }),

  secret: config.secret,

  // Validate the audience and the issuer.
  audience: config.auth0.IDENTIFIER,
  issuer: config.auth0.ISSUER,
  algorithms: [config.auth0.ALGORITHM]
});

const checkScopes = jwtAuthz(['read:messages']);

const loginCheck = function (req, res, next) {
  if (!req.user.logined) {
    req.msg = 'login please';
    return res.redirect('back');
  }

  return next();
};

const init = function (req, res, next) {
  req.msg = req.flash('error')[0] || req.flash('msg')[0] || req.flash('success')[0];
  // req.msg = req.flash();
  req.env = process.env.NODE_ENV || "development";
  req.lang = req.getLocale();
  req.ID = req.user
    ? (req.user.logined ? req.user.ID : null)
    : null;



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


// const buildCaseImageUpload = multer({ storage: multerConfig.buildCaseInfoStorage }).fields([
//   { name: value.fieldName.prevImg, maxCount: 1 }, { name: value.fieldName.vrImg, maxCount: 15 }]);
//
// const roomRouteInfoImageUpload = multer({ storage: multerConfig.roomRouteInfoStorage }).fields([
//   { name: value.fieldName.prevImg, maxCount: 1 }, { name: value.fieldName.vrImg, maxCount: 15 }]);
//
// const editorImageUpload = multer({ storage: multerConfig.editorImageStorage })
//   .array(value.fieldName.EDITOR_IMAGE, 10);
//
// const bizImageUpload = multer({ storage: multerConfig.bizMemberInfoStorage }).fields([
//   { name: value.fieldName.LOGO_IMAGE, maxCount: 1 }, { name: value.fieldName.INTRO_IMAGE, maxCount: 1 }]);
//
// var testFileUpload = multer({ dest: config.resourcePath + '/tests' }).any();

module.exports = function (app) {
  // Initializing route groups
  web.rootRoute = express.Router();
  api.rootRoute = express.Router();

  web.defaultRoute = express.Router();
  web.roomRoute = express.Router();
  web.searchRoute = express.Router();
  web.mapRoute = express.Router();
  web.consultRoute = express.Router();
  web.authRoute = express.Router();
  web.userRoute = express.Router();
  web.publicRoute = express.Router();
  web.postRoute = express.Router();
  web.testRoute = express.Router();

  api.defaultRoute = express.Router();
  api.publicRoute = express.Router();
  api.consultRoute = express.Router();
  api.authRoute = express.Router();
  api.userRoute = express.Router();
  api.postRoute = express.Router();
  api.roomRoute = express.Router();
  api.testRoute = express.Router();

  // Set url for View, API group routes
  app.use('/', web.rootRoute);
  app.use('/api', api.rootRoute);


  //=========================
  // Web - Default Routes
  //=========================
  web.rootRoute.use('/', web.defaultRoute);

  web.defaultRoute.get('/', requireWebAuth, init, function (req, res) {
    res.render('index', {
      ENV: env,
      logined: req.user.logined,
      userIdx: req.ID,
      title: 'main',
      msg: req.msg,

      value: {
        placeType: value.placeType,
        room: value.room,
        floors: value.floors,
        postStatus: value.postStatus,
        postType: value.postType,
        lang: req.lang
      }
    });
  });


  //=========================
  // api - Default Routes
  //=========================
  api.rootRoute.use('/', api.defaultRoute);


  //=========================
  // web - Test Routes
  //=========================
  web.rootRoute.use('/test', web.testRoute);

  // Test API route
  web.testRoute.get('/', web.testController.getQuoter);
  web.testRoute.get('/hello', web.testController.hello);
  web.testRoute.get('/protected', requireWebAuth, web.testController.protectedRoute);


  //=========================
  // API - Test Routes
  //=========================
  api.rootRoute.use('/test', api.testRoute);

  // Test API route
  api.testRoute.get('/', api.testController.getQuoterAPI);
  api.testRoute.get('/hello', api.testController.helloAPI);
  api.testRoute.get('/protected', requireAPIAuth, api.testController.protectedRouteAPI);


  //=========================
  // web - public Routes
  //=========================
  web.rootRoute.use('/public', web.publicRoute);


  //=========================
  // API - public Routes
  //=========================
  api.rootRoute.use('/public', api.publicRoute);


  // Set publicRoute routes as subgroup/middleware to api.rootRoute

  // upload Image and return path when try to attaching device image
  // publicRouteAPI.post('/image', requireAuth, editorImageUpload, PublicController.uploadEditorImage);

  // test - upload file and return path when try to attaching device file
  //  publicRouteAPI.post('/file/test', testFileUpload, PublicController.uploadFileTest);


  //=========================
  // web - Auth Routes
  //=========================
  web.rootRoute.use('/auth', web.authRoute);

  // Perform the final stage of authentication and redirect to '/user'
  // web.authRoute.get('/callback',
  //    passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }), (req, res) => {
  //       res.redirect(req.session.returnTo || '/');
  //    });

  // 로그인View
  web.authRoute.get('/login', requireWebAuth, init, web.authController.loginView, web.redirectController.redirectMain);

  // Login route
  web.authRoute.get('/login-callback', auth0WebLogin, init, web.authController.checkUser, web.authController.setToken, web.redirectController.redirectMain);

  // Logout route: post로 변경해야함
  web.authRoute.get('/logout', web.authController.logout, init, web.redirectController.redirectMain);

  // Registration View route
  web.authRoute.get('/signup', requireWebAuth, init, web.authController.signup, web.redirectController.redirectMain);

  // Registration route
  web.authRoute.post('/signup', requireWebAuth, init, web.authController.signup, web.authController.register, web.redirectController.redirectMain);

  //탈퇴 라우터
  web.authRoute.get('/quit', web.authController.quit);

  //=========================
  // API - Auth Routes
  //=========================
  api.rootRoute.use('/auth', api.authRoute);

  //유저 모든정보 출력 api
  // api.authRoute.post('/info', api.authController.info);

  // Login route
  api.authRoute.post('/login', requireAPIAuth, api.authController.login);

  // Logout route
  api.authRoute.post('/logout', requireAPIAuth, api.authController.logout);

  // Registration route
  api.authRoute.post('/signup', api.authController.register);

  // 탈퇴 라우터
  // api.authRoute.post('/quit', api.authController.quit);

  // Forgot password
  api.authRoute.post('/forgot-password', api.authController.forgotPassword);
  // authRouteView.get('/forgot-password', authRouteController.register);

  // Password reset request route (generate/send token)
  api.authRoute.post('/reset-password/:token', api.authController.verifyToken);
  // authRouteView.get('/reset-password/:token', authRouteController.verifyToken);


  //=========================
  // web - Member Routes
  //=========================
  web.rootRoute.use('/user', web.userRoute);

  // 회원정보 조회 및 수정(View)
  web.userRoute.get('/change', requireWebAuth, init, web.userController.viewChangeProfile);


  // 회원정보 조회 및 수정(Action)
  // web.userRoute.post('/change', requireWebAuth, init, web.userController.change, web.authController.setToken, web.redirectController.redirectChange);
  web.userRoute.post('/change', requireWebAuth, init, web.userController.change, web.authController.setToken, web.redirectController.redirectChange);

  // 회원정보 조회
  web.userRoute.get('/:memberIdx([0-9]+)', requireWebAuth, init, web.userController.viewProfile);

  web.userRoute.delete('/delete', requireWebAuth, loginCheck, web.userController.delete);

  // member정보를 json형식으로 출력
  web.userRoute.get('/:memberIdx([0-9]+)/json/follower', requireWebAuth, init, web.userController.getFollower);
  web.userRoute.get('/:memberIdx([0-9]+)/json/following', requireWebAuth, init, web.userController.getFollowing);
  web.userRoute.get('/:memberIdx([0-9]+)/json/posts', requireWebAuth, init, web.userController.getPosts);
  web.userRoute.get('/:memberIdx([0-9]+)/json/replies', requireWebAuth, init, web.userController.getReplies);
  web.userRoute.get('/:memberIdx([0-9]+)/json/likeposts', requireWebAuth, init, web.userController.getLikeposts);

  //=========================
  // api - Member Routes
  //=========================

  // Set userRoute routes as a subgroup/middleware to api.rootRoute
  api.rootRoute.use('/user', api.userRoute);

  api.userRoute.get('/info', api.userController.getAllUserInfo);

  api.userRoute.get('/:userIdx', api.userController.getUserInfoByIdx);

  api.userRoute.put('/:userIdx', api.userController.modifyUserInfoByIdx);

  api.userRoute.delete('/delete', api.userController.deleteUser);

  //회원정보 수정
  // api.userRoute.post('/modifyInfo', requireAPIAuth, api.authController.modifyInfo);

  // View publicRoute userRoute profile route
  // userRouteAPI.get('/:memberIdx([0-9]+)', requireAuth, UserController.viewProfile);
  //userRouteView.get('/:memberIdx([0-9]+)', requireAuth, UserController.viewProfile);

  // Update userRoute profile route   <- 일반 회원와 사업주 회원을 같이 처리하자
  // userRouteAPI.put('/:memberIdx([0-9]+)', requireAuth, UserController.updateProfile, requireLogin, authRouteController.login);
  //  userRouteView.get('/update/:memberIdx([0-9]+)', requireAuth, UserController.updateProfile);

  // View business userRoute profile route
  // userRouteRoutes.get('/biz/:memberIdx', requireAuth, UserController.viewBizProfile);

  // update business userRoute profile route - 이미지 업로드 기능을 추가해야함.
  // userRouteRoutes.put('/biz/:memberIdx', requireAuth, bizImageUpload, UserController.updateBizProfile);


  //=========================
  // web - Post Routes
  //=========================
  web.rootRoute.use('/post', web.postRoute);

  // create new Room Info from authenticated userRoute
  web.postRoute.get('/new', requireWebAuth, init, web.postController.createPostInfoView);
  web.postRoute.post('/new', requireWebAuth, loginCheck, web.postController.createPostInfo);

  // post info를 json로 받음
  web.postRoute.get('/info/:postIdx([0-9]+)', web.postController.getPostInfoJson);

  // index list
  web.postRoute.get('/html/:roomListPage([0-9]+)', web.postController.postHtmlList);

  // comment
  web.postRoute.post('/comment/new/:postIdx([0-9]+)', requireWebAuth, web.postController.createPostComment);

  // delete post
  web.postRoute.delete('/delete/:postIdx([0-9]+)', requireWebAuth, loginCheck, web.postController.deletePost);

  // re enroll post
  web.postRoute.put('/re-enroll/:postIdx([0-9]+)', requireWebAuth, loginCheck, web.postController.reEnrollPost);

  // view post info
  web.postRoute.get('/:postIdx([0-9]+)', requireWebAuth, web.postController.viewPostInfoView);

  // krpano iframe view route, vr사진 높이 100%, 넓이 100%
  web.postRoute.get('/embed/:ID', init, web.postController.embedPost);

  //=========================
  // api - Post Routes
  //=========================
  api.rootRoute.use('/post', api.postRoute);

  //게시글 출력
  // api.postRoute.get('/', api.postController.viewPosts);


  //공지사항 출력
  api.postRoute.get('/notice', api.postController.viewNotice);

  api.postRoute.get('/', api.postController.viewPost);

  api.postRoute.post('/', api.postController.createPostInfo);

  api.postRoute.put('/:postIdx', api.postController.modifyPostInfo);

  api.postRoute.delete('/:postIdx', api.postController.deletePost);

  api.postRoute.get('/:postIdx', api.postController.getPostInfoByIdx);

  api.postRoute.get('/search', api.postController.searchPost);

  //media, attached 정보 저장(image-server에서 이용함)
  api.postRoute.post('/images', requireAPIAuth, api.postController.createNormalImageInfo);
  api.postRoute.post('/vtour', requireAPIAuth, api.postController.createVRImageVtourInfo);

  //=========================
  // web - Map Info Routes
  //=========================

  web.postRoute.use('/map', web.mapRoute);

  web.mapRoute.get('/', requireWebAuth, init, web.mapController.postInfoListView);

  web.mapRoute.get('/json/list/:postIdxList(\[[0-9,]+\])', web.mapController.postInfoListJson);

  web.mapRoute.get('/json/locations/:east/:west/:south/:north', web.mapController.getPostLocations);

  // create new Room Info from authenticated userRoute
  // web.mapRoute.get('/new', requireWebAuth, init, web.roomController.createRoomInfoView);
  // web.roomRoute.post('/', requireWebAuth, web.roomController.createRoomInfo);

  // update Room Info Info from authenticated userRoute
  // roomRouteInfoAPI.put('/:roomRouteInfoIdx', requireAuth, roomRouteInfoImageUpload, RoomInfoController.updateRoomInfo);
  // roomRouteInfoView.get('/change/:roomRouteInfoIdx([0-9]+)', requireAuth, roomRouteInfoImageUpload, RoomInfoController.updateRoomInfo);
  // web.mapRoute.get('/change/:roomInfoIdx([0-9]+)', requireWebAuth, init, web.roomController.changeRoomInfoView);
  // web.mapRoute.put('/:roomInfoIdx([0-9]+)', requireWebAuth, web.roomController.updateRoomInfo);

  // delete Room Info Info from authnticated userRoute

  // get Room Info Info from authenticated userRoute
  // roomRouteInfoAPI.get('/:roomRouteInfoIdx([0-9]+)', RoomInfoController.viewRoomInfoDetail);
  // web.mapRoute.get('/:roomInfoIdx([0-9]+)', requireWebAuth, init, web.roomController.roomInfoDetailView);

  // web.mapRoute.get('/search', web.roomController.searchRoomListView);
  // web.mapRoute.get('/html/:roomListPage([0-9]+)', web.roomController.roomHtmlList);

  // web.mapRoute.get('/json/:roomInfoIdx([0-9]+)', web.mapController.postInfoDetailJson);
  // web.mapRoute.get('/json/address/init', web.roomController.roomInfoAddressJsonInit);
  // web.mapRoute.get('/json/address/:address', web.roomController.roomInfoAddressJson);
  // web.mapRoute.get('/json/address/info/:address', web.roomController.roomInfoAddressOneJson);

  // web.mapRoute.post('/comment/:room([0-9]+)', requireWebAuth, web.roomController.roomCommentWrite);

  //=========================
  // api - Room Info Routes
  //=========================
  api.postRoute.use('/room', api.roomRoute);

  // api.roomRoute.delete('/:roomInfoIdx([0-9]+)', requireAPIAuth, web.roomController.deleteRoomInfo);

  //룸세부정보 출력
  api.roomRoute.get('/:roomInfoIdx', api.postController.viewRoomDetail);

  //=========================
  // web - Map Info Routes
  //=========================
  // web.rootRoute.use('/map', web.mapRoute);



  //=========================
  // API -  Payment Routes
  //=========================
  // api.rootRoute.use('/pay', payRoutes);

  // Webhook endpoint for Stripe
  // payRoutes.post('/webhook-notify', StripeController.webhook);

  // Create customer and subscription
  // payRoutes.post('/customer', requireAuth, StripeController.createSubscription);

  // Update customer object and billing information
  // payRoutes.put('/customer', requireAuth, StripeController.updateCustomerBillingInfo);

  // Delete subscription from customer
  // payRoutes.delete('/subscription', requireAuth, StripeController.deleteSubscription);

  // Upgrade or downgrade subscription
  // payRoutes.put('/subscription', requireAuth, StripeController.changeSubscription);

  // Fetch customer information
  // payRoutes.get('/customer', requireAuth, StripeController.getCustomer);


  //=========================
  // example - Communication Routes
  //=========================
  // api.rootRoute.use('/communication', communicationRoutes);

  // Send email from contact form
  // communicationRoutes.post('/contact', CommunicationController.sendContactForm);

};
