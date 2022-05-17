import gulp from 'gulp';
import sync from 'browser-sync';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import plumberNotifier from "gulp-plumber-notifier";
import newer from 'gulp-newer'
import imagemin from "gulp-imagemin";
import sourcemaps from "gulp-sourcemaps";
import del from 'del';

const sassRun = gulpSass(dartSass);
const browserSync = sync.create();

function browsersync () {
  browserSync.init({
    server: {
      baseDir: "prod/"
    }
  })
}

function fonts () {
  return gulp.src('dev/fonts/**/*.*')
  .pipe(gulp.dest('prod/fonts'))
}

function image () {
  return gulp.src('dev/images/**/*.*')
  .pipe(newer("prod/images"))
  .pipe(imagemin())  
  .pipe(gulp.dest('prod/images'))
  .pipe(browserSync.stream())
}

function cleanImg () {
  return del('prod/images/**/*'), {force: true};
}

function watch () {
  gulp.watch('dev/**/*.html', html)
  gulp.watch(['dev/sass/**/*.sass', "dev/sass/**/_*.sass"], sass)
  gulp.watch('dev/images/**/*.*', image)
}

function html () {
  return gulp.src('dev/**/*.html')
  .pipe(gulp.dest('prod/'))
  .pipe(browserSync.stream())
}

function sass () {
  return gulp.src(['dev/sass/**/*.sass', 'dev/sass**/_*.sass'])
  .pipe(sourcemaps.init())
  .pipe(plumberNotifier())
  .pipe(sassRun())
  .pipe(autoprefixer({overrideBrowserslist: ['last 10 version'], grid: true}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('prod/css'))
  .pipe(browserSync.stream())
}

export {browsersync, sass, html, fonts, image, cleanImg, watch};
export default gulp.parallel(html, image, fonts, sass, browsersync, watch);