const build_number = 'osteopatia-theme';

const gulp = require('gulp');
const zip = require('gulp-zip');
const clean = require('gulp-clean');
const minify = require('gulp-minify');
const replace = require('gulp-replace');
const rename = require("gulp-rename");
const exec = require('child_process').exec;
const cssnano = require('gulp-cssnano');
const concatCss = require('gulp-concat-css');
const ts = require('gulp-typescript');
const fs = require('fs');


const timestamp = new Date().getTime();

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

gulp.task('zip', function () {
    return  gulp.src('src/**')
        .pipe(zip(build_number+'.zip'))
        .pipe(gulp.dest('dist'))
});

gulp.task('copy', function () {
    return  gulp.src('src/**').pipe(gulp.dest('dist/'+build_number))
});

gulp.task('copy-fonts', function () {
  return  gulp.src('src/fonts/**').pipe(gulp.dest('dist/'+build_number+'/fonts'))
});

gulp.task('copy-images', function () {
  return  gulp.src('src/images/**').pipe(gulp.dest('dist/'+build_number+'/images'))
});

gulp.task('copy-includes', function () {
  return  gulp.src('src/includes/**').pipe(gulp.dest('dist/'+build_number+'/includes'))
});

gulp.task('copy-js', function () {
  return  gulp.src('src/js/*.js').pipe(gulp.dest('dist/'+build_number+'/js'))
});

gulp.task('copy-php-core', function () {
  return  gulp.src(['src/*.php', 'src/screenshot.png', 'src/style.css']).pipe(gulp.dest('dist/'+build_number))
});

gulp.task('copy-fontawesome', function () {
  return  gulp.src(['node_modules/@fortawesome/fontawesome-free/css/**/*.min.css', 'node_modules/@fortawesome/fontawesome-free/js/**/*.min.js', 'node_modules/@fortawesome/fontawesome-free/webfonts/**/*'], {base: 'node_modules/@fortawesome/fontawesome-free'}).pipe(gulp.dest('dist/'+build_number+'/plugins/font-awesome/'))
});

gulp.task('copy-slick', function () {
  return  gulp.src('src/plugins/slick/*').pipe(gulp.dest('dist/'+build_number+'/plugins/slick'))
});

gulp.task('copy-html', function () {
    return  gulp.src('dist/'+build_number+'/**/*')
    .pipe(gulp.dest('dist/html/'+build_number))
});

  gulp.task('replace-body', function() {   
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

  gulp.task('replace', function() {   
    return gulp.src(['src/template.html'])
      .pipe(replace("<!--body-->", function(s) {
        var _file = fs.readFileSync('dist/html/template-body.html', 'utf8');
        return '<body>\n' + _file + '\n</body>';
    })).pipe(gulp.dest('dist/html/'))
  });

  gulp.task('timestamp', function() {   
    return gulp.src(['src/header.php'])
      .pipe(replace('everything.css', `everything.css?${timestamp}`))
      .pipe(gulp.dest('dist/'+build_number+'/'))
  });

  gulp.task('rename',function(){
      return gulp.src("dist/html/"+build_number+"/*.php")
      .pipe(rename(function(path){
        path.extname = ".html";
      }))
      .pipe(gulp.dest("dist/html/"+build_number));
  });

  gulp.task('watch', function(){
    gulp.watch('src/**/*.*', gulp.series('build'));
  })

  gulp.task('upload', function (cb) {
    exec('sh deploy.sh', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  })

gulp.task('minify', function () {
  return gulp.src('src/css/*.css')
    .pipe(concatCss("everything.css"))
    .pipe(cssnano("everything.css"))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('build-css', gulp.series('minify'))
gulp.task('build', gulp.series('clean', 'build-css', 'transpile-header', 'transpile-footer', 'copy-html', 'replace-body', 'replace')) 