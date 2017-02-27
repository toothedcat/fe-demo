var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default',function(){

});

gulp.task('concat',function(){
    return gulp.src("./src/**/*.js")
        .pipe(concat({path:'new.js'}))
        .pipe(gulp.dest('./dist'));
});