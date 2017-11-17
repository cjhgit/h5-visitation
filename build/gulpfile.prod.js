const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const browserSync = require('browser-sync')
const autoprefixer = require('autoprefixer')
const gulpsync = require('gulp-sync')(gulp)
const CacheBuster = require('gulp-cachebust')
const cachebust = new CacheBuster()

const SRC_DIR = 'src'
const SRC_VIEWS = SRC_DIR + '/views'
const SRC_JS = SRC_DIR + '/js'
const SRC_SCSS = SRC_DIR + '/scss'
const SRC_I18N = SRC_DIR + '/i18n'
const SRC_JS_FILE = 'src/js/*.js'

const TARGET_DIR = 'target'
const TARGET_JS = TARGET_DIR + '/static/js'
const TARGET_CSS = TARGET_DIR + '/static/css'
const TARGET_IMG = TARGET_DIR + '/static/img'
const PROD_FONT = TARGET_DIR + '/static/font'
const TARGET_TMP = TARGET_DIR + '/tmp'
const TARGET_TMP_JS = TARGET_TMP + '/js'
const TARGET_TMP_CSS = TARGET_TMP + '/css'
const TARGET_TMP_IMG = TARGET_TMP + '/img'
const TARGET_TMP_HTML = TARGET_TMP + '/html'

function prod() {

    gulp.task('css-sass-build', function(){
        return gulp.src(SRC_SCSS + '/**/*.scss')
            .pipe($.sass())
            .pipe(gulp.dest(TARGET_CSS))
    })

    gulp.task('css-map', () =>
        gulp.src(TARGET_CSS + '/*.css')
            .pipe($.sourcemaps.init())
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(TARGET_CSS))
    )

    gulp.task('css-autoprefixer', () =>
        gulp.src(TARGET_CSS + '/*.css')
            .pipe(autoprefixer({
                browsers: ['last 2 versions']
            }))
            .pipe(gulp.dest(TARGET_CSS))
    )

    gulp.task('css-min', function () {
        return gulp.src(TARGET_CSS + '/*.css')
            .pipe($.minifyCss())
            .pipe(gulp.dest(TARGET_CSS))
    })

    gulp.task('js-es6-build', function() {
        return gulp.src(SRC_JS_FILE)
            .pipe($.plumber())
            .pipe($.babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest(TARGET_JS))
    })

    gulp.task('js-min', function() {
        return gulp.src(TARGET_JS + '/*.js')
            .pipe($.uglify())
            .pipe(gulp.dest(TARGET_JS))
    })

    gulp.task('html-include-build', function () {
        return gulp.src(SRC_VIEWS + '/*.html')
            .pipe($.fileInclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest(TARGET_TMP_HTML))
    })

    gulp.task('html-min', function () {
        return gulp.src(TARGET_TMP_HTML + '/*.html')
            .pipe($.minifyHtml())
            .pipe(gulp.dest(TARGET_DIR))
    })

    gulp.task("clean-build", function(){
        return gulp.src(TARGET_DIR)
            .pipe($.clean())
    })

    gulp.task("clean-build-2", function(){
        return gulp.src(TARGET_TMP)
            .pipe($.clean())
    })

    gulp.task('static-copy', function() {
        return gulp.src('static/**/*')
            .pipe(gulp.dest(TARGET_DIR + '/static'))
    })

    gulp.task('build', gulpsync.sync([
        'clean-build',
        ['css-sass-build', 'html-include-build', 'js-es6-build', 'static-copy'],
        ['js-min', 'css-min', 'html-min']
        // 'clean-build-2'
    ]), function () {
        //调试生产环境
        // browserSync({
        //     server: {
        //         baseDir: TARGET_DIR
        //     },
        //     port: 1235,
        //     notify: false,
        //     scrollProportionally: false
        // })

        console.log('build success !')
    })
}

module.exports = prod
