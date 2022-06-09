const srcPath = 'src';
const destPath = 'build';
const rootPath = './';

const config = {
  src: {
    root: rootPath,
    sass: `${srcPath}/scss`,
    js: `${srcPath}/js`,
    html: `${srcPath}`,
    fonts: `${srcPath}/assets/fonts`,
    img: `${srcPath}/assets/img`,
  },

  dest: {
    root: rootPath,
    dest: destPath,
    css: `${destPath}/css`,
    js: `${destPath}/js`,
    fonts: `${destPath}/assets/fonts`,
    img: `${destPath}/assets/img`,
  },

  setEnv() {
    this.isProd = process.argv.includes('--prod');
    this.isDev = !this.isProd;
  },
};

export default config;
