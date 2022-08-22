const { series, watch, src, dest } = require('gulp');
const autoPrefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const gulpSass = require('gulp-sass');
const uglifyjs = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const browserSync = require('browser-sync').create();

const html = (done) => {
  src([`./src/index.html`])
    .pipe(dest('./dist'));
  done();
}

const sass = (done) => {
 src(['./src/sass/*.sass'])
    .pipe(gulpSass()
      .on('error', gulpSass.logError))
    .pipe(concat('min.all.css'))
    .pipe(autoPrefixer())
    .pipe(uglifycss())
    .pipe(dest('./dist/'));
  done();
}

const css = (done) => {
  src(['./src/css/*.css'])
    .pipe(concat('min.all.css'))
    .pipe(autoPrefixer())
    .pipe(uglifycss())
    .pipe(dest('./dist/'));
  done();
}

const js = (done) => {
  console.log('Test');
  src(['./src/js/*.js']) 
    .pipe(concat('min.all.js'))
    .pipe(uglifyjs())
    .pipe(dest('./dist/'));
  done();
}

var vendors = ['jquery/dist/jquery.min.js'];

const vendor = (done) => {
    src(vendors.map(vendor => `node_modules/${vendor}`))
      .pipe(concat('min.vendor.js'))
      .pipe(uglifyjs())
      .pipe(dest('./dist/'));
    done();
  };

const watchFiles = () => {
  browserSync.init({server: {baseDir: './dist/'}});

  watch(['./src/index.html'], series(html))
    .on('change', browserSync.reload)
  watch(['./src/css/*.css'], series(css))
    .on('add', browserSync.reload)
    .on('change', browserSync.reload);
  watch(['./src/sass/*.sass'], series(sass))
    .on('add', browserSync.reload)
    .on('change', browserSync.reload);
  watch(['./src/js/*.js'], series(js))
    .on('add', browserSync.reload)
    .on('change', browserSync.reload);
}
watchFiles.displayName = 'watch';

const config = {
  name: 'World'
};

// Taak
const hello = function (done) {
  console.log(`Greetings from ${config.name}!`)
  done();
}

const def = series(html, css, vendor, js);

exports.default = def;
exports.watch = series(def, watchFiles);
exports.html = html;
exports.sass = sass;
exports.css = css;
exports.vendor = vendor;
exports.js = js;
exports.hello = hello;