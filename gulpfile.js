"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sass = require('gulp-sass');
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var postcss = require("gulp-postcss");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var del = require("del");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var run = require("run-sequence");
var mqpacker = require("css-mqpacker");
var compiler = require('webpack');
var webpack = require('webpack-stream');

gulp.task("build", function(fn) {
    run("clean", "copy", "style", "images", fn);
});

gulp.task("clean", function() {
    return del("build");
});

gulp.task("copy", function() {
    return gulp.src([
            "fonts/**/*.{woff,woff2}",
            "img/**",
            "js/**",
            "*.html"
        ], {
            base: "."
        })
        .pipe(gulp.dest("build"));
});

gulp.task('webpack-build', function() {
    return gulp.src('js/entry.js')
        .pipe(webpack({
            output: {
                filename: 'main.js'
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    }
                ]
            },
            optimization: {
                minimize: false
            }
        }, compiler, function(err, stats) {
            /* Use stats to do more things if needed */
        }))
        .on('error', function (err) {
            console.log(err.toString());

            this.emit('end');
        })
        .pipe(gulp.dest('dist/'));
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(plumber())
        .pipe(sass(
            mqpacker({
                sort: true
            })
        ))
        .pipe(gulp.dest("css"))
        .pipe(server.stream())
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest('./css'));
});


gulp.task("style", function() {
    gulp.src("sass/style.sass")
        .pipe(plumber())
        .pipe(sass(
            mqpacker({
                sort: true
            })
        ))
        .pipe(sass([
            autoprefixer({
                browsers: ["last 2 versions"]
            })
        ]))
        .pipe(gulp.dest("css"))
        .pipe(server.stream())
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("css"));
});

gulp.task("images", function() {
    return gulp.src("img/*.{png,jpg,gif}")
        .pipe(imagemin([
            imagemin.optipng({
                optimizationLevel: 3
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("build/img"));
});

gulp.task("serve", function() {
    server.init({
        server: ".",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.task("html:copy", function() {
        return gulp.src("*.html")
            .pipe(gulp.dest("build"));
    });

    gulp.task("html:update", ["html:copy"], function(done) {
        server.reload();
        done();
    });

    gulp.watch('./sass/**/*.sass', ['sass']);
    gulp.watch("sass/**/*.sass", ["sass"]);
    gulp.watch(['js/**/*.js'], ['webpack-build']);
    gulp.watch(['js/*.js'], ['webpack-build']);
    gulp.watch("img/*.svg").on("change", server.reload);
    gulp.watch("*.html", ["html:update"]);
});
