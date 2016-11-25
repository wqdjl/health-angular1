/// <reference path="App/login/login.controller.js" />
{
    'use strict'

    let gulp = require('gulp');
    let webpack = require('webpack');
    let minify = require('gulp-minify');
    let concat = require('gulp-concat');
    var babel = require('gulp-babel');
    let webpackConfig = require('./webpack.config.js');

    let labJs = [
        "App/lib/jquery.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js",
        "node_modules/angular/angular.js",
        "node_modules/angular-ui-router/release/angular-ui-router.js"
    ];
    let pageJs = [
        'App/app.js',
         'App/**/*.js'
    ];
    let wathcJs = [];

    gulp.task('webpack', function () {
        let myconfig = Object.create(webpackConfig);
        webpack(myconfig, function () {
        });
    })

    gulp.task('labJs', function () {
        gulp.src(labJs)
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(concat('all_labs.js'))
        .pipe(minify())
        .pipe(gulp.dest('build'))
    });

    gulp.task('pageJs', function () {
        gulp.src(pageJs)
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('all_pages.js'))
      .pipe(minify())
      .pipe(gulp.dest('build'))
    })

    gulp.task('default', function () {
        gulp.watch(pageJs, function () {
            gulp.run('pageJs');
        });
    })

}