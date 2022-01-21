const build_number = 'frontend-coder';

const gulp = require('gulp');
const clean = require('gulp-clean');
const minify = require('gulp-minify');
const replace = require('gulp-replace');
const cssnano = require('gulp-cssnano');
const concatCss = require('gulp-concat-css');
const ts = require('gulp-typescript');
const fs = require('fs');


gulp.task('compress', function() {
  return gulp.src(['src/*.js'])
    .pipe(minify())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('transpile-header', function () {
  return gulp.src('src/js/header/**/*.ts')
      .pipe(ts({
          noImplicitAny: true,
          outFile: 'main.js'
      }))
      .pipe(gulp.dest('dist/js/header'));
});

gulp.task('transpile-footer', function () {
    return gulp.src('src/js/footer/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'main.js'
        }))
        .pipe(gulp.dest('dist/js/footer'));
  });

 
gulp.task('clean', function () {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
});

gulp.task('copy-html', function () {
    return  gulp.src('dist/'+build_number+'/**/*')
    .pipe(gulp.dest('dist/html/'+build_number))
});

  gulp.task('generate-body', function() {   
    return gulp.src(['src/template-body.html'])
      .pipe(replace("<!--header-js-->", function(s) {
        var _file = fs.readFileSync('dist/js/header/main.js', 'utf8');
        return '<script>\n' + _file + '\n</script>';
    })).pipe(replace("<!--footer-js-->", function(s) {
        var _file = fs.readFileSync('dist/js/footer/main.js', 'utf8');
        return '<script>\n' + _file + '\n</script>';
    })).pipe(replace("<!--style-->", function(s) {
        var _file = fs.readFileSync('dist/css/everything.css', 'utf8');
        return '<style>\n' + _file + '\n</style>';
    })).pipe(replace("<!--content-->", function(s) {
        var _file = fs.readFileSync('src/content.html', 'utf8');
        return _file;
    }))
    .pipe(replace("<!--imports-->", function(s) {
        var _file = fs.readFileSync('src/imports.html', 'utf8');
        return _file;
    }))
      .pipe(gulp.dest('dist/html/'))
  });

  gulp.task('generate-final', function() {   
    return gulp.src(['src/template.html'])
      .pipe(replace("<!--body-->", function(s) {
        var _file = fs.readFileSync('dist/html/template-body.html', 'utf8');
        return '<body>\n' + _file + '\n</body>';
    })).pipe(gulp.dest('dist/html/'))
  });

  gulp.task('watch', function(){
    gulp.watch('src/**/*.*', gulp.series('build'));
  })

gulp.task('minify', function () {
  return gulp.src('src/css/*.css')
    .pipe(concatCss("everything.css"))
    .pipe(cssnano("everything.css"))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('build-css', gulp.series('minify'))
gulp.task('build', gulp.series('clean', 'build-css', 'transpile-header', 'transpile-footer', 'generate-body', 'generate-final')) 