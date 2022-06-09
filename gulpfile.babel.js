import gulp from 'gulp';
import config from './gulp/config';
import clean from './gulp/tasks/clean';
import server from './gulp/tasks/server';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts';
import { sassBuild, sassWatch } from './gulp/tasks/styles';
import { htmlBuild, htmlWatch } from './gulp/tasks/html';

import { assetsBuild, assetsWatch } from './gulp/tasks/assets';
import { copyImages, imagesWatch } from './gulp/tasks/images';

config.setEnv();

export const build = gulp.series(
  clean,
  gulp.parallel(
    scriptsBuild,
    sassBuild,
    htmlBuild,
    assetsBuild,
    copyImages
  ),
);

export const watch = gulp.series(
  build,
  server,
  gulp.parallel(
    scriptsWatch,
    sassWatch,
    htmlWatch,
    assetsWatch,
    imagesWatch
  ),
);
