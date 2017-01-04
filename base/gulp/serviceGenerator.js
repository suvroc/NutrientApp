var gulp = require("gulp"),
    swaggerGenerator = require('gulp-swagger-generator'),
    rename = require("gulp-rename"),
    download = require("gulp-download-stream"),
    debug = require('gulp-debug'),
    del = require('del'),
    concat = require('gulp-concat'),
    request = require('request'),
    source = require('vinyl-source-stream');

gulp.task('swagger:delete', function () {
    return del([
        './api-swagger.json'
    ]);
});

gulp.task('swagger:download', ['swagger:delete'], function () {
    return request('http://localhost:51790/swagger/docs/v1') /* 1 */
        .pipe(source('./api-swagger.json'));
});

gulp.task('swagger:generate', function () {
    return gulp.src('./api-swagger.json')
        .pipe(swaggerGenerator({
            clientName: 'ServiceClient',
            templateOptions: {
                module: "Sample",
                scheme: 'http',
            },
            template: "typescript-angular",
            singleFile: true
        }))
        .pipe(rename("serviceClient.ts"))
        .pipe(gulp.dest("./src/app/services/"));
});