const gulp = require('gulp')
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');
//编译sass
gulp.task('devCss', () => {
        return gulp.src('./src/css/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./src/css'))
    })
    //服务
gulp.task('server', () => {
        return gulp.src('./src')
            .pipe(webserver({
                port: 8989,
                proxies: [{
                        source: '/api/list',
                        target: 'http://localhost:3000/api/list'
                    },
                    {
                        source: '/api/addList',
                        target: 'http://localhost:3000/api/addList'
                    }, {
                        source: '/api/delList',
                        target: 'http://localhost:3000/api/delList'
                    }, {
                        source: '/api/getList',
                        target: 'http://localhost:3000/api/getList'
                    }
                ]
            }))
    })
    //监听
gulp.task('watch', () => {
    gulp.watch('./src/css/*.scss', gulp.series('devCss'));
})
gulp.task('default', gulp.series("devCss", "server", "watch"));