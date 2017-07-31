var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    cssnano      = require('gulp-cssnano'),
    fs          = require('fs'),
    glob        = require('glob'),
    path        = require('path'),
    plumber     = require('gulp-plumber'),
    rename      = require('gulp-rename'),
    rev         = require('gulp-rev'),
    runSequence = require('run-sequence'),
    stylus      = require('gulp-stylus'),
    svgstore      = require('gulp-svgstore'),
    uglify      = require('gulp-uglify'),
    uncss       = require('gulp-uncss');

var cfg = {
    name: 'dr',
    bowerDir: 'vendor/bower_components/',
    nodeDir: 'node_modules/',
    assetsDir: 'assets/',
    revManifestPath: 'assets/rev-manifest.json',
    webDir: 'web/',
    stylusPattern: 'styl/**/*.styl',
    jsPattern: 'js/**/*.js',
    svgPattern: 'svg/**/*.svg'
};

// styles
gulp.task('styles', function()
{
    return gulp.src(cfg.assetsDir + 'styl/' + cfg.name +'.styl')
        .pipe(plumber())
        .pipe(stylus({
            linenos: false,
            include: ['node_modules'],
            'include css': true
        }))
        //.pipe(uncss({
        //    html: ['**.html']
        //}))
        //.pipe(cssnano())
        .pipe(gulp.dest(cfg.webDir + 'css/'));
});

// js
gulp.task('scripts', function()
{
    return gulp.src([
            cfg.nodeDir + '/jquery/dist/jquery.js',
            cfg.nodeDir + '/headroom.js/dist/jQuery.headroom.js',
            cfg.nodeDir + '/headroom.js/dist/headroom.js',
            cfg.assetsDir + 'js/' + cfg.name +'.js'
        ])
        .pipe(plumber())
        .pipe(concat(cfg.name +'.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(cfg.webDir + 'js/'));
});

// svg
gulp.task('svg', function () {
    return gulp
        .src(cfg.assetsDir + '/' + cfg.svgPattern, {base: cfg.assetsDir + '/svg'})
        .pipe(rename(function (filePath) {
            var name = filePath.dirname !== '.' ? filePath.dirname.split(filePath.sep) : [];
            name.push(filePath.basename);
            filePath.basename = 'symbol-' + name.join('-');
        }))
        .pipe(svgstore({inlineSvg: true}))
        .pipe(gulp.dest(cfg.webDir + '/svg'));
});

// clean
gulp.task('clean', function() {
    var files = glob.sync('web/@(js|css)/' + cfg.name +'-*.*');
    for (var file in files) {
        fs.unlinkSync(files[file]);
    }
});

// assets
gulp.task('assets', function() {
    // Retrieve html5shiv web/ directory
    gulp.src(cfg.nodeDir + '/html5shiv/dist/html5shiv.min.js')
        .pipe(gulp.dest('web/js'));

});

// build
gulp.task('build', function(cb) {
    runSequence(
        ['clean', 'assets'],
        ['styles', 'scripts'],
        cb
    );
});

// watch
gulp.task('watch', function() {
    gulp.watch(cfg.assetsDir +'/'+ cfg.stylusPattern, ['styles']);
    gulp.watch(cfg.assetsDir +'/'+ cfg.jsPattern, ['scripts']);
});

// default
gulp.task('default', ['build', 'watch']);

