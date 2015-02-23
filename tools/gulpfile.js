/*!
 * Author : Hans Thinh Le
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 *
 */
'use strict';
// Load plugins
var gulp = require('gulp'),
	header = require('gulp-header'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	connect = require('gulp-connect'),
	livereload = require('gulp-livereload'),
	del = require('del'),
	pkg = require('./package.json');

/**
 * Config
 */
var config = {
	name:   'HansProfile',
	src:    '../src',
	dest:   '../src',
	banner: ['/*!',
		' * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>',
		' * Url: <%= pkg.homepage %>',
		' * Copyright (c) <%= pkg.author.name %> — <%= pkg.author.twitter %> — <%= pkg.author.url %>',
		' * License: <%= pkg.license %>',
		' */',
		''].join('\n')
};

// Styles
gulp.task('styles', function() {
	return sass(config.src + '/styles/main.scss', { style: 'expanded' })
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(gulp.dest(config.src + '/assets/css'))
	.pipe(rename({ suffix: '.min' }))
	.pipe(minifycss())
	.pipe(gulp.dest(config.src + '/assets/css'))
	.pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('lint', function() {
	return gulp.src([config.src + '/scripts/**/*.js', config.src + '/scripts/**/**/*.js', '!' + config.src + '/scripts/{vendors,vendors/**}'])
	.pipe(jshint('../.jshintrc'))
	.pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
	return gulp.src([config.src + '/scripts/**/*.js', config.src + '/scripts/**/**/*.js'])
	.pipe(header(config.banner, { pkg : pkg } ))
	.pipe(concat('production.js'))
	.pipe(gulp.dest(config.src + '/assets/js'))
	.pipe(rename({ suffix: '.min' }))
	.pipe(uglify())
	.pipe(gulp.dest(config.src + '/assets/js'))
	.pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
	return gulp.src(config.src + '/images/**/*')
	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	.pipe(gulp.dest(config.src + '/images'))
	.pipe(notify({ message: 'Images task complete' }));
});

gulp.task('connect', function() {
	connect.server({
		root: config.src,
		livereload: true,
		port: 9000
	});
});

gulp.task('html', function() {
	gulp.src(config.src + '/*.html')
		.pipe(connect.reload());
});

// Clean
gulp.task('clean', function(cb) {
	del([config.src + '/assets/css', config.src + '/assets/js', config.src + '/assets/img'], {force: true}, cb);
});

// Default task
gulp.task('default', ['clean'], function() {
	gulp.start('styles', 'scripts', 'images');
});

// Watch Development
gulp.task('watch', ['connect'], function() {

	// Watch .scss files
	gulp.watch([config.src + '/styles/*.scss', config.src + '/styles/**/*.scss'], ['styles']);

	// Watch .js files
	gulp.watch([config.src + '/scripts/**/*.js', config.src + '/scripts/**/**/*.js', '!' + config.src + '/scripts/{vendors,vendors/**}'], ['lint']);

	// Watch image files
	gulp.watch(config.src + '/images/**/*', ['images']);

	// Watch connect
	gulp.watch([config.src + '/*.html', config.src + '/scripts/**/*.js', config.src + '/scripts/**/**/*.js'], ['html']);

	// Create LiveReload server
	livereload.listen();

	// Watch any files in <%= config.src %>/, reload on change
	gulp.watch([config.src + '/**']).on('change', livereload.changed);

});

gulp.task('production', ['connect'], function() {

	// Watch .scss files
	gulp.watch([config.src + '/styles/*.scss', config.src + '/styles/**/*.scss'], ['styles']);

	// Watch .js files
	gulp.watch([config.src + '/scripts/**/*.js', config.src + '/scripts/**/**/*.js', '!' + config.src + '/scripts/{vendors,vendors/**}', '!' + config.src + '/scripts/main.min.js'], ['scripts']);

	// Watch image files
	gulp.watch(config.src + '/images/**/*', ['images']);

	// Watch connect
	gulp.watch([config.src + '/*.html', config.src + '/scripts/**/*.js', config.src + '/scripts/**/**/*.js'], ['html']);

	// Create LiveReload server
	livereload.listen();

	// Watch any files in <%= config.src %>/, reload on change
	gulp.watch([config.src + '/**']).on('change', livereload.changed);

});