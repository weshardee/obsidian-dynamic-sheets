var runSequence = require('run-sequence');
var gulp = require('gulp');
var rm = require('gulp-rimraf');
var assemble = require('gulp-assemble');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

var ASSEMBLE_OPTIONS = {
    layout: 'default.hbs',
    assets: 'assets',
    data: 'src/assemble/data/*.json',
    partials: 'src/assemble/partials/*.hbs',
    layoutdir: 'src/assemble/layouts/'
};

var DEST_DIR = './web';
var ASSETS_DIR = DEST_DIR + '/' + ASSEMBLE_OPTIONS.assets;

gulp.task('clean', function() {
    return gulp.src(DEST_DIR)
        .pipe(rm())
    ;
});

gulp.task('example', function() {
    return gulp.src('./bower_components/dynamic_sheet_templates/devkit/**/*')
        .pipe(gulp.dest(DEST_DIR))
    ;
});

gulp.task('vendor', function() {
    return gulp.src('./bower_components/dynamic_sheet_templates/devkit/javascripts/*.js')
        .pipe(plumber())
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(ASSETS_DIR))
    ;
});

gulp.task('styles', function() {
    return gulp.src('./src/scss/styles.scss')
        .pipe(gulp.dest(ASSETS_DIR))
    ;
});

gulp.task('data', function() {
    return gulp.src('./src/sheets/*.js')
        .pipe(gulp.dest(DEST_DIR + '/data'))
    ;
});

gulp.task('assemble', function() {
    return gulp.src('./src/sheets/**/*.hbs', {base: './src/sheets'})
        .pipe(plumber())
        .pipe(assemble(ASSEMBLE_OPTIONS))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(DEST_DIR))
    ;
});

gulp.task('build', ['assemble', 'vendor', 'data', 'styles']);

gulp.task('default', function() {
    runSequence('clean', 'build');
});
