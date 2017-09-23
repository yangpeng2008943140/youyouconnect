require(["js/config"], function() {
	require(["jquery", "cookie", "jquery.ui"], function($, cookie) {
		$(document).ready(function() {
			//加上头部和底部
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
					$(".banner-side").show();
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

			//表单的验证
			var flag = flag2 = flag3 = flag4 = false;
			var user = document.getElementById("username");
			var userp = document.getElementsByClassName("user-p")[0];
			var pass = document.getElementById("pass");
			var passp = document.getElementsByClassName("pass-p")[0];

			//用户名验证
			user.addEventListener("blur", function() {
				var userval = user.value;
				var res = (isUser(userval) || isEmail(userval) || isPhone(userval));
				if(!res) {
					userp.style.display = "block";
					flag2 = false;
				} else {
					userp.style.display = "none";
					flag2 = true;
				}
			})

			//密码验证
			pass.addEventListener("blur", function() {
				var passval = pass.value;
				var res = ispass(passval);
				if(!res) {
					passp.style.display = "block";
					flag = false;
				} else {
					passp.style.display = "none";
					flag = true;
				}
			})

			//密码强度的实时监控
			var low = document.getElementById("lower");
			var middle = document.getElementById("middle");
			var upper = document.getElementById("upper");
			pass.addEventListener("input", function() {
				if(pass.value.length <= 5) {
					low.style.background = "red";
					upper.style.background = "";
					middle.style.background = "";
				} else if(pass.value.length > 5 && pass.value.length < 10) {
					middle.style.background = "blue";
					low.style.background = "";
					upper.style.background = "";
				} else {
					upper.style.background = "green";
					middle.style.background = "";
					low.style.background = "";
				}
			});

			//密码与确认密码的验证
			var repass = document.getElementById("repass");
			var repassp = document.getElementsByClassName("repass-p")[0];
			repass.addEventListener("blur", function() {
				if(repass.value != pass.value) {
					repassp.style.display = "block";
					flag3 = false;
				} else {
					repassp.style.display = "none";
					flag3 = true;
				}
			})

			var random = document.getElementsByClassName("random")[0];
			var num = document.getElementById("num");
			var code = document.getElementById("code");
			//产生随机数
			random.addEventListener("click", function(e) {
				var e = e || window.event;
				e.preventDefault()
				num.value = parseInt(Math.random() * 8888 + 1111);
				return false;
			})
			var codep = document.getElementsByClassName("code-p")[0];
			code.addEventListener("blur", function() {
				if(code.value != num.value) {
					codep.style.display = "block";
					flag4 = false;
				} else {
					codep.style.display = "none";
					flag4 = true;
				}
			})

			//确认点击注册
			var subbtn = document.getElementById("sub");
			var check = document.getElementsByClassName("check")[0];
			var fm = document.getElementsByTagName("form")[0];
			subbtn.addEventListener("click", function(e) {
				e.preventDefault();
				//从cookie中验证
//				if(flag && flag2 && flag3 && flag4) {
//					//这时还不能提交表单，没有验证重名
//					//fm.submit();
//					//验证是否有重名的用户
//					var userval = user.value;
//					var passval = pass.value;
//					var arr = [],
//						fk = 0;
//					var obj = {
//						"username": userval,
//						"password": passval
//					}
//					if(cookie.getCookie("user") == "" || cookie.getCookie("user") == null) {
//						arr = [];
//					} else {
//						arr = JSON.parse(cookie.getCookie("user"));
//					}
//					//判断是否重名
//					var resarr = arr.filter(function(item) {
//						if(obj.username == item.username && obj.password == item.password) {
//							alert("此用户已存在，请重新注册");
//							fk = 1;
//							return true;
//						}
//					})
//					if(resarr <= 0) {
//						arr.push(obj);
//					}
//					//只有当cookie中没有此用户，并且选中记住密码才能将其写入cookie中
//					if(check.checked && fk == 0) {
//						//提交表单并且跳转
//						//fm.submit();
//						cookie.setCookie("user", JSON.stringify(arr), 7);
//					}
//				}

				var userval = document.getElementById("username").value;
				var passval = document.getElementById("pass").value;
				//数据接口验证
				var xhr = new XMLHttpRequest();
				xhr.open("GET", "/shopdata/userinfo.php?status=register&userID=" + userval + "&password" + passval, true);
				xhr.send();
				xhr.onload = function() {
					var flag = xhr.response;
					if(flag == 1) {
						alert("注册成功！");
						namecheck(flag,flag2,flag3,flag4);
						window.location.href = "login.html";
					} else if(flag == 2) {
						alert("数据库报错");
					} else {
						alert("用户名重复");
					}
				}
			})
			$("#regiter").click(function() {
				window.location.href = "login.html";
			})
		});

		//cookie中验证 与保存
		function namecheck(flag,flag2,flag3,flag4) {
			var userval = document.getElementById("username").value;
			var passval = document.getElementById("pass").value;
			console.log(document.getElementById("username"));
			console.log(userval);
			if(flag && flag2 && flag3 && flag4) {
//				var userval = user.value;
//				var passval = pass.value;
				var arr = [],
					fk = 0;
				var obj = {
					"username": userval,
					"password": passval
				}
				if(cookie.getCookie("user") == "" || cookie.getCookie("user") == null) {
					arr = [];
				} else {
					arr = JSON.parse(cookie.getCookie("user"));
				}
				var resarr = arr.filter(function(item) {
					if(obj.username == item.username && obj.password == item.password) {
//						alert("此用户已存在，请重新注册");
						fk = 1;
						return true;
					}
				})
				if(resarr.length <= 0) {
					arr.push(obj);
				}
				console.log(arr);
				if(fk == 0) {
					cookie.setCookie("user", JSON.stringify(arr), 7);
				}
			}
		}
		//验证用户名
		function isUser(name) {
			var pattern = /^[a-zA-Z_]\w{5,19}$/;
			return pattern.test(name);
		}

		//验证邮箱
		function isEmail(name) {
			var pattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
			return pattern.test(name);
		}

		// 验证手机号
		function isPhone(phone) {
			var pattern = /^1[34578]\d{9}$/;
			return pattern.test(phone);
		}
		//密码验证
		function ispass(pass) {
			var pattern = /^[a-zA-Z0-9]\w{5,17}$/;
			return pattern.test(pass);
		}

	})
});