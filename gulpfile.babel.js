import del from 'del';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import sequence from 'run-sequence';

const BUILD_DIR = 'build';

gulp.task('clean', () => {
  return del(BUILD_DIR);
});

gulp.task('images', () => {
  return gulp.src('images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(`${BUILD_DIR}/images`));
});

gulp.task('templates', () => {
  
});

gulp.task('build', callback => {
  sequence('clean', 'images', callback);
});
