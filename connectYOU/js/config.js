/*
 * 配置文件
 */

requirejs.config({
//	baseUrl: "http://localhost:8020/connectYOU/js",
	baseUrl: "./js",
	paths: {
		"template" : "widget/template",
		"floorNav" : "widget/floorNav",
		"search" : "widget/search",
		"jquery" : "jquery/jquery-1.11.3",
		"cookie" : "widget/cookie",
		"jquery.ui" : "jquery/jquery-ui",
		"swiper" : "script/swiper",
		"data" : "data",
		"hover" : "jquery/my.hoverdir",
	},
	shim: {
		"hello" : {
			exports: "print,print2"
		}
	}
});


