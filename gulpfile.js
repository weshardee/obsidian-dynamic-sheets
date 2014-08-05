var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var assemble = require('gulp-assemble');
var plumber = require('gulp-plumber');

var ASSEMBLE_OPTIONS = {
    layout: 'default.hbs',
    assets: 'vendor',
    data: 'src/assemble/data/*.json',
    partials: 'src/assemble/partials/*.hbs',
    layoutdir: 'src/assemble/layouts/'
};

var DEST_DIR = './web';

gulp.task('clean', function() {
    gulp.src(DEST_DIR).pipe(rimraf());
});

gulp.task('example', function() {
    gulp.src('./bower_components/dynamic_sheet_templates/devkit/**/*')
        .pipe(gulp.dest(DEST_DIR))
    ;
});

gulp.task('assemble', function() {
    gulp.src('./src/sheets/**/*.hbs', {base: './src/sheets'})
        .pipe(plumber())
        .pipe(assemble(ASSEMBLE_OPTIONS))
        .pipe(gulp.dest(DEST_DIR))
    ;
});

gulp.task('default', ['clean', 'assemble']);
