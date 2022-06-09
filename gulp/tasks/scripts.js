import gulp from 'gulp';
import webpack from 'webpack-stream';
import uglify from 'gulp-uglify';
import gulpif from 'gulp-if';
import config from '../config';

export const scriptsBuild = () => (
  gulp.src(`${config.src.js}/main.js`)
    .pipe(webpack({
      // watch: true,
      mode: 'development',
      devtool: 'source-map',
      externals: {
        jquery: 'jQuery',
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: [
                ['@babel/preset-env'],
              ],
            },
          },
        ],
      },
      output: {
        filename: '[name].min.js',
      },
    }))
    .pipe(gulpif(config.isProd, uglify()))
    .pipe(gulp.dest(config.dest.js))
);

export const scriptsWatch = () => gulp.watch(`${config.src.js}/**/*.js`, scriptsBuild);
