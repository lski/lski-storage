const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    del = require('del'),
    jeditor = require('gulp-json-editor'),
    insert = require('gulp-insert'),
    settings = {
        name: "lski-storage",
        version: "0.6.1"
    };

gulp.task('clean', () => {
    
    return del('dist');
});

gulp.task('version', () => {

    return gulp.src("./*.json")
        .pipe(jeditor(settings))
        .pipe(gulp.dest('./'));
});

gulp.task('js', () => {

    return gulp.src('src/*.js')
        .pipe(concat('lski-storage.js'))
        .pipe(uglify())
        .pipe(insert.prepend('/*! ' + settings.name + '-' + settings.version + ' */\n'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean', 'version'], () => {
    
    return gulp.start('js');
});