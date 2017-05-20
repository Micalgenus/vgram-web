/**
 * Created by KIMSEONHO on 2016-08-16.
 */
const passport = require('passport'),
   express = require('express'),
   multer = require('multer'),
   i18n = require('i18n');

var web = {
   authController: require('./controllers/web/auth'),
   roomController: require('./controllers/web/view-room'),
   mapController: require('./controllers/web/view-map'),
   redirectController: require('./controllers/web/redirect'),
   userController: require('./controllers/web/view-user'),
   testController: require('./controllers/web/test'),

   // web 용 local passport Login -> 위에 requireLogin 쓰면 되는거 아님?
   // requireLogin: function (req, res, next) {
   //    return passport.authenticate('local', function (err, user, info) {
   //       if (err) {
   //          return next(err); // will generate a 500 error
   //       }
   //
   //       if (!user) {
   //          req.flash('email', req.body.email);
   //          req.flash('msg', '이메일 또는 패스워드가 일치하지 않습니다.');
   //          return res.redirect('/login');
   //       }
   //
   //       req.user = user;
   //       return next();
   //    })(req, res, next);
   // }
};

var api = {
   authController: require('./controllers/api/rest-auth'),
   postController: require('./controllers/api/posts'),
   testController: require('./controllers/api/test')    // test route
};

const passportService = require('./config/passport');   // 설정값 로딩때문에 필요함

// Middleware to require login/authRoute
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});
const init = function(req, res, next) {
   req.msg = req.flash('error') || req.flash('msg') || req.flash('success');
   req.env = process.env.NODE_ENV || "development";
   req.lang = req.getLocale();

   // 로그인이 되지 않았거나, 유효기간이 만료된 경우 쿠키 삭제
   if (req.user) {
      if (req.user.expired) {
         res.clearCookie('Authorization');
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

var env = process.env.NODE_ENV || "development";

var config = require('./config/main');
const value = require('./utils/staticValue');

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

   web.defaultRoute.get('/', requireAuth, init, function (req, res) {
      res.render('index', {
         ENV: env,
         logined: req.logined,
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
   web.testRoute.get('/protected', requireAuth, web.testController.protectedRoute);


   //=========================
   // API - Test Routes
   //=========================
   api.rootRoute.use('/test', api.testRoute);

   // Test API route
   api.testRoute.get('/', api.testController.getQuoterAPI);
   api.testRoute.get('/hello', api.testController.helloAPI);
   api.testRoute.get('/protected', requireAuth, api.testController.protectedRouteAPI);


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

   // 로그인View
   web.authRoute.get('/login', requireAuth, init, web.authController.loginView, web.redirectController.redirectMain);

   // Login route
   web.authRoute.post('/login', requireLogin, init, web.authController.setToken, web.redirectController.redirectMain);

   // Logout route: post로 변경해야함
   web.authRoute.get('/logout', web.authController.logout, init, web.redirectController.redirectMain);

   // Registration View route
   web.authRoute.get('/signup', requireAuth, init, web.authController.signup, web.redirectController.redirectMain);

   // Registration route
   web.authRoute.post('/signup', requireAuth, init, web.authController.signup, web.authController.register, requireLogin, web.authController.setToken, web.redirectController.redirectMain);

   //탈퇴 라우터
   web.authRoute.get('/quit', web.authController.quit);


   //=========================
   // API - Auth Routes
   //=========================
   api.rootRoute.use('/auth', api.authRoute);

   //유저 모든정보 출력 api
   api.authRoute.post('/info', api.authController.info);

   // Login route
   api.authRoute.post('/login', requireLogin, api.authController.login);

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
   web.userRoute.get('/change', requireAuth, init, web.userController.viewProfile);

   // 회원정보 조회 및 수정(Action)
   web.userRoute.post('/change', requireAuth, init, web.userController.change, web.authController.setToken, web.redirectController.redirectChange);

   // 회원정보 조회
   web.userRoute.get('/:memberIdx([0-9]+)', requireAuth, init, web.userController.viewProfile);


   //=========================
   // api - Member Routes
   //=========================

   // Set userRoute routes as a subgroup/middleware to api.rootRoute
   api.rootRoute.use('/user', api.userRoute);

   //회원정보 수정
   api.userRoute.post('/modifyInfo', requireLogin, api.authController.modifyInfo);

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
   web.postRoute.get('/embed/:ID', function (req, res) {
      //id를 가져와서 다른 이미지를 보여주는 로직 구현이 필요
      res.render('iframe/krpano', {ENV: env, title: 'Express', msg: 'krpano test'});
      // res.status(200).json({ quote: quoter.getRandomOne() });
   });

   //=========================
   // api - Post Routes
   //=========================
   api.rootRoute.use('/post', api.postRoute);

   //게시글 출력
   api.postRoute.get('/', api.postController.viewPosts);

   //공지사항 출력
   api.postRoute.get('/notice', api.postController.viewNotice);

   //media, attached 정보 저장(image-server에서 이용함)
   api.postRoute.post('/media-attached', requireAuth, api.postController.createMediaAttachedInfo);

   //=========================
   // web - Room Info Routes
   //=========================
   web.postRoute.use('/room', web.roomRoute);

   //  roomRouteInfoAPI.get('/', RoomInfoController.viewRoomInfoList);      // 수정필요
   web.roomRoute.get('/', init, web.roomController.roomInfoListView);

   // create new Room Info from authenticated userRoute
   web.roomRoute.get('/new', requireAuth, init, web.roomController.createRoomInfoView);
   web.roomRoute.post('/', requireAuth, web.roomController.createRoomInfo);


   // update Room Info Info from authenticated userRoute
   // roomRouteInfoAPI.put('/:roomRouteInfoIdx', requireAuth, roomRouteInfoImageUpload, RoomInfoController.updateRoomInfo);
   // roomRouteInfoView.get('/change/:roomRouteInfoIdx([0-9]+)', requireAuth, roomRouteInfoImageUpload, RoomInfoController.updateRoomInfo);
   web.roomRoute.get('/change/:roomInfoIdx([0-9]+)', requireAuth, init, web.roomController.changeRoomInfoView);
   web.roomRoute.put('/:roomInfoIdx([0-9]+)', requireAuth, web.roomController.updateRoomInfo);

   // delete Room Info Info from authnticated userRoute

   // get Room Info Info from authenticated userRoute
   // roomRouteInfoAPI.get('/:roomRouteInfoIdx([0-9]+)', RoomInfoController.viewRoomInfoDetail);
   web.roomRoute.get('/:roomInfoIdx([0-9]+)', init, web.roomController.roomInfoDetailView);

   web.roomRoute.get('/search', web.roomController.searchRoomListView);

   web.roomRoute.get('/json/:roomInfoIdx([0-9]+)', web.roomController.roomInfoDetailJson);
   web.roomRoute.get('/json/list/:roomIdxList(\[[0-9,]+\])', web.roomController.roomInfoListJson);


   //=========================
   // api - Room Info Routes
   //=========================
   api.postRoute.use('/room', api.roomRoute);

   api.roomRoute.delete('/:roomInfoIdx([0-9]+)', requireAuth, web.roomController.deleteRoomInfo);

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
