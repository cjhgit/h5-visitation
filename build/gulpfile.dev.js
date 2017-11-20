const gulp = require('gulp')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const gulpsync = require('gulp-sync')(gulp)
const $ = require('gulp-load-plugins')()

const SRC_DIR = 'src'
const SRC_VIEWS = SRC_DIR + '/views'
const SRC_JS = SRC_DIR + '/js'
const SRC_SCSS = SRC_DIR + '/scss'
const SRC_I18N = SRC_DIR + '/i18n'
const SRC_JS_FILE = 'src/js/*.js'

const DIST_DIR = 'dist'
const DIST_JS = DIST_DIR + '/static/js'
const DIST_CSS = DIST_DIR + '/static/css'
const DIST_IMG = DIST_DIR + '/static/img'
const DIST_FONT = DIST_DIR + '/static/font'
const DIST_TMP = DIST_DIR + '/tmp'
const DIST_TMP_HTML = DIST_TMP + '/html'

function dev() {
    gulp.task('js-eslint',function(){
        return gulp.src([SRC_JS + '/*.js'])
            .pipe($.eslint({configFle:"./.eslintrc"}))
            .pipe($.eslint.format())
    })

    gulp.task('css-sass', function(){
        return gulp.src(SRC_SCSS + '/**/*.scss')
            .pipe($.sass())
            .pipe(gulp.dest(DIST_CSS))
            .pipe(reload({stream: true}))
    })

    gulp.task('html-include', function () {
        return gulp.src(SRC_VIEWS + '/*.html')
            .pipe($.fileInclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest(DIST_DIR))
            .pipe(reload({stream: true}))
    })

    gulp.task('js-es6', function() {
        return gulp.src(SRC_JS_FILE)
            .pipe($.plumber())
            .pipe($.babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest(DIST_JS))
    })

    gulp.task('img', function () {
        return gulp.src('static/img/*')
            .pipe(gulp.dest(DIST_IMG))
    })

    // TODO static copy
    gulp.task('res-copy', function() {
        return gulp.src('static/res/**/*')
            .pipe($.fileInclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('dist/static/res'))
            .pipe(reload({stream: true}))
    })


    gulp.task('js-copy', function() {
        return gulp.src('static/lib/**/*')
            .pipe($.fileInclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('dist/static/lib'))
            .pipe(reload({stream: true}))
    })

    gulp.task('static-copy', function() {
        return gulp.src('static/**/*')
            .pipe($.fileInclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('dist/static'))
    })

    gulp.task('html-copy', function() {
        return gulp.src(SRC_VIEWS + '/index/*.html')
            .pipe($.fileInclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest(DIST_DIR))
            .pipe(reload({stream: true}))
    })

    gulp.task('dev', gulpsync.sync([
        // 'clean-build',
        ['html-include', 'res-copy', 'js-copy', 'js-eslint', 'css-sass', 'js-es6', 'img', 'static-copy'],
        ['html-copy']
    ]), function () {
        browserSync({
            server: {
                baseDir: DIST_DIR
            },
            port: 1235,
            notify: false,
            scrollProportionally: false
        })

        gulp.watch(SRC_SCSS + '/**/*.scss', ['css-sass'])
        gulp.watch('static/img/*.png', ['img'])
        gulp.watch(SRC_VIEWS + '/**/*.html', ['html-include'])
        gulp.watch(SRC_DIR + '/components/*.html', ['html-include'])
        gulp.watch(SRC_JS + '/*.js', ['js-eslint'])
        gulp.watch([SRC_JS_FILE], ['js-es6'])
    })
}

module.exports = dev
