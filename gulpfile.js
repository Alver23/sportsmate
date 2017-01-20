const elixir = require('laravel-elixir');

require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
*/

elixir(mix => {
    mix.sass('app.scss')
       .webpack('app.js')
})

var gulp = require('gulp')
var standard = require('gulp-standard')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var gulpUtil = require('gulp-util')
var minifyCss = require('gulp-minify-css')
var gulpRename = require('gulp-rename')
var gulpSize = require('gulp-size')
var browserify = require('browserify')
var babelify = require('babelify')
var buffer = require('vinyl-buffer')
var source = require('vinyl-source-stream')
var notify = require('gulp-notify')
var image = require('gulp-image')
var stylus = require('gulp-stylus')
var concatCss = require('gulp-concat-css')
var nib = require('nib')

var config = {
  transform: {
    extensions: [
      [
        babelify,
        {
          presets: ['es2015']
        }
      ]
    ]
  },
  script: {
    main: './resources/assets/js/index.js',
    ignore: './resources/assets/plugins/**/*.js',
    standard: './resources/assets/js/**/*.js',
    standardIgnore: '!./resources/assets/plugins/**/*.js',
    concatFilesLayout: [ './resources/assets/plugins/jQuery/jQuery-2.1.4.min.js',
      './resources/assets/plugins/jQuery/jquery.form.min.js',
      './resources/assets/plugins/jQuery/jquery.validate.min.js', './resources/assets/plugins/bootstrap/bootstrap.js', './resources/assets/plugins/datatables/jquery.dataTables.js',
      './resources/assets/plugins/datatables/dataTables.bootstrap.js', './resources/assets/plugins/jQueryUI/jquery-ui.js', './resources/assets/plugins/select2/select2.js',
      './resources/assets/plugins/slimScroll/jquery.slimscroll.js', './resources/assets/plugins/fastclick/fastclick.js', './resources/assets/AdminTemplate/js/app.js', './resources/assets/AdminTemplate/js/demo.js'
    ],
    concatFilesLogin: ['./resources/assets/plugins/jQuery/jQuery-2.1.4.min.js', './resources/assets/plugins/bootstrap/bootstrap.js', './resources/assets/plugins/iCheck/icheck.js'],
    dest: './public/js',
    fileName: 'bundle.js',
    concatFileName: 'common.js'
  },
  styles: {
    main: './resources/assets/stylus/app.styl',
    watch: './resources/assets/stylus/**/*.styl',
    src: './resources/assets/css/**/*.css',
    concatFilesLogin: ['./resources/assets/css/bootstrap.css', './resources/assets/css/AdminLTE.css', './resources/assets/plugins/iCheck/square/blue.css'],
    dest: 'public/css',
    fileName: 'bundle.css'
  },
  images: {
    main: [
      './resources/assets/img/**/*.png',
      './resources/assets/img/**/*.jpg',
      './resources/assets/img/**/*.gif',
      './resources/assets/img/**/*.jpeg'
    ],
    output: './public/img'
  }
}

gulp.task('standard', function () {
  return gulp.src([
    config.script.standard,
    config.script.standardIgnore
  ])
        .pipe(standard())
        .pipe(standard.reporter('default', {
          breakOnError: true
        }))
})

gulp.task('build:js', function () {
  return browserify({
    entries: config.script.main,
    transform: config.transform.extensions
  })
        .bundle()
        .pipe(source(config.script.fileName))
        .pipe(buffer())
        .pipe(gulpSize())
        .pipe(gulp.dest(config.script.dest))
        .pipe(notify('File: ' + config.script.fileName + ' generator'))
        .pipe(uglify())
        .pipe(gulpRename({
          extname: '.min.js'
        }))
        .pipe(gulpSize())
        .pipe(gulp.dest(config.script.dest))
        .pipe(notify('File: ' + config.script.fileName + '.min.js generator'))
})

gulp.task('concat:js', function () {
  return gulp.src(config.script.concatFilesLayout)
        .pipe(concat(config.script.concatFileName))
        .pipe(gulpSize())
        .pipe(gulp.dest(config.script.dest))
        .pipe(notify('File: ' + config.script.concatFileName + ' generator'))
        .pipe(uglify())
        .pipe(gulpSize())
        .pipe(gulpRename({
          extname: '.min.js'
        }))
        .pipe(gulp.dest(config.script.dest))
        .pipe(notify('File: ' + config.script.concatFileName + '.min.js generator'))
})

gulp.task('concatLogin:js', function () {
  return gulp.src(config.script.concatFilesLogin)
        .pipe(concat('login.js'))
        .pipe(gulpSize())
        .pipe(gulp.dest(config.script.dest))
        .pipe(notify('File: login.js generator'))
        .pipe(uglify())
        .pipe(gulpSize())
        .pipe(gulpRename({
          extname: '.min.js'
        }))
        .pipe(gulp.dest(config.script.dest))
        .pipe(notify('File: login.min.js generator'))
})

gulp.task('build:css', () => {
  gulp.src(config.styles.main)
        .pipe(stylus({
          use: nib()
        }))
        .pipe(concatCss(config.styles.fileName))
        .pipe(gulp.dest(config.styles.dest))
        .pipe(notify('File: ' + config.styles.fileName + ' generator'))
        .pipe(minifyCss())
        .pipe(gulpRename({
          extname: '.min.css'
        }))
        .pipe(gulp.dest(config.styles.dest))
        .pipe(notify('File: ' + config.styles.fileName + '.min.css generator'))
})

gulp.task('concatLogin:css', function () {
  return gulp.src(config.styles.concatFilesLogin)
        .pipe(concat('login.css'))
        .pipe(gulp.dest(config.styles.dest))
        .pipe(notify('File: login.css generator'))
        .pipe(minifyCss())
        .pipe(gulpSize())
        .pipe(gulpRename({
          extname: '.min.css'
        }))
        .pipe(gulp.dest(config.styles.dest))
        .pipe(notify('File: login.min.css generator'))
})

gulp.task('build:img', function () {
  gulp.src(config.images.main)
        .pipe(image({
          pngquant: true,
          optipng: false,
          zopflipng: true,
          jpegRecompress: false,
          jpegoptim: true,
          mozjpeg: false,
          gifsicle: true,
          svgo: true
        }))
        .pipe(gulp.dest(config.images.output))
        .pipe(notify('images optimize'))
})

gulp.task('watch', function () {
  gulp.watch([config.script.src], config.script.main)
})

gulp.task('bundle', ['standard', 'build:js', 'build:css'])
gulp.task('default', ['bundle'])
