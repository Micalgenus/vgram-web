var gulp = require('gulp-param')(require('gulp'), process.argv),
  gutil = require('gulp-util'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  env = require('gulp-env'),
  rename = require("gulp-rename"),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint');

  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  pump = require('pump');

gutil.env.type === 'prod' ? env.set({NODE_ENV: "production"}) : env.set({NODE_ENV: "development"});
gutil.log('taskmode : ' + process.env.NODE_ENV);

gulp.task('lint', function () {
   gulp.src('./**/*.js')
      .pipe(jshint())
});

gulp.task('sass', function () {
  return gulp.src('./public/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'ios 8', 'android 4']
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('sass:watch', function () {
  livereload.listen();
  gulp.watch('./public/sass/**/*.scss', ['sass']);
});

gulp.task('minify-sass', function () {
  gulp.src('./public/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(cleanCSS({debug: true, compatibility: "*"}, function (details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/css'));
});


gulp.task('compress-script', function (cb) {
  return gulp.src('public/js/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('nodemon', function (debug, inspect, overwrite) {
   var execDebugMap = {
      js: 'node --debug-brk'
   }

   if (process.env.NODE_ENV === 'development') {
    livereload.listen();
  }

  if(debug || inspect) {
     if (inspect) {
        execDebugMap.js = 'node-inspect --inspect'
     }

     gutil.log('nodemon - ' + gutil.colors.magenta('debug mode'));
  }

   if(overwrite) {
      gutil.log('nodemon - ' + gutil.colors.magenta('overwrite database'));
   }

  nodemon({
     execMap: debug ? execDebugMap : {},
    script: './bin/www.js',
    ext: 'js coffee ejs',
    env: {
       'NODE_ENV': process.env.NODE_ENV === 'production' ? 'production' : 'development',
       'OVERWRITE': overwrite
     },
    stdout: false,
     tasks: ['lint'],
     verbose: true
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'nodemon',
  'sass:watch'
]);

gulp.task('debug', [
   'nodemon',
   'sass:watch'
]);

gulp.task('production', [
  'minify-sass',
  'compress-script',
  'nodemon'
]);
