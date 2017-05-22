const babel = require('gulp-babel');
const concat = require('gulp-concat-util');
const cssnano = require('gulp-cssnano');
const foreach = require('gulp-foreach');
const fse = require('fs-extra');
const glob = require('glob');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sequence = require('run-sequence');
const serve = require('serve');
const uglify = require('gulp-uglify');

const SRC_DIR = 'src';
const BUILD_DIR = 'build';

gulp.task('clean', () => {
  return fse.emptyDir(BUILD_DIR);
});

const CSS_SRC = `${SRC_DIR}/css/**/*`;
gulp.task('css', () => {
  return gulp.src(CSS_SRC)
    .pipe(cssnano())
    .pipe(gulp.dest(`${BUILD_DIR}/css`));
});

const JS_SRC = `${SRC_DIR}/js/**/*`;
gulp.task('js', () => {
  return gulp.src(JS_SRC)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(`${BUILD_DIR}/js`));
});

const IMAGES_SRC = `${SRC_DIR}/images/**/*`;
gulp.task('images', () => {
  return gulp.src(IMAGES_SRC)
    .pipe(gulp.dest(`${BUILD_DIR}/images`));
});

const FONTS_SRC = `${SRC_DIR}/fonts/**/*`;
gulp.task('fonts', () => {
  return gulp.src(FONTS_SRC)
    .pipe(gulp.dest(`${BUILD_DIR}/fonts`));
});

const HTML_SOURCE = `${SRC_DIR}/partials/**/*.html`;
gulp.task('html:concat', async () => {
  const header = await fse.readFile(`${SRC_DIR}/partials/common/header.html`);
  const footer = await fse.readFile(`${SRC_DIR}/partials/common/footer.html`);

  return gulp.src(`${SRC_DIR}/partials/pages/**/*.html`)
    .pipe(foreach((stream, file) => {
      return stream.pipe(concat(file.name))
        .pipe(concat.header(header))
        .pipe(concat.footer(footer))
        .pipe(htmlmin({collapseWhitespace: true}));
    })).pipe(gulp.dest(BUILD_DIR));
});

gulp.task('html:partials', async () => {
  return gulp.src(HTML_SOURCE)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(`${BUILD_DIR}/partials`));
});

gulp.task('build', callback => {
  sequence(
    'clean',
    ['css', 'js', 'images', 'fonts', 'html:concat', 'html:partials'],
    callback
  );
});

gulp.task('watch', ['build'], callback => {
  gulp.watch(CSS_SRC, ['css']);
  gulp.watch(JS_SRC, ['js']);
  gulp.watch(IMAGES_SRC, ['images']);
  gulp.watch(FONTS_SRC, ['fonts']);
  gulp.watch(HTML_SOURCE, ['html:concat', 'html:partials']);
});

gulp.task('serve', callback => {
  serve(BUILD_DIR);
});
