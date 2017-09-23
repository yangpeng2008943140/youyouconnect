require(["js/config"], function() {
	require(["jquery", "swiper", "data", "template","cookie", "jquery.ui","hover"], function($, Swiper, data1, tem,cookie) {
		$(window).load(function(){
//		$(document).ready(function() {
			//头部的搜索框功能，放在load的回调函数中去执行
			$(".header").load("html/sub/header1.html", function() {
				$("#birds").autocomplete({
					source: function(request, response) {
						$.ajax({
							url: "http://suggestion.baidu.com?wd=" + request.term,
							dataType: "jsonp",
							jsonp: "cb",
							success: function(data) {
								response(data.s);
							}
						});
					},
					select: function(event, ui) {
						console.log(ui.item.value)
					}
				});
				$(".classify,.banner-side").mouseenter(function() {
					console.log("kkkk");
					$(".banner-side").show();
				})
				$(".classify,.banner-side").mouseleave(function() {
					console.log("kkkk");
					$(".banner-side").hide();
				})
				
				//判断用户名
				if(cookie.getCookie("name") == "" || cookie.getCookie("name") == null) {
					var arr = [];
				} else {
					 $(".people").html(cookie.getCookie("name"));
					 $(".people").css("color","red");
				}
			});
			//			$(".header").load("html/sub/header1.html");
			$(".footer").load("html/sub/footer1.html");

			var bannernav = new Swiper('#nav', {
				autoplay: 3000,
				loop: true
			});

			var bannerfloor = new Swiper('#banner', {
				pagination: '.swiper-p2',
				paginationClickable: true,
				autoplay: 3000,
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				loop: true
			});

			var bannerbottom = new Swiper('#bannerbottom', {
				paginationClickable: true,
				autoplay: 3000,
				loop: true
			});

			//模板的引入
			var tab = document.getElementById("show-content");
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "/ajax/shouye.txt", true);
			xhr.send();
			xhr.onload = function() {
				var list = JSON.parse(xhr.response);
				var tab = document.getElementById("box");
				var htmlstr = tem.template("temp_index", list);
				tab.innerHTML += htmlstr;
			}
			//          也可引入data.js中的数据		
			//			var tab = document.getElementById("box");
			//			var htmlstr = tem.template("temp_index", data1.indexshow);
			//			tab.innerHTML += htmlstr;
			//按方向移入
			$(".box").hoverdir();
		});
	})
});