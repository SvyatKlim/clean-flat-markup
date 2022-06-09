import gulp from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import config from '../config';

export const copyImages = () => (
  gulp.src(`${config.src.img}/**/*`)
    .pipe(changed(config.dest.img))
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 90 }),
      imageminPngquant({ quality: [0.8, 0.9] }),
      imagemin.svgo(),
    ]))
    .pipe(gulp.dest(config.dest.img))
);

export const imagesBuild = gulp.series(copyImages);

export const imagesWatch = () => gulp.watch(`${config.src.img}/**/*`, imagesBuild);
