var gulp = require("gulp"),
    swaggerGenerator = require('gulp-swagger-generator'),
    rename = require("gulp-rename");

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