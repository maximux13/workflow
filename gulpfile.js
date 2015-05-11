var gulp        = require("gulp"),
    jade        = require("gulp-jade"),
    sass        = require("gulp-ruby-sass"),
    sync        = require("browser-sync").create(),
    plumber     = require("gulp-plumber"),
    autoprefix  = require("gulp-autoprefixer");
/**
 * Jade
 */
gulp.task('jade', function(){
    return gulp.src("app/jade/**/*.jade")
        .pipe(plumber())
        .pipe(jade())
        .pipe(gulp.dest("./app"))
        .pipe(sync.reload({stream:true}));
});

/**
 * Sass
 */
gulp.task('sass', function() {
    return sass("./app/sass")
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(autoprefix())
        .pipe(gulp.dest("./app/css"))
        .pipe(sync.reload({stream: true}));
});
/**
 * Serve
 */
gulp.task("serve", ['jade','sass'], function () {
    sync.init({});

   gulp.watch("./app/jade/**/*.jade", ['jade']);
   gulp.watch("./app/sass/**/*.sass", ['sass']);
   gulp.watch("./app/*.html");
});

gulp.task("default", ['serve']);