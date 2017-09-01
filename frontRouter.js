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
  postController: require('./controllers/api/posts'),
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

const loginCheck = function(req, res, next) {
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
      msg: req.msg
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


  // consultingCounsel view route,컨설팅 정보 입력
  // webRoutes.get('/consultCounsel', function(req, res) {
  //    res.render('consult/counsel', { ENV: env, title: 'Express', msg: 'consultingCounsel test' });
  //    // res.status(200).json({ quote: quoter.getRandomOne() });
  // });


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
  api.authRoute.post('/info', api.authController.info);

  // Login route
  api.authRoute.post('/login', requireAPIAuth, api.authController.login);

  // Registration route
  api.authRoute.post('/register', api.authController.register);

  //탈퇴 라우터
  api.authRoute.post('/quit', api.authController.quit);

  // Password reset request route (generate/send token)
  api.authRoute.post('/forgot-password', api.authController.forgotPassword);
  // authRouteView.get('/forgot-password', authRouteController.register);


  // authRouteAPI.post('/reset-password/:token', authRouteController.verifyToken);
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

  //=========================
  // api - Member Routes
  //=========================

  // Set userRoute routes as a subgroup/middleware to api.rootRoute
  api.rootRoute.use('/user', api.userRoute);

  api.userRoute.get('/:memberIdx([0-9]+)/json/follower', requireWebAuth, init, web.userController.getFollower);
  api.userRoute.get('/:memberIdx([0-9]+)/json/following', requireWebAuth, init, web.userController.getFollowing);
  api.userRoute.get('/:memberIdx([0-9]+)/json/posts', requireWebAuth, init, web.userController.getPosts);
  api.userRoute.get('/:memberIdx([0-9]+)/json/replies', requireWebAuth, init, web.userController.getReplies);
  api.userRoute.get('/:memberIdx([0-9]+)/json/likeposts', requireWebAuth, init, web.userController.getLikeposts);

  //회원정보 수정
  api.userRoute.post('/modifyInfo', requireAPIAuth, api.authController.modifyInfo);

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


  // krpano iframe view route, vr사진 높이 100%, 넓이 100%
  web.postRoute.get('/embed/:ID', init, function (req, res) {
    //id를 가져와서 다른 이미지를 보여주는 로직 구현이 필요
    res.render('iframe/krpano', {
      ENV: env,
      title: 'embedView',
      msg: req.msg
    });

    // res.status(200).json({ quote: quoter.getRandomOne() });
  });

  //=========================
  // api - Post Routes
  //=========================
  api.rootRoute.use('/post', api.postRoute);

  //게시글 출력
  api.postRoute.get('/', api.postController.viewPosts);

  // create new Room Info from authenticated userRoute
  web.postRoute.get('/new', requireWebAuth, init, web.roomController.createRoomInfoView);
  web.postRoute.post('/new', requireWebAuth, loginCheck, web.postController.createPostInfo);

  // delete post
  web.postRoute.get('/delete/:postIdx([0-9]+)', requireWebAuth, web.postController.deletePost);

  //공지사항 출력
  api.postRoute.get('/notice', api.postController.viewNotice);

  //media, attached 정보 저장(image-server에서 이용함)
  //2017-05-29 이정현 개발
  api.postRoute.post('/images', requireAPIAuth, api.postController.createNormalImageInfo);
  api.postRoute.post('/vtour', requireAPIAuth, api.postController.createVRImageVtourInfo);

  web.postRoute.get('/info/:postIdx([0-9]+)', web.postController.getPostInfoJson);

  // index list
  web.postRoute.get('/html/:roomListPage([0-9]+)', web.postController.roomHtmlList);

  // comment
  web.postRoute.post('/comment/new/:postIdx([0-9]+)', requireWebAuth, web.postController.createPostComment);

  //=========================
  // web - Room Info Routes
  //=========================
  web.postRoute.use('/room', web.roomRoute);

  //  roomRouteInfoAPI.get('/', RoomInfoController.viewRoomInfoList);      // 수정필요
  web.roomRoute.get('/', requireWebAuth, init, web.roomController.roomInfoListView);

  // create new Room Info from authenticated userRoute
  web.roomRoute.get('/new', requireWebAuth, init, web.roomController.createRoomInfoView);
  // web.roomRoute.post('/', requireWebAuth, web.roomController.createRoomInfo);


  // update Room Info Info from authenticated userRoute
  // roomRouteInfoAPI.put('/:roomRouteInfoIdx', requireAuth, roomRouteInfoImageUpload, RoomInfoController.updateRoomInfo);
  // roomRouteInfoView.get('/change/:roomRouteInfoIdx([0-9]+)', requireAuth, roomRouteInfoImageUpload, RoomInfoController.updateRoomInfo);
  web.roomRoute.get('/change/:roomInfoIdx([0-9]+)', requireWebAuth, init, web.roomController.changeRoomInfoView);
  web.roomRoute.put('/:roomInfoIdx([0-9]+)', requireWebAuth, web.roomController.updateRoomInfo);

  // delete Room Info Info from authnticated userRoute

  // get Room Info Info from authenticated userRoute
  // roomRouteInfoAPI.get('/:roomRouteInfoIdx([0-9]+)', RoomInfoController.viewRoomInfoDetail);
  web.roomRoute.get('/:roomInfoIdx([0-9]+)', requireWebAuth, init, web.roomController.roomInfoDetailView);

  web.roomRoute.get('/search', web.roomController.searchRoomListView);

  web.roomRoute.get('/html/:roomListPage([0-9]+)', web.roomController.roomHtmlList);

  web.roomRoute.get('/json/:roomInfoIdx([0-9]+)', web.roomController.roomInfoDetailJson);
  web.roomRoute.get('/json/list/:roomIdxList(\[[0-9,]+\])', web.roomController.roomInfoListJson);
  web.roomRoute.get('/json/address/init', web.roomController.roomInfoAddressJsonInit);
  web.roomRoute.get('/json/address/:address', web.roomController.roomInfoAddressJson);
  web.roomRoute.get('/json/address/info/:address', web.roomController.roomInfoAddressOneJson);

  web.roomRoute.post('/comment/:room([0-9]+)', requireWebAuth, web.roomController.roomCommentWrite);


  //=========================
  // api - Room Info Routes
  //=========================
  api.postRoute.use('/room', api.roomRoute);

  api.roomRoute.delete('/:roomInfoIdx([0-9]+)', requireAPIAuth, web.roomController.deleteRoomInfo);

  //룸세부정보 출력
  api.roomRoute.get('/:roomInfoIdx', api.postController.viewRoomDetail);

  //=========================
  // web - Map Info Routes
  //=========================
  web.rootRoute.use('/map', web.mapRoute);
  web.mapRoute.get('/room/locations/:east/:west/:south/:north', web.mapController.getRoomLocations);


  //=========================
  // web - Consult Routes
  //=========================
  web.rootRoute.use('/consult', web.consultRoute);


  //=========================
  // API - Consult Routes
  //=========================
  api.rootRoute.use('/consult', api.consultRoute);


  // insert consultRouteing information
  // consultRouteAPI.post('/', requireAuth, ConsultController.consultRouteingCounsel);
  //  consultRouteView.get('/create', requireAuth, ConsultController.consultRouteingCounsel);

  // consultRouteing information list
  //  consultRouteAPI.get('/', ConsultController.consultRouteingList);
  //  consultRouteView.get('/list', web.roomRouteController.viewRoomInfoList);

  // my consultRouteing information list
  // consultRouteAPI.get('/my/', requireAuth, ConsultController.consultRouteingMyList);
  //  consultRouteView.get('/my/list', requireAuth, ConsultController.consultRouteingMyList);

  // consultRouteing information detail
  //  consultRouteAPI.get('/:consultRouteIdx([0-9]+)', requireAuth, ConsultController.consultRouteingDetail);
  //  consultRouteView.get('/:consultRouteIdx([0-9]+)', requireAuth, ConsultController.consultRouteingDetail);

  // modify consultRouteing information
  // consultRouteAPI.put('/:consultRouteIdx([0-9]+)', requireAuth, ConsultController.consultRouteingModify);
  //  consultRouteView.get('/update/:consultRouteIdx([0-9]+)', requireAuth, ConsultController.consultRouteingModify);

  // delete consultRouteing information
  //  consultRouteAPI.delete('/:consultRouteIdx([0-9]+)', requireAuth, ConsultController.consultRouteingDelete);

  // searchRoute consultRouteing information list
  // api.rootRoute.get('/searchRoute/consultRoute', RoomInfoController.searchRouteRoomInfoList);


  //=========================
  // web - Biz Store Route - 업체 목록 조회
  //=========================

  // Set chat routes as a subgroup/middleware to api.rootRoute
  // api.rootRoute.use('/biz-store', bizStoreAPI);
  //  webRoutes.use('/biz-store', bizStoreView);

  // View business userRoute profile list route(must get query(?pageSize={}&pageStartIndex={}) param)
  //  bizStoreAPI.get('/', BizStoreController.viewBizProfileList);
  //  bizStoreView.get('/list', BizStoreController.viewBizProfileList);

  // View business userRoute profile to customer route
  // bizStoreAPI.get('/:memberIdx([0-9]+)', BizStoreController.viewBizProfile);
  //  bizStoreView.get('/:memberIdx([0-9]+)', BizStoreController.viewBizProfile);


  //=========================
  // web : Biz Route - 업체 목록 조회(사용X)
  //=========================
  //  web.defaultRoute.get('/biz', web.authRouteController.init, BizViewController.bizList);
  //  web.defaultRoute.get('/bizdetail', redirectViewController.redirectBizList);
  //  web.defaultRoute.get('/bizdetail/:idx([0-9]+)', web.authRouteController.init, BizViewController.bizDetail);


  //=========================
  // api - Biz Store Route - 업체 목록 조회
  //=========================


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
