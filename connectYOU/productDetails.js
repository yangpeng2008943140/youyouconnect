require(["js/config"], function() {
	require(["jquery","swiper","cookie","jquery.ui"], function($,Swiper,cookie) {
		$(document).ready(function () {
			//导入头部和尾部
		    $(".header").load("html/sub/header1.html",function(){
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
					$(".banner-side").show();
				})
				$(".classify,.banner-side").mouseleave(function() {
					$(".banner-side").hide();
				})
				
				//判断用户名
				console.log($(".people").html());
				console.log(cookie.getCookie("name"));
				if(cookie.getCookie("name") == "" || cookie.getCookie("name") == null) {
					var arr = [];
				} else {
					 $(".people").html(cookie.getCookie("name"));
					 $(".people").css("color","red");
				}
		    });
			$(".footer").load("html/sub/footer1.html");




			//轮播图部分
			var bannernav = new Swiper('.nav', {
				pagination: '.swiper-p1',
				paginationClickable: true,
				direction: 'vertical',
				autoplay : 3000,
				loop : true
			});
			
			//放大镜部分
			$(".active").on("mouseenter",function(){
				$(".mirrle,.mirrle-box").show();
			})
			$(".active").on("mouseleave",function(){
				$(".mirrle,.mirrle-box").hide();
			})
			$(".active").on("mousemove",function(e){
				var d=$(window).scrollTop();
				$(".mirrle").css({
					left:Math.min($(".active").width()-200,Math.max(0,e.clientX-$(".active").offset().left-100)),
					top:Math.min($(".active").height()-150, Math.max(0,e.clientY-$(".active").offset().top-75+d))
				})
				$(".mirrle-box img").css({
					left:-parseInt($(".mirrle").css("left"))*3,
					top:-parseInt($(".mirrle").css("top"))*3,
				})
			})
			
			//图片查看器部分
			var $width = $(window).width();
			var $height = $(window).height();
			$("#movelr li").hover(function(){
				$(this).css("border","1px solid red");
				$(this).siblings().css("border","none");
				var src = $(this).find("img").attr("src");
				console.log(src);
				$("#move").attr("src",src);
				$("#mirrle-box").attr("src",src);
			})
			$("#movelr li").on("click", function(e) {
				var scrolltop=$(window).scrollTop();
				document.title=scrolltop;
				e.preventDefault();
				$(this).css("border","1px solid red");
				$(this).siblings().css("border","none");
				var src = $(this).find("img").attr("src");
				$("#cover").css("display", "block");
				$("#cover").animate({
					width: "100%",
					height: "100%",
					top: scrolltop,
					left: 0
				}, 2);
				var $img = $("<img>");
				var $span = $("<span>");
				$span.html("X");
				$("#cover-content").append($span);
				$img.attr("src", src);
				$("#cover-content").append($img);
				$("#cover-content").animate({
									width: $width * 0.3,
									height: $width * 0.3,
								}, 800);
			    $("#cover-content span").on("click", function() {
					$("#cover-content img").remove();
					$("#cover-bg").removeAttr("style")
					$("#cover").removeAttr("style")
					$("#cover-content").removeAttr("style");
					$("#cover-content span").remove();
				})
			});
			
			
			//图片移动
			$("#toleft").click(function(e){
				e.preventDefault();
				 var l=$("#movelr").position().left;
				 if(l > -187){
				 	$("#movelr").css("left",l-10);
				 }
			})
			$("#toright").click(function(e){
				e.preventDefault();
				 var l=$("#movelr").position().left;
				 console.log(l);
				 if(l<23){
				 	$("#movelr").css("left",l+10);
				 }
			})
			
			
			
			//数量的加减
			$("#jia").click(function(){
				var d=parseInt($("#add").val());
				if(d<10){
					$("#add").val(d+1);
				}else{
					alert("数量最多不能超过10");
					return;
				}
			})
			$("#jian").click(function(){
				var d=parseInt($("#add").val());
				if(d<1){
					$("#add").val(0);
					return;
				}else{
					$("#add").val(d-1);
				}
			})
			
			
			//tab转换
			$("#price").on("mouseenter",function(){
				$(".product-ajax,.product-class").hide();
				$(".product-change").show();
			})
			$("#brand").on("mouseenter",function(){
				$(".product-ajax").show();
				$(".product-change,.product-class").hide();
			})
			$("#clas").on("mouseenter",function(){
				$(".product-class").show();
				$(".product-change,.product-ajax").hide();
			})
		});
	})
});