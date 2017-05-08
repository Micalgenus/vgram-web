/**
 * Created by KIMSEONHO on 2016-08-16.
 */
const passport = require('passport'),
  express = require('express'),
  multer = require('multer'),
  tests  = require('./controllers/test/hello-world');    // test route

var web = {
   authController: require('./controllers/web/auth'),
   roomController: require('./controllers/web/view-room'),
   mapController: require('./controllers/web/view-map'),
   redirectController: require('./controllers/web/redirect'),
   userController: require('./controllers/web/view-user'),

   // web 용 local passport Login -> 위에 requireLogin 쓰면 되는거 아님?
   requireLogin: function(req, res, next) {
      return passport.authenticate('local', function(err, user, info) {
         if (err) {
            return next(err); // will generate a 500 error
         }

         if (! user) {
            req.flash('email', req.body.email);
            req.flash('msg', '이메일 또는 패스워드가 일치하지 않습니다.');
            return res.redirect('/login');
         }

         req.user = user;
         return next();
      }) (req, res, next);
   }
};

var api = {
   authController: require('./controllers/api/rest-auth'),
   postController: require('./controllers/api/posts')
};

const passportService = require('./config/passport');   // 설정값 로딩때문에 필요함

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

var env = process.env.NODE_ENV || "development";

var config = require('./config/main');
const value = require('./utils/staticValue');

// const buildCaseImageUpload = multer({ storage: multerConfig.buildCaseInfoStorage }).fields([
//   { name: value.fieldName.prevImg, maxCount: 1 }, { name: value.fieldName.vrImg, maxCount: 15 }]);
//
// const roomInfoImageUpload = multer({ storage: multerConfig.roomInfoStorage }).fields([
//   { name: value.fieldName.prevImg, maxCount: 1 }, { name: value.fieldName.vrImg, maxCount: 15 }]);
//
// const editorImageUpload = multer({ storage: multerConfig.editorImageStorage })
//   .array(value.fieldName.EDITOR_IMAGE, 10);
//
// const bizImageUpload = multer({ storage: multerConfig.bizMemberInfoStorage }).fields([
//   { name: value.fieldName.LOGO_IMAGE, maxCount: 1 }, { name: value.fieldName.INTRO_IMAGE, maxCount: 1 }]);
//
// var testFileUpload = multer({ dest: config.resourcePath + '/tests' }).any();

module.exports = function(app) {
  // Initializing route groups
  var webRoutes = express.Router(),
    apiRoutes = express.Router();

    web.default = express.Router();
    web.room = express.Router();
    web.search = express.Router();
    web.map = express.Router();
    web.consult = express.Router();
    web.auth = express.Router();
    web.user = express.Router();
    web.public = express.Router();
    web.post = express.Router();
    web.test = express.Router();

    api.default = express.Router();
    api.public = express.Router();
    api.consult = express.Router();
    api.auth = express.Router();
   api.user = express.Router();
   api.post = express.Router();
   api.room = express.Router();
   api.test = express.Router();

   // Set url for View, API group routes
   app.use('/', webRoutes);
   app.use('/api', apiRoutes);


  //=========================
  // Web - Default Routes
  //=========================
   webRoutes.use('/', web.default);

  web.default.get('/', web.authController.init, function(req, res) {
    res.render('index', {
      ENV: env,
      logined: req.logined,
      title: 'Cozyhouzz',
      msg: req.msg
    });
  });


   //=========================
   // api - Default Routes
   //=========================
   apiRoutes.use('/', api.default);


   //=========================
   // web - Test Routes
   //=========================
   webRoutes.use('/test', web.test);

   // Test API route
   web.test.get('/', tests.getQuoter);
   web.test.get('/hello', tests.hello);
   web.test.get('/protected', requireAuth, tests.protectedRoute);

  //=========================
  // API - Test Routes
  //=========================
   apiRoutes.use('/test', api.test);

   // Test API route
   api.test.get('/', tests.getQuoter);
   api.test.get('/hello', tests.hello);
   api.test.get('/protected', requireAuth, tests.protectedRoute);


  //=========================
  // web - public Routes
  //=========================
   webRoutes.use('/public', web.public);



   //=========================
   // API - public Routes
   //=========================
   apiRoutes.use('/public', api.public);


   // Set public routes as subgroup/middleware to apiRoutes

  // upload Image and return path when try to attaching device image
  // publicAPI.post('/image', requireAuth, editorImageUpload, PublicController.uploadEditorImage);

  // test - upload file and return path when try to attaching device file
  //  publicAPI.post('/file/test', testFileUpload, PublicController.uploadFileTest);


   // consultingCounsel view route,컨설팅 정보 입력
   // webRoutes.get('/consultingCounsel', function(req, res) {
   //    res.render('consulting/counsel', { ENV: env, title: 'Express', msg: 'consultingCounsel test' });
   //    // res.status(200).json({ quote: quoter.getRandomOne() });
   // });



  //=========================
  // web - Auth Routes
  //=========================
   webRoutes.use('/auth', web.auth);

   // Login route
   web.auth.post('/login', web.authController.login, web.requireLogin, web.authController.setToken, web.redirectController.redirectMain);

   // Logout route
   web.auth.get('/logout', web.authController.logout, web.redirectController.redirectMain);

   // Registration route
   web.auth.post('/signup', web.authController.signup, web.authController.register, web.requireLogin, web.authController.setToken, web.redirectController.redirectMain);

   //탈퇴 라우터
   web.auth.get('/quit', web.authController.quit);


   //=========================
   // API - Auth Routes
   //=========================
   apiRoutes.use('/auth', api.auth);

  //유저 모든정보 출력 api
   api.auth.post('/info', api.authController.info);

  // Login route
   api.default.post('/login', requireLogin, api.authController.login);

  // Registration route
   api.default.post('/register', api.authController.register);

   //탈퇴 라우터
   api.default.post('/quit', api.authController.quit);

   //회원정보 수정
   api.default.post('/modifyInfo', requireLogin, api.authController.modifyInfo);

  // Password reset request route (generate/send token)
   api.default.post('/forgot-password', api.authController.forgotPassword);
  // authView.get('/forgot-password', authController.register);


   // authAPI.post('/reset-password/:token', authController.verifyToken);
  // authView.get('/reset-password/:token', authController.verifyToken);


   //=========================
   // web - Member Routes
   //=========================
   webRoutes.use('/user', web.user);

   // 회원정보 조회 및 수정(View)
   web.user.get('/change', web.authController.init, requireAuth, web.userController.viewProfile);

   // 회원정보 조회 및 수정(Action)
   web.user.post('/change', requireAuth, web.authController.change, web.authController.setToken, web.redirectController.redirectChange);

   // 회원정보 조회
   web.user.get('/:memberIdx([0-9]+)', web.userController.viewProfile);



   //=========================
  // api - Member Routes
  //=========================

  // Set user routes as a subgroup/middleware to apiRoutes
  apiRoutes.use('/user', api.user);


  // View public user profile route
  // userAPI.get('/:memberIdx([0-9]+)', requireAuth, UserController.viewProfile);
  //userView.get('/:memberIdx([0-9]+)', requireAuth, UserController.viewProfile);

  // Update user profile route   <- 일반 회원와 사업주 회원을 같이 처리하자
  // userAPI.put('/:memberIdx([0-9]+)', requireAuth, UserController.updateProfile, requireLogin, authController.login);
  //  userView.get('/update/:memberIdx([0-9]+)', requireAuth, UserController.updateProfile);

  // View business user profile route
  // userRoutes.get('/biz/:memberIdx', requireAuth, UserController.viewBizProfile);

  // update business user profile route - 이미지 업로드 기능을 추가해야함.
  // userRoutes.put('/biz/:memberIdx', requireAuth, bizImageUpload, UserController.updateBizProfile);


   //=========================
   // web - Post Routes
   //=========================
   webRoutes.use('/post', web.post);


   // krpano iframe view route, vr사진 높이 100%, 넓이 100%
   web.post.get('/embed/:ID', function(req, res) {
      //id를 가져와서 다른 이미지를 보여주는 로직 구현이 필요
      res.render('iframe/krpano', { ENV: env, title: 'Express', msg: 'krpano test' });
      // res.status(200).json({ quote: quoter.getRandomOne() });
   });

   //=========================
   // api - Post Routes
   //=========================
   apiRoutes.use('/post', api.post);

   //게시글 출력
   api.post.get('/', api.postController.viewPosts);

   //공지사항 출력
   api.post.get('/notice', api.postController.viewNotice);



   //=========================
   // web - Room Info Routes
   //=========================
   webRoutes.use('/room', web.room);

   //  roomInfoAPI.get('/', RoomInfoController.viewRoomInfoList);      // 수정필요
   web.room.get('/', web.authController.init, web.roomController.roomInfoListView);

   // create new Room Info from authenticated user
   // roomInfoAPI.post('/', requireAuth, roomInfoImageUpload, RoomInfoController.createRoomInfoAndVRPano);
   // roomInfoView.get('/new', requireAuth, roomInfoImageUpload, RoomInfoController.createRoomInfoAndVRPano);
   web.room.get('/new', web.authController.init, requireAuth, web.roomController.createRoomInfoView);
   web.room.post('/', requireAuth, web.roomController.createRoomInfo);


   // update Room Info Info from authenticated user
   // roomInfoAPI.put('/:roomInfoIdx', requireAuth, roomInfoImageUpload, RoomInfoController.updateRoomInfo);
   // roomInfoView.get('/change/:roomInfoIdx([0-9]+)', requireAuth, roomInfoImageUpload, RoomInfoController.updateRoomInfo);
   web.room.get('/change/:roomInfoIdx([0-9]+)', web.roomController.changeRoomInfoView);
   web.room.put('/:roomInfoIdx([0-9]+)', requireAuth, web.roomController.updateRoomInfo);

   // delete Room Info Info from authenticated user

   // get Room Info Info from authenticated user
   // roomInfoAPI.get('/:roomInfoIdx([0-9]+)', RoomInfoController.viewRoomInfoDetail);
   web.room.get('/:roomInfoIdx([0-9]+)', web.authController.init, web.roomController.roomInfoDetailView);

   web.room.get('/search', web.roomController.searchRoomListView);

   web.room.get('/json/:roomInfoIdx([0-9]+)', web.roomController.roomInfoDetailJson);
   web.room.get('/json/list/:roomIdxList(\[[0-9,]+\])', web.roomController.roomInfoListJson);


  //=========================
  // api - Room Info Routes
  //=========================
   apiRoutes.use('/room', api.room);

   api.room.delete('/:roomInfoIdx([0-9]+)', requireAuth, web.roomController.deleteRoomInfo);

   //룸세부정보 출력
   api.room.get('/:roomInfoIdx', api.postController.viewRoomDetail);

  //=========================
  // web - Map Info Routes
  //=========================
  webRoutes.use('/map', web.map);
  web.map.get('/room/locations/:east/:west/:south/:north', web.mapController.getRoomLocations);



   //=========================
   // web - Consult Routes
   //=========================
   webRoutes.use('/consult', web.consult);


   //=========================
   // API - Consult Routes
   //=========================
   apiRoutes.use('/consult', api.consult);





   // insert consulting information
   // consultAPI.post('/', requireAuth, ConsultController.consultingCounsel);
   //  consultView.get('/create', requireAuth, ConsultController.consultingCounsel);

   // consulting information list
   //  consultAPI.get('/', ConsultController.consultingList);
   //  consultView.get('/list', web.roomController.viewRoomInfoList);

   // my consulting information list
   // consultAPI.get('/my/', requireAuth, ConsultController.consultingMyList);
   //  consultView.get('/my/list', requireAuth, ConsultController.consultingMyList);

   // consulting information detail
   //  consultAPI.get('/:consultIdx([0-9]+)', requireAuth, ConsultController.consultingDetail);
   //  consultView.get('/:consultIdx([0-9]+)', requireAuth, ConsultController.consultingDetail);

   // modify consulting information
   // consultAPI.put('/:consultIdx([0-9]+)', requireAuth, ConsultController.consultingModify);
   //  consultView.get('/update/:consultIdx([0-9]+)', requireAuth, ConsultController.consultingModify);

   // delete consulting information
   //  consultAPI.delete('/:consultIdx([0-9]+)', requireAuth, ConsultController.consultingDelete);

   // search consulting information list
   // apiRoutes.get('/search/consult', RoomInfoController.searchRoomInfoList);



   //=========================
   // web - Biz Store Route - 업체 목록 조회
   //=========================

   // Set chat routes as a subgroup/middleware to apiRoutes
   // apiRoutes.use('/biz-store', bizStoreAPI);
   //  webRoutes.use('/biz-store', bizStoreView);

   // View business user profile list route(must get query(?pageSize={}&pageStartIndex={}) param)
   //  bizStoreAPI.get('/', BizStoreController.viewBizProfileList);
   //  bizStoreView.get('/list', BizStoreController.viewBizProfileList);

   // View business user profile to customer route
   // bizStoreAPI.get('/:memberIdx([0-9]+)', BizStoreController.viewBizProfile);
   //  bizStoreView.get('/:memberIdx([0-9]+)', BizStoreController.viewBizProfile);



   //=========================
   // web : Biz Route - 업체 목록 조회(사용X)
   //=========================
   //  web.default.get('/biz', web.authController.init, BizViewController.bizList);
   //  web.default.get('/bizdetail', redirectViewController.redirectBizList);
   //  web.default.get('/bizdetail/:idx([0-9]+)', web.authController.init, BizViewController.bizDetail);


   //=========================
   // api - Biz Store Route - 업체 목록 조회
   //=========================


   //=========================
   // API -  Payment Routes
   //=========================
   // apiRoutes.use('/pay', payRoutes);

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
   // apiRoutes.use('/communication', communicationRoutes);

   // Send email from contact form
   // communicationRoutes.post('/contact', CommunicationController.sendContactForm);

};
