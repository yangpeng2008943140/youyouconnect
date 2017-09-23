require(["js/config"], function() {
	require(["jquery", "swiper", "data","template","cookie","jquery.ui"], function($, Swiper,data,tem,cookie) {
		$(document).ready(function() {
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
			$(".footer").load("html/sub/footer1.html");

			//模板部分
			var tab = document.getElementById("product-list");
			var htmlstr = tem.template("temp_list", data.productlist);
			tab.innerHTML += htmlstr;
			//根据价格排序
			var shuju=data.productlist;
			var sel=$("#sel").get(0);
			sel.onchange=function(){
				var options=$("#sel option:selected").val();
				if(options==2){
					var data=shuju.sort(function(o1,o2){
						return o1.price-o2.price;
					})
					var tab = document.getElementById("product-list");
					var htmlstr = tem.template("temp_list",data);
					tab.innerHTML = htmlstr;
					dianji();
				}else if(options==3){
					var data=shuju.sort(function(o1,o2){
						return o2.price-o1.price;
					})
					var tab = document.getElementById("product-list");
					var htmlstr = tem.template("temp_list",data);
					tab.innerHTML = htmlstr;
					dianji();
				}else if(options==4){
					var data=shuju.sort(function(o1,o2){
						return o2.num-o1.num;
					})
					var tab = document.getElementById("product-list");
					var htmlstr = tem.template("temp_list",data);
					tab.innerHTML = htmlstr;
					dianji();
				}
			}
			
			
			
			//加入购物车部分
			dianji();
//			var btnlist = document.getElementsByClassName('buyNow');
//			var btn = Array.from(btnlist);
//			var arr = [];
//			for(var i=0;i<btn.length;i++){
//				btn[i].onclick = function() {
//					var price = $(this).parent().siblings().find("em").html();
//					var img1 = $(this).parent().siblings().find(".aa-img").attr("src");
//					console.log(img1);
//					var content = $(this).parent().siblings().find(".aa-content").html();
//					var credit = $(this).parent().siblings().find("b").html();
//					
//					//提示信息
//					$(".success-info").show(500);
//					$(".success-info").css({
//						left : $(this).offset().left-20,
//						top :  $(this).offset().top+25
//					});
//					
//					var obj = {
//						"price": $.trim(price),
//						"src": $.trim(img1),
//						"content": $.trim(content),
//						"color" : "银色",
//						"discount" : "$99.0",
//						"credit" : credit
//					};
//					if((cookie.getCookie("goods") == " ") || cookie.getCookie("goods") == null) {
//						arr = [];
//					} else {
//						arr = JSON.parse(cookie.getCookie("goods"));
//					}
//					
//					var resarr=arr.filter(function(item,index){
//						return obj.price==item.price&&obj.img==item.img;
//					});
//					
//					if(resarr.length>0){
//						resarr[0].count++;
//					}else{
//						obj.count=1;
//						arr.push(obj);
//					}
//					cookie.setCookie("goods", JSON.stringify(arr), 7)
//				}
//			}
//			$(".btnhidden").click(function(){
//				$(".success-info").hide(500);
//			})
//			
//			//页面的跳转
//			$("#successbtn").click(function(){
//				window.location.href = "cart.html";
//			})
			
		});
		
		
		function dianji(){
			var btnlist = document.getElementsByClassName('buyNow');
			var btn = Array.from(btnlist);
			var arr = [];
			for(var i=0;i<btn.length;i++){
				btn[i].onclick = function() {
					var price = $(this).parent().siblings().find("em").html();
					var img1 = $(this).parent().siblings().find(".aa-img").attr("src");
					console.log(img1);
					var content = $(this).parent().siblings().find(".aa-content").html();
					var credit = $(this).parent().siblings().find("b").html();
					
					//提示信息
					$(".success-info").fadeIn(500);
					$(".success-info").css({
						left : $(this).offset().left-20,
						top :  $(this).offset().top+25
					});
					
					var obj = {
						"price": $.trim(price),
						"src": $.trim(img1),
						"content": $.trim(content),
						"color" : "银色",
						"discount" : "$99.0",
						"credit" : credit
					};
					if((cookie.getCookie("goods") == " ") || cookie.getCookie("goods") == null) {
						arr = [];
					} else {
						arr = JSON.parse(cookie.getCookie("goods"));
					}
					
					var resarr=arr.filter(function(item,index){
						return obj.price==item.price&&obj.img==item.img;
					});
					
					if(resarr.length>0){
						resarr[0].count++;
					}else{
						obj.count=1;
						arr.push(obj);
					}
					cookie.setCookie("goods", JSON.stringify(arr), 7)
				}
			}
			$(".btnhidden").click(function(){
				$(".success-info").fadeOut(500);
			})
			
			//页面的跳转
			$("#successbtn").click(function(){
				window.location.href = "cart.html";
			})
		}
	})
});