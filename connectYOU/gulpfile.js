//加载gulp
var gulp = require("gulp");
//加载压缩js模块
var uglify = require("gulp-uglify");

//将sass编译模块加载进来
var sass = require("gulp-ruby-sass");

//即时刷新
var connect = require("gulp-connect");

//将es6的代码转化为es5,兼容低版本
var babel = require("gulp-babel");
//代理服务器
var webserver=require("gulp-webserver");

var proxy = require('http-proxy-middleware');



gulp.task("webserver",function(){
	gulp.src('./')
	.pipe(
		webserver(
			{
				host:'localhost',
				port:8000,
				livereload: true,
				directoryListing:{
					enable:true,
					path:'./'
				},
				middleware: [
					proxy("/ajax", {
						target: 'http://localhost:8090',
	        			changeOrigin: true
					}),
					
					
					proxy("/shopdata", {
						target: 'http://datainfo.duapp.com',
	        			changeOrigin: true
					})
					
				]
			}
		)
	)
});


//定义一个默认的任务
gulp.task('default', ["watching", "webserver"], function () {
	console.log('done.');
});




//给gulp定义一个任务，编译scss文件,可用"gulp compliesass"运行命令
gulp.task("compliesass", function() {
	sass("./scss/**/*.scss", {
		style: "expanded" //expanded 指定经过转化的 css的相关格式
	}).pipe(gulp.dest("./scss/"))
});
//定义一个页面刷新的任务
gulp.task("refresh", function() {
//	gulp.src("./html/sub/*.html").pipe(connect.reload());
//	gulp.src("./html/*.html").pipe(connect.reload());
	gulp.src("./*.html").pipe(connect.reload());
});

//定义一个监听任务
gulp.task('watching', function() {
	connect.server({ //每次将cmd启动监听的http地址写入url栏，默认打开该项目下的index.html,也可指定
		livereload: true
	});
	//监听css文件下所有的.css变化，一旦监听成功，就执行“refresh”刷新页面的任务
	gulp.watch("./scss/*.css", ["refresh"]);
	//监听根目录下scss文件中所有的.scss文件，一旦有变化就执行“compliesass”任务
	gulp.watch('./scss/**/*.scss', ['compliesass']);
	//监听js文件下所有的.js文件，一旦文件有变化就执行“complete”任务
	gulp.watch("./js/*.js", ["complete"]);
	//监听minjs下所有通过complete转化为es5和压缩后的.js文件，一旦有变化就执行刷新页面的“refresh”任务
	gulp.watch("./minjs/*.js", ["refresh"]);
});

//定义一个任务,即转化es5   又有压缩过程
gulp.task("complete", function() {
	//任务要执行的代码
	gulp.src("./js/*.js") //从指定目录读取js文件
		.pipe(babel({
			presets: ["es2015"]
		})) //通过pipe输送到 压缩模块
		.pipe(uglify()) //通过pipe输送到 压缩模块
		.pipe(gulp.dest("./minjs/")); //通过pipe输送到 目标位置
});

//定义一个任务，只是将es6转化为es5这一个任务，
gulp.task("bianyi", function() {
	//任务要执行的代码
	gulp.src("./js/jquery/com.js") //从指定目录读取js文件
		.pipe(babel({
			presets: ["es2015"]
		})) //通过pipe输送到 压缩模块
		.pipe(gulp.dest("./js/")); //通过pipe输送到 目标位置
});

//定义一个任务,压缩指定文件，只是压缩文件的这一个功能
gulp.task("minjs", function() {
	//任务要执行的代码
	gulp.src("./js/jquery/jquery-ui.js") //从指定目录读取js文件
		.pipe(uglify()) //通过pipe输送到 压缩模块
		.pipe(gulp.dest("./js/")); //通过pipe输送到 目标位置
});