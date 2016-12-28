var gulp = require('gulp'),
  gutil = require('gulp-util'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  env = require('gulp-env'),

//   sass = require('gulp-sass'),
  less = require('gulp-less'),
  cleanCSS = require('gulp-clean-css'),
  pump = require('pump');

// gulp.task('sass', function () {
//   gulp.src('./public/sass/*.scss')
//     .pipe(plumber())
//     .pipe(sass())
//     .pipe(gulp.dest('./public/css'))
//     .pipe(livereload());
// });

gutil.env.type === 'prod' ? env.set({NODE_ENV: "production"}) : env.set({NODE_ENV: "development"});
gutil.log('taskmode : ' + process.env.NODE_ENV);

gulp.task('less', function () {
  gulp.src('./public/less/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('minify-less', function () {
  gulp.src('./public/less/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(cleanCSS({debug: true, compatibility: "*"}, function (details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .rename({suffix: '.min'})
    .pipe(gulp.dest('./public/css'));
});

gulp.task('compress-script', function (cb) {
  return gulp.src('public/js/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function () {
  gulp.watch('./public/less/*.less', ['less']);
});

gulp.task('nodemon', function () {
  if (process.env.NODE_ENV === 'development') {
    livereload.listen();
  }

  nodemon({
    script: './bin/www.js',
    ext: 'js coffee ejs',
    env: {'NODE_ENV': process.env.NODE_ENV === 'production' ? 'production' : 'development'},
    stdout: false
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
  'less',
  'nodemon',
  'watch'
]);

gulp.task('production', [
  'minify-less',
  'compress-script',
  'nodemon'
]);
