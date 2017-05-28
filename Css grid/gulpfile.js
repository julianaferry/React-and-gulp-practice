const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglyfy = require('gulp-uglyfy');
const sass = require('gulp-sass');
const babel = require('babelify');
const browserify = require('browserify');
const source = require ('vinyl-source-stream');
const buffer = require ('vinyl-buffer');
const browserSync = require ('browser-sync');
const reload = bowserSync.reload;
const historyApiFallback = require ('connect-history-api-fallback');
const notify = require ('gulp-notfy');
const plumber = reuire ('gulp-plumber');


gulp.task('js',() => {
         return browerify('src/app.js')
            .transform('babelify', {
                presets: ['es2015', 'react']
            })
            .bundle()    
            .on('error',notify.onError({
                message: "Error: <% error.message %>",
                title: 'Error in JS'    
            }))    
            .pipe (source('app.js'))    
            .pipe (buffer())    
            .pipe (gulp.dest('public/'))
            .pipe (reload({stream:true}));   
 });

gulp.task('default', () =>
	gulp.src('src/app.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('dist'))
);
gulp.task('message',() => {
    return console.log('gulp is running...');
});



gulp.task('mimify',() => {
    gulp.src('src/js/*.js')
     .pipe(gulp.dest('dist/js'));
})

gulp.task('sass',() => {
    gulp.src('src/sass/*.scss')
    .pipe(sas().on('error',sass.logError))
    .pipe(gulp.dest('dist/css'));
})

gulp.task('scripts',() => {
    gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglyfy())
    .pipe(gulp.dest('dist/js'));
})

gulp.task('bs',() => {
     browserSync.init({
         server: {
             baseDir: './'
         },
         middleware: [historyApiFallback()]
     });           
});


gulp.task('default', ['js', 'bs'],() =>{
    gulp.watch('src/**/*.js',['js']);
    gulp.watch('./public/style.css'.reload);
    
}




















