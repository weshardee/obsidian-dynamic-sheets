var runSequence = require('run-sequence');
var gulp = require('gulp');
var rm = require('gulp-rimraf');
var assemble = require('gulp-assemble');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

// file sources
var SRC = {};
SRC.VENDOR = './bower_components/dynamic_sheet_templates/devkit/javascripts/*.js';
SRC.SCSS = './src/scss/*.scss';
SRC.JS = './src/js/*.js';
SRC.SHEETS = './src/sheets/**/*.hbs';
SRC.SASS = './src/scss/styles.scss';

// endpoints
var DEST = {};
DEST.ROOT = './web';
DEST.ASSETS = DEST.ROOT + '/assets';
DEST.DATA = DEST.ROOT + '/data';

// build options
var OPTIONS = {};
OPTIONS.ASSEMBLE = {
    layout: 'default.hbs',
    assets: 'assets',
    data: 'src/assemble/data/*.json',
    partials: 'src/assemble/partials/*.hbs',
    layoutdir: 'src/assemble/layouts/'
};

// tasks
gulp.task('clean', function(cb) {
    return gulp.src(DEST.ROOT).pipe(plumber()).pipe(rm());
});

gulp.task('scripts', function() {
    return gulp.src(SRC.JS).pipe(plumber()).pipe(gulp.dest(DEST.ASSETS));
});

gulp.task('statics', function() {
    return gulp.src(SRC.SHEETS)
        .pipe(plumber())
        .pipe(assemble(OPTIONS.ASSEMBLE))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(DEST.ROOT))
    ;
});

gulp.task('vendor', function() {
    return gulp.src(SRC.VENDOR)
        .pipe(plumber())
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(DEST.ASSETS))
    ;
});

gulp.task('sass', function() {
    return gulp.src(SRC.SASS)
        .pipe(plumber())
        // .pipe(sass())
        .pipe(gulp.dest(DEST.ASSETS))
    ;
});

gulp.task('data', function() {
    return gulp.src('./src/sheets/*.js')
        .pipe(plumber())
        .pipe(gulp.dest(DEST.DATA))
    ;
});

// group tasks
gulp.task('build', [
    'scripts',
    'vendor',
    'sass',
    'statics',
    'data'
]);

gulp.task('default', function() {
    runSequence('clean', 'build');
});
