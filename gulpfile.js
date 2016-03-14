var gulp = require('gulp');

// incude the plugins
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var pxtorem = require('postcss-pxtorem');
var mqpacker = require('css-mqpacker');
var cssnano = require('cssnano');
var eslint = require('gulp-eslint');
var sourceMaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlReplace = require('gulp-html-replace');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

// declare file and folder paths
var baseDir = './public/src';
var jsFolder = baseDir + '/js';
var cssFolder = baseDir + '/styles';

var jsFiles = {
    libs: [jsFolder + '/libs/*.js'],
    vendor: [jsFolder + '/vendors/*.js'],
    views: jsFolder + '/views/*.js',
    main: jsFolder + '/main.js'
};

var sassFiles = cssFolder + '/**/*.scss';

var buildFolder = './public/build';
var distFolder = './public/dist';


// Lint JS files
gulp.task('eslint', function() {
  return gulp.src([jsFiles.views, jsFiles.main])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/*
 * Concatenate jsFiles.vendor and jsFiles.source into one JS file,
 * run eslint before concatenating.
 */
 gulp.task('js', ['eslint'], function() {
  return gulp.src(jsFiles.vendor.concat(jsFiles.main))
    .pipe(sourceMaps.init())
    .pipe(concat('main.js'))
    .pipe(sourceMaps.write('maps'))
    .pipe(gulp.dest(buildFolder + '/js'));
});


// compile sass and use postcss
gulp.task('sass', function() {
    var processors = [
        autoprefixer({browsers: 'safari >= 6, ie >= 9'}),
        pxtorem({replace: false, rootValue: 14})
    ];

    return gulp.src(sassFiles)
        .pipe(sourceMaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourceMaps.write('maps'))
        .pipe(gulp.dest(buildFolder + '/css'))
        .pipe(browserSync.stream(true));
});


// join html partials
gulp.task('joinhtml', function() {
    return gulp.src(baseDir + '/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(buildFolder));
});


// enable browser-sync
gulp.task('browserSync', function() {
    browserSync.init({
        injectChanges: true,
        reloadDelay: 3000,
        port: 8080,
        server: {
            baseDir: buildFolder
        }
    });
});


// gulp copy files to build folder
gulp.task('build:copy', ['build:copyImages', 'build:copyJSLibs', 'build:copyJSViews', 'build:copyFonts']);

gulp.task('build:copyImages', function() {
    return gulp.src(baseDir + '/images/**/*')
        .pipe(gulp.dest(buildFolder + '/images'));
});

gulp.task('build:copyJSLibs', function() {
    return gulp.src(jsFiles.libs)
        .pipe(gulp.dest(buildFolder + '/js/libs'));
});

gulp.task('build:copyJSViews', function() {
    return gulp.src(jsFiles.views)
        .pipe(gulp.dest(buildFolder + '/js/views'));
});

gulp.task('build:copyFonts', function() {
    return gulp.src(baseDir + '/fonts/**/*')
        .pipe(gulp.dest(buildFolder + '/fonts'));
});


// perform all build tasks
gulp.task('build', ['sass', 'js', 'joinhtml', 'build:copy']);


// watch for changes
gulp.task('watch', ['browserSync', 'build'], function() {
    gulp.watch(sassFiles, ['sass']);
    gulp.watch(jsFolder + '/**/*.js', ['js-watch']);
    gulp.watch(baseDir + '/*.html', ['html-watch']);
    gulp.watch(baseDir + '/partials/*.html', ['html-watch']);
});

gulp.task('js-watch', ['js'], browserSync.reload);
gulp.task('html-watch', ['joinhtml'], browserSync.reload);


// optimize images
gulp.task('images', function(){
    return gulp.src(baseDir + '/images/**/*.{png,jpg,gif,svg}')
    .pipe(cache(imagemin({
        svgoPlugins: [{removeViewBox: false}]
    })))
    .pipe(gulp.dest(distFolder + '/images'));
});

// clear the images cache
gulp.task('cache:clear', function (done) {
    return cache.clearAll(done);
});

// copy fonts to dist folder
gulp.task('fonts', function() {
    return gulp.src(baseDir + '/fonts/**/*')
    .pipe(gulp.dest(distFolder + '/fonts'));
});

// clean the dist folder
gulp.task('clean:dist', function() {
    return del.sync(distFolder);
});


// default task
gulp.task('default', ['watch']);
