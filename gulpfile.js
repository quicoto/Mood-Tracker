
const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');

sass.compiler = require('node-sass');

const paths = {
  src: './src/',
  dist: './dist/'
};

paths.api = `${paths.src}api/`;
paths.assets = `${paths.src}assets/`;
paths.styles = `${paths.src}styles/`;
paths.stylesMain = `${paths.styles}main.scss`;
paths.js = `${paths.src}js/`;
paths.jsIndex = `${paths.js}index.js`;
paths.jsServiceWorker = `${paths.js}sw.js`;
paths.distApi = `${paths.dist}api/`;
paths.distAssets = `${paths.dist}assets/`;
paths.distCSS = `${paths.dist}css/`;
paths.distJS = `${paths.dist}js/`;
paths.php = `${paths.src}**/*.php`;

const sassOptions = {
  outputStyle: 'expanded'
};
let webpackMode = 'development';

if (process.env.NODE_ENV === 'production') {
  sassOptions.outputStyle = 'compressed';
  webpackMode = 'production';
}

gulp.task('clean', () => del([
  'dist'
]));

gulp.task('php', () => gulp.src(paths.php)
  .pipe(gulp.dest(paths.dist)));

gulp.task('css', () => gulp.src(paths.stylesMain)
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(gulp.dest(paths.distCSS)));

const JSServiceWorker = function (cb) {
  gulp.src(paths.jsServiceWorker)
    .pipe(gulp.dest(paths.distJS));
  cb();
};

const JSIndex = function (cb) {
  gulp.src(paths.jsIndex)
    .pipe(webpack({
      mode: webpackMode,
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest(paths.distJS));
  cb();
};

gulp.task('js', gulp.parallel(JSIndex, JSServiceWorker));

gulp.task('watch', () => {
  gulp.watch(paths.php, gulp.series('php'));
  gulp.watch(`${paths.styles}**/*.scss`, gulp.series('css'));
  gulp.watch(`${paths.js}**/*.js`, gulp.series('js'));
  gulp.watch(`${paths.api}**/*.php`, gulp.series('api'));
});

gulp.task('assets', () => gulp.src(`${paths.assets}**/*`)
  .pipe(gulp.dest(paths.distAssets)));

gulp.task('api', () => gulp.src(`${paths.api}**/*`)
  .pipe(gulp.dest(paths.distApi)));
