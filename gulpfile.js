const gulp = require('gulp')
const babel = require('gulp-babel')   //es6转es5
const jsmin = require("gulp-uglify")  //压缩js
const path = require('path')
const rename = require("gulp-rename")  //重命名
const concat = require("gulp-concat")  //合并文件
const rev = require('gulp-rev-append')
const auto = require('gulp-autoprefixer');     //自动加前缀
const less = require('gulp-less')
const cssmin = require('gulp-clean-css')   //压缩css
const browserSync = require('browser-sync').create()  //热更新
const reload = browserSync.reload
const imgmin = require('gulp-imagemin')
const cache = require('gulp-cache')

const pathBuild = (p) => {
  return path.resolve(__dirname, p)
}
//压缩js
gulp.task("buildjs", () => {
  console.log('================[build js start]===================')
  gulp.src([ pathBuild("src/utils/*.js"),pathBuild("src/modules/*.js")])
    .pipe(concat("build.min.js"))
    .pipe(babel())
    // .pipe(jsmin({
    //   mangle: true,//类型：Boolean 默认：true 是否修改变量名
    //   compress: true//类型：Boolean 默认：true 是否完全压缩
    // }))
    .pipe(gulp.dest(pathBuild("src/build/js")))
    .pipe(reload({stream:true}))
})
//编译less
gulp.task('buildcss',function(){
    console.log('================[buildcss start]===================')
    gulp.src([pathBuild('src/less/*.less'),pathBuild('!src/less/mixin.less')])
        .pipe(less())
        .pipe(auto({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true
            remove:false //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(concat('style.min.css'))
        .pipe(cssmin({
            advanced: true,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('src/build/css'))
        .pipe(reload({stream:true}))
})

gulp.task('buildimage',()=>{
  gulp.src(pathBuild("src/images/*.{png,jpg,gif,jpeg}"))
      .pipe(cache(imgmin({
            optimizationLevel: 2, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
      })))
      .pipe(gulp.dest(pathBuild('build/images')))
})

//开发服务器
gulp.task('server',['buildcss','buildjs'],()=>{
  browserSync.init({
    server:{
      baseDir:"./"
    }
  })
  gulp.watch(pathBuild('src/less/*.less'),['buildcss']);
  gulp.watch(pathBuild('src/modules/*.js'),['buildjs']);
  gulp.watch(pathBuild('src/utils/*.js'),['buildjs']);
  gulp.watch(pathBuild('src/views/*.html')).on('change',reload);
})


// gulp.task('default',["server"])