const concat = require('gulp-concat-util');
const cssnano = require('gulp-cssnano');
const foreach = require('gulp-foreach');
const fse = require('fs-extra');
const glob = require('glob');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sequence = require('run-sequence');
const serve = require('serve');

const SRC_DIR = 'src';
const BUILD_DIR = 'build';

gulp.task('clean', () => {
  return fse.emptyDir(BUILD_DIR);
});

gulp.task('css', () => {
  return gulp.src(`${SRC_DIR}/css/**/*`)
    .pipe(cssnano())
    .pipe(gulp.dest(`${BUILD_DIR}/css`));
});

gulp.task('js', () => {
  return gulp.src(`${SRC_DIR}/js/**/*`)
    .pipe(gulp.dest(`${BUILD_DIR}/js`));
});

gulp.task('images', () => {
  return gulp.src(`${SRC_DIR}/images/**/*`)
    .pipe(gulp.dest(`${BUILD_DIR}/images`));
});

gulp.task('fonts', () => {
  return gulp.src(`${SRC_DIR}/fonts/**/*`)
    .pipe(gulp.dest(`${BUILD_DIR}/fonts`));
});


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
  return gulp.src(`${SRC_DIR}/partials/**/*.html`)
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

gulp.task('serve', callback => {
  serve(BUILD_DIR);
});
