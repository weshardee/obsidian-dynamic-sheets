var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var assemble = require('gulp-assemble');

var ASSEMBLE_OPTIONS = {
    data: 'src/assemble/data/*.json',
    partials: 'src/assemble/partials/*.hbs',
    layoutdir: 'src/assemble/layouts/'
};

gulp.task('clean', function() {
    gulp.src('./web').pipe(rimraf());
});

gulp.task('example', function() {
    gulp.src('./bower_components/dynamic_sheet_templates/devkit/**/*')
        .pipe(gulp.dest('./web'))
    ;
});

gulp.task('assemble', function() {
    gulp.src('src/sheets/*.hbs').pipe(assemble(ASSEMBLE_OPTIONS));
});

gulp.task('default', ['clean', 'assemble']);
