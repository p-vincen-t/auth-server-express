const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => tsProject.src()
    .pipe(tsProject()).js.pipe(gulp.dest('dist')));

gulp.task('assets', () => {
   return gulp.src(['src/config/**/*.json'])
    .pipe(gulp.dest('dist/config'));
});

gulp.task('clean', () => del(['dist/']));

gulp.task('default', gulp.series(gulp.parallel("clean", "scripts")));