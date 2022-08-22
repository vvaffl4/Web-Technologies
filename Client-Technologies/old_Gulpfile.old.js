const {series, watch, src, dest} = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
var jsImport = require('gulp-js-import');
const browserify = require('browserify');
const gulpBrowser = require('@pushrocks/gulp-browser');
const ts = require("gulp-typescript")
const tsProject = ts.createProject("tsconfig.json");

const browserSync = require('browser-sync').create();


//Variables
const source = './src'

//Util
const css = (done) => {
  console.log('css...');
  done();
}

//Gulpfile.js/index.js
const hello = (done) => {
  console.log(`Hello Happy World!`);
  done();
}


//Watchfiles
const watchfiles = (done) => {
  browserSync.init({server: {baseDir: './dist'}});

  watch([`./src/**/**.**`])
    .on('change', browserSync.reload);
  done();
}
watchfiles.displayName = 'watch';

// Transpile Jsx Typescript to Javascript
const transpileTypescript = (done) => {

  src([ 
    `${source}/**/*.ts`, 
    `${source}/**/*.tsx`
  ])
    // .pipe(tsProject()).js
    .pipe(sourcemaps.init())
    // .pipe(jsImport({hideConsole: true}))
    .pipe(babel({
      presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist'))
  done();
}

// Copy SPA html
const copyHtml = (done) => {
  src([`./index.html`])
    .pipe(dest('./dist'));
  done();
}

//Ts
const tsFiles = () => 
  series(
    transpileTypescript,
    copyHtml,
    watchfiles
  )((done) => {
    console.log(done);
  });

exports.default = hello;
exports.start = tsFiles;
exports.watch = watchfiles;