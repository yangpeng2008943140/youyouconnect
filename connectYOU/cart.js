require(["js/config"], function() {
	require(["jquery", "data", "template", "cookie","jquery.ui"], function($, data, tem, cookie) {
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
					$(".banner-side").show();
					$(".banner-side").css("left",32);
				})
				$(".classify,.banner-side").mouseleave(function() {
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





			//历史记录模板部分
			var tab = document.getElementById("show-content");
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "/ajax/index.txt", true);
			xhr.send();
			xhr.onload = function() {
				console.log(xhr.response);
				var list = JSON.parse(xhr.response);
				var tab = document.getElementById("show-content");
				var htmlstr = tem.template("temp_historylist", list);
			    tab.innerHTML += htmlstr;
			}

			//获取cookie值
			var arr = JSON.parse(cookie.getCookie("goods"));
			var sum = zongji(arr);
			$(".zongji").html(sum);
			//判断购物车栏的显示
			//console.log(cookie.getCookie("goods"));
			if((cookie.getCookie("goods") == " ") || cookie.getCookie("goods") == null || cookie.getCookie("goods") == "[]") {
				$(".cart-empty").show();
				$(".cart-container,.cart-step").hide();
			} else {
				var arr = JSON.parse(cookie.getCookie("goods"));
				$(".cart-empty").hide();
				$(".cart-container,.cart-step").show();
				var box = document.getElementById("box");
				var str = tem.template("temp_weibolist", arr);
				box.innerHTML += str;
			}

			//对购物车的增删的功能
			var tab = document.getElementById("tab");
			//console.log(cookie.getCookie("goods"));
			tab.onclick = function(e) {
				var e = e || window.event;
				var t = e.target || e.srcElement;
				var list = JSON.parse(cookie.getCookie("goods"));
				if(t.className.split(" ").indexOf("delete-btn") != -1) {
					t.parentNode.parentNode.remove();
					//从cookie中删除
					for(var i = 0; i < list.length; i++) {
						if(list[i].credit == t.parentNode.previousElementSibling.previousElementSibling.children[0].innerHTML) {
							list.splice(i, 1);
						}
					}
					cookie.setCookie("goods", JSON.stringify(list), 10);
					if((cookie.getCookie("goods") == " ") || cookie.getCookie("goods") == null || cookie.getCookie("goods") == "[]") {
						$(".cart-empty").show();
						$(".cart-container,.cart-step").hide();
					}
				}

				if(t.className.split(" ").indexOf("minus") != -1) {
					for(var i = 0; i < list.length; i++) {
						if(list[i].credit == t.parentNode.nextElementSibling.nextElementSibling.children[0].innerHTML) {
							if(list[i].count < 1) {
								alert("商品数量不能为负值");
							} else {
								list[i].count--;
							}
							t.nextElementSibling.value = list[i].count;
							var dprice = t.parentNode.previousElementSibling.children[0].innerHTML;
							var dist = t.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.children[0];
							dist.innerHTML = list[i].count * dprice;
						}
					}
					cookie.setCookie("goods", JSON.stringify(list), 10);
				}
				if(t.className.split(" ").indexOf("add") != -1) {
					for(var i = 0; i < list.length; i++) {
						if(list[i].credit == t.parentNode.nextElementSibling.nextElementSibling.children[0].innerHTML) {
							list[i].count++;
							t.previousElementSibling.value = list[i].count;
							var dprice = t.parentNode.previousElementSibling.children[0].innerHTML;
							var dist = t.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.children[0];
							dist.innerHTML = list[i].count * dprice;
						}
					}
					cookie.setCookie("goods", JSON.stringify(list), 10);
				}
				//总金额的计算
				//				var sum = 0;
				//				for(var i = 0; i < list.length; i++) {
				//					sum += list[i].price * list[i].count;
				//				}
				sum = zongji(list)
				$(".zongji").html(sum);
			}
		});

		function zongji(list) {
			var sum = 0;
			for(var i = 0; i < list.length; i++) {
				sum += list[i].price * list[i].count;
			}
			return sum;
		}

	})
});