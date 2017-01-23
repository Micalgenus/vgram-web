/**
 * Created by KIMSEONHO on 2016-08-16.
 */
const passport = require('passport'),
  express = require('express'),
  multer = require('multer'),
  quoter  = require('./tests/quoter');    // test route

  multerConfig = require('./config/multer'),

  PublicController = require('./controllers/reference/public'),
  AuthController = require('./controllers/reference/authentication'),
  UserController = require('./controllers/reference/user'),
  ConsultController = require('./controllers/reference/consult'),
  BuildCaseController = require('./controllers/reference/build-case'),
  BizStoreController = require('./controllers/reference/biz-store'),
  RoomInfoController = require('./controllers/reference/room-info'),

  redirectViewController = require('./controllers/view/redirect'),

  // web
  AuthViewController = require('./controllers/view/auth'),
  UserViewController = require('./controllers/view/view-user');

const passportService = require('./config/passport');   // 설정값 로딩때문에 필요함

//이정현 추가
//로그인 부분
const AuthAPIController = require('./controllers/api/rest-auth');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

// Web 용 local passport Login
const requireViewLogin = function(req, res, next) {
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
};

var env = process.env.NODE_ENV || "development";

var config = require('./config/main');
const value = require('./utils/staticValue');

const buildCaseImageUpload = multer({ storage: multerConfig.buildCaseInfoStorage }).fields([
  { name: value.fieldName.prevImg, maxCount: 1 }, { name: value.fieldName.vrImg, maxCount: 15 }]);

const roomInfoImageUpload = multer({ storage: multerConfig.roomInfoStorage }).fields([
  { name: value.fieldName.prevImg, maxCount: 1 }, { name: value.fieldName.vrImg, maxCount: 15 }]);

const editorImageUpload = multer({ storage: multerConfig.editorImageStorage })
  .array(value.fieldName.EDITOR_IMAGE, 10);

const bizImageUpload = multer({ storage: multerConfig.bizMemberInfoStorage }).fields([
  { name: value.fieldName.LOGO_IMAGE, maxCount: 1 }, { name: value.fieldName.INTRO_IMAGE, maxCount: 1 }]);

var testFileUpload = multer({ dest: config.resourcePath + '/tests' }).any();


module.exports = function(app) {
  // Initializing route groups
  var viewRoutes = express.Router(),
    apiRoutes = express.Router(),

    publicAPI = express.Router(),
    authAPI = express.Router(),
    userAPI = express.Router(),
    consultAPI = express.Router(),
    bizStoreAPI = express.Router(),
    roomInfoAPI = express.Router(),

    publicView = express.Router(),
    authView = express.Router(),
    userView = express.Router(),
    consultView = express.Router(),
    bizStoreView = express.Router(),
    roomInfoView = express.Router();

  // chatRoutes = express.Router(),
  // payRoutes = express.Router(),
  // communicationRoutes = express.Router();

  //=========================
  // Default Routes
  //=========================

  // Test normal route
  viewRoutes.get('/', AuthViewController.init, function(req, res) {
    var msg = req.flash('msg');
    
    res.render('index', {
      ENV: env,
      logined: req.logined,
      title: 'Cozyhouzz',
      msg: msg
    });
  });

  //=========================
  // Test Routes
  //=========================


  /*이 route 주소들을 나중에 app.js에서 app.use를 사용하여 라우팅 해주는
  방식으로 고치는 것이 좋을것 같음, 지금은 빠르게 ui를 확인하려고 res.render로
  바로 확인하였음*/
  // Test view route
   viewRoutes.get('/test/view', function(req, res) {
      res.render('test', { ENV: env, title: 'Express', msg: 'Lets Go!' });
      // res.status(200).json({ quote: quoter.getRandomOne() });
   });

  // login view route,로그인
  viewRoutes.get('/login', AuthViewController.init, UserViewController.login);

   // signup view route,회원가입
   viewRoutes.get('/signup', function(req, res) {
      res.render('member/signup', { ENV: env, title: 'Express', msg: 'signup test' });
      // res.status(200).json({ quote: quoter.getRandomOne() });
   });

  // change view route,회원정보 수정
  viewRoutes.get('/change', requireAuth, AuthViewController.init, UserViewController.viewProfile);

   // consultingCounsel view route,컨설팅 정보 입력
   viewRoutes.get('/consultingCounsel', function(req, res) {
      res.render('consulting/counsel', { ENV: env, title: 'Express', msg: 'consultingCounsel test' });
      // res.status(200).json({ quote: quoter.getRandomOne() });
   });

   // krpano iframe view route, vr사진 높이 100%, 넓이 100%
   viewRoutes.get('/roomInfoVR/:id', function(req, res) {
      //id를 가져와서 다른 이미지를 보여주는 로직 구현이 필요
      res.render('iframe/krpano', { ENV: env, title: 'Express', msg: 'krpano test' });
      // res.status(200).json({ quote: quoter.getRandomOne() });
   });

   // Test API route
   apiRoutes.get('/test', function(req, res) {
    // res.render('index', { ENV: env, title: 'Express', msg: 'Lets Go!' });
    res.status(200).json({ quote: quoter.getRandomOne() });
  });

  // Test protected route, 회원 id를 포함한 정보는 jwt값으로 인코딩해서 보내야 함.
  apiRoutes.get('/test/protected', requireAuth, function(req, res) {
    res.status(200).json({ content: 'The protected test route is functional!'});
  });

  //=========================
  // public Routes
  //=========================

  // Set public routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/public', publicAPI);

  // upload Image and return path when try to attaching device image
  publicAPI.post('/image', requireAuth, editorImageUpload, PublicController.uploadEditorImage);

  // test - upload file and return path when try to attaching device file
   publicAPI.post('/file/test', testFileUpload, PublicController.uploadFileTest);

  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/', authAPI);
  viewRoutes.use('/auth', authView);

  //호세요청 api
  authAPI.post('/info', AuthAPIController.info);

  // Login route
  authAPI.post('/login', requireLogin, AuthAPIController.login);
  authView.post('/login', AuthViewController.login, requireViewLogin, AuthViewController.setToken, redirectViewController.redirectMain);

  // Logout route
  authView.get('/logout', AuthViewController.logout, redirectViewController.redirectMain);

  // Registration route
  //authAPI.post('/register', AuthController.register);
  //authView.get('/register', AuthController.register);
  authAPI.post('/register', AuthAPIController.register);
  authView.get('/register', AuthViewController.register);

   //탈퇴 라우터
   authAPI.post('/quit', AuthAPIController.quit);
   authView.get('/quit', AuthViewController.quit);

   //회원정보 수정
   authAPI.post('/modifyInfo', AuthAPIController.modifyInfo);

  // Password reset request route (generate/send token)
   authAPI.post('/forgot-password', AuthController.forgotPassword);
  authView.get('/forgot-password', AuthController.register);


   authAPI.post('/reset-password/:token', AuthController.verifyToken);
  authView.get('/reset-password/:token', AuthController.verifyToken);

   //=========================
  // Member Routes
  //=========================

  // Set user routes as a subgroup/middleware to apiRoutes
  apiRoutes.use('/user', userAPI);
   viewRoutes.use('/user', userView);

  // View public user profile route
  userAPI.get('/:memberIdx([0-9]+)', requireAuth, UserController.viewProfile);
  //userView.get('/:memberIdx([0-9]+)', requireAuth, UserController.viewProfile);
  userView.get('/:memberIdx([0-9]+)', UserViewController.viewProfile);

  // Update user profile route   <- 일반 회원와 사업주 회원을 같이 처리하자
  userAPI.put('/:memberIdx([0-9]+)', requireAuth, UserController.updateProfile, requireLogin, AuthController.login);
   userView.get('/update/:memberIdx([0-9]+)', requireAuth, UserController.updateProfile);

  // View business user profile route
  // userRoutes.get('/biz/:memberIdx', requireAuth, UserController.viewBizProfile);

  // update business user profile route - 이미지 업로드 기능을 추가해야함.
  // userRoutes.put('/biz/:memberIdx', requireAuth, bizImageUpload, UserController.updateBizProfile);


  //=========================
  // Biz Store Route - 업체 목록 조회
  //=========================

  // Set chat routes as a subgroup/middleware to apiRoutes
  apiRoutes.use('/biz-store', bizStoreAPI);
   viewRoutes.use('/biz-store', bizStoreView);

  // View business user profile list route(must get query(?pageSize={}&pageStartIndex={}) param)
   bizStoreAPI.get('/', BizStoreController.viewBizProfileList);
   bizStoreView.get('/list', BizStoreController.viewBizProfileList);

  // View business user profile to customer route
  bizStoreAPI.get('/:memberIdx([0-9]+)', BizStoreController.viewBizProfile);
   bizStoreView.get('/:memberIdx([0-9]+)', BizStoreController.viewBizProfile);


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
   // Communication Routes
   //=========================
   // apiRoutes.use('/communication', communicationRoutes);

   // Send email from contact form
   // communicationRoutes.post('/contact', CommunicationController.sendContactForm);

  //=========================
  // API - Consult Routes
  //=========================
  apiRoutes.use('/consult', consultAPI);
  viewRoutes.use('/consult', consultView);

  // insert consulting information
  consultAPI.post('/', requireAuth, ConsultController.consultingCounsel);
   consultView.get('/create', requireAuth, ConsultController.consultingCounsel);

  // consulting information list
   consultAPI.get('/', ConsultController.consultingList);
   consultView.get('/list', RoomInfoController.viewRoomInfoList);

  // my consulting information list
  consultAPI.get('/my/', requireAuth, ConsultController.consultingMyList);
   consultView.get('/my/list', requireAuth, ConsultController.consultingMyList);

  // consulting information detail
   consultAPI.get('/:consultIdx([0-9]+)', requireAuth, ConsultController.consultingDetail);
   consultView.get('/:consultIdx([0-9]+)', requireAuth, ConsultController.consultingDetail);

  // modify consulting information
  consultAPI.put('/:consultIdx([0-9]+)', requireAuth, ConsultController.consultingModify);
   consultView.get('/update/:consultIdx([0-9]+)', requireAuth, ConsultController.consultingModify);

  // delete consulting information
   consultAPI.delete('/:consultIdx([0-9]+)', requireAuth, ConsultController.consultingDelete);

   // search consulting information list
   apiRoutes.get('/search/consult', RoomInfoController.searchRoomInfoList);


   //=========================
  // API - Room Info Routes
  //=========================
  apiRoutes.use('/room', roomInfoAPI);
   viewRoutes.use('/room', roomInfoView);

   roomInfoAPI.get('/', RoomInfoController.viewRoomInfoList);      // 수정필요
   roomInfoView.get('/list', RoomInfoController.viewRoomInfoList);

  // create new Room Info from authenticated user
  roomInfoAPI.post('/', requireAuth, roomInfoImageUpload, RoomInfoController.createRoomInfoAndVRPano);
   roomInfoView.get('/create', requireAuth, roomInfoImageUpload, RoomInfoController.createRoomInfoAndVRPano);

  // update Room Info Info from authenticated user
  roomInfoAPI.put('/:roomInfoIdx', requireAuth, roomInfoImageUpload, RoomInfoController.updateRoomInfo);
   roomInfoView.get('/update/:roomInfoIdx([0-9]+)', requireAuth, roomInfoImageUpload, RoomInfoController.updateRoomInfo);

   // delete Room Info Info from authenticated user
   roomInfoAPI.delete('/:roomInfoIdx([0-9]+)', requireAuth, RoomInfoController.deleteRoomInfo);

   // get Room Info Info from authenticated user
  roomInfoAPI.get('/:roomInfoIdx([0-9]+)', RoomInfoController.viewRoomInfoDetail);
   roomInfoView.get('/:roomInfoIdx([0-9]+)', RoomInfoController.viewRoomInfoDetail);

  apiRoutes.get('/search/room', RoomInfoController.searchRoomInfoList);

  // Set url for View, API group routes
  app.use('/', viewRoutes);
  app.use('/api', apiRoutes);
};
