// include gulp
var gulp = require('gulp'); 
 
// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');


var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

// // include plug-ins
var autoprefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var browserSync = require('browser-sync').create();
var spritesmith = require('gulp.spritesmith');

var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var es = require("event-stream");



gulp.task('sprites', function () {
	var spriteData = gulp.src('src/img/sprites/*.png').pipe(spritesmith({
		algorithm: 'top-down',
		imgName: 'sprite.png',
		cssName: '../../src/scss/include/spritesmith.scss',
		imgPath: '../img/sprite.png',
		cssFormat: 'scss',
		padding: 5
	}));
	spriteData.pipe(gulp.dest('build/img'));
});


//JS hint task
gulp.task('jshint', function() {

});

gulp.task('fonts', function() {
  var fontSrc = './src/fonts/**/*',
      fontDst = './build/fonts';
 
  gulp.src(fontSrc)
    .pipe(gulp.dest(fontDst))
	.pipe(browserSync.stream());
});


gulp.task('imagemin', function() {
 
  gulp.src('./src/img/images/**/*')
    .pipe(changed('./build/img/images'))
    //.pipe(imagemin())
    .pipe(gulp.dest('./build/img/images'))
	.pipe(browserSync.stream());

  gulp.src('./src/img/i/**/*')
    .pipe(changed('./build/img/i'))
    //.pipe(imagemin())
    .pipe(gulp.dest('./build/img/i'))
	.pipe(browserSync.stream());
});


 
//JS concat, strip debugging and minify
gulp.task('scripts', function() {
    es.merge(
        gulp.src(['./src/js/script/*.js']),
        gulp.src('./src/js/script/*.coffee').pipe(coffee({bare: true}).on('error', gutil.log))
    )
    .pipe(concat('script.js'))
    //.pipe(stripDebug())
    //.pipe(uglify())
    .pipe(gulp.dest('./build/js/'))
	.pipe(browserSync.stream());

  gulp.src('./src/js/pre/*.js')
	.pipe(concat('pre.js'))
	//.pipe(stripDebug())
	//.pipe(uglify())
	.pipe(gulp.dest('./build/js/'))
	  .pipe(browserSync.stream());

  gulp.src('./src/js/lib/**/*.js')
    .pipe(concat('lib.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'))
	  .pipe(browserSync.stream());

});


gulp.task('sass', function () {
    gulp.src('./src/scss/*.scss')
      //.pipe(sass({errLogToConsole:true,outputStyle: 'compressed'}))
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefix('last 2 versions'))
      .pipe(gulp.dest('./build/css'))
		.pipe(browserSync.stream());
});


gulp.task('webserver', function() {
	browserSync.init({
		server: {
			baseDir: "./build/"
		}
	});
});

gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src('./src/jade/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./build/'))
	  .pipe(browserSync.stream());
});


gulp.task('default', ['imagemin','scripts', 'sass', 'jade', 'webserver', 'sprites', 'fonts'], function() {

  gulp.watch('./src/img/sprites/*', function() {
    gulp.run('sprites');
  });

	gulp.watch('./src/fonts/**/*', function() {
		gulp.run('fonts');
	});


	gulp.watch(['./src/img/images/**/*','./src/img/i/**/*'], function() {
    gulp.run('imagemin');
  });
 
  gulp.watch(['./src/jade/**/*.jade'], function() {
     gulp.run('jade');
  });
 
  // watch for JS changes
  gulp.watch(['./src/js/**/*.js', './src/js/**/*.coffee'], function() {
    gulp.run('jshint', 'scripts');
  });
 
  gulp.watch(['./src/scss/**/*.scss'], function() {
    gulp.run('sass');
  });

});