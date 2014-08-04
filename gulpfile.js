var gulp = require('gulp');
var rimraf = require('gulp-rimraf');

gulp.task('default', function(cb) {
    // place code for your default task here

    rimraf('./web');

    gulp.src('./bower_components/dynamic_sheet_templates/devkit/**/*')
        .pipe(gulp.dest('./web'))
    ;
});
