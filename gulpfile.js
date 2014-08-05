var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var assemble = require('gulp-assemble');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

var ASSEMBLE_OPTIONS = {
    layout: 'default.hbs',
    assets: 'vendor',
    data: 'src/assemble/data/*.json',
    partials: 'src/assemble/partials/*.hbs',
    layoutdir: 'src/assemble/layouts/'
};

var DEST_DIR = './web';

var dest = gulp.dest(DEST_DIR);

gulp.task('clean', function() {
    gulp.src(DEST_DIR)
        .pipe(rimraf())
    ;
});

gulp.task('example', function() {
    gulp.src('./bower_components/dynamic_sheet_templates/devkit/**/*')
        .pipe(dest)
    ;
});

gulp.task('vendor', function() {
    gulp.src('./bower_components/dynamic_sheet_templates/devkit/javascripts/*.js')
        .pipe(plumber())
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(dest)
    ;
});

gulp.task('styles', function() {
    gulp.src('./src/scss/styles.scss')
        .pipe(dest)
    ;
});

gulp.task('data', function() {
    gulp.src('./src/sheets/*.js')
        .pipe(dest)
    ;
});

gulp.task('assemble', function() {
    gulp.src('./src/sheets/**/*.hbs', {base: './src/sheets'})
        .pipe(plumber())
        .pipe(assemble(ASSEMBLE_OPTIONS))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(dest)
    ;
});

gulp.task('default', ['clean', 'assemble']);
