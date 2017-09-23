require(["js/config.js"], function() {
	require(["jquery","cookie"], function($,cookie) {
		$(document).ready(function() {
			//头部和尾部的引入
			$(".header").load("html/sub/header1.html");
			$(".footer").load("html/sub/footer1.html");
			
			//表单的验证
			var flag = flag2 = flag3 = false;
			var user = document.getElementById("user");
			var pass = document.getElementById("password");
			var userp = document.getElementsByClassName("user-p")[0];
			var passp = document.getElementsByClassName("pass-p")[0];
			var codep = document.getElementsByClassName("code-p")[0];
			var random = document.getElementsByClassName("random")[0];
			var code = document.getElementById("code");
			var num = document.getElementsByClassName("code1")[0];
			var login = document.getElementById("sub");
			var fm = document.getElementsByTagName("form")[0];
			
			//十天免登录
			user.value=cookie.getCookie("name");
			pass.value=cookie.getCookie("pwd");
			
			random.addEventListener("click", function(e) {
				var e = e || window.event;
				e.preventDefault()
				num.value = parseInt(Math.random() * 8888 + 1111);
				return false;
			})
			 
			
			//验证码
			code.addEventListener("blur", function() {
				if(code.value != num.value) {
					codep.style.display = "block";
					flag3 = false;
				} else {
					codep.style.display = "none";
					flag3 = true;
				}
			})

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

			var save = document.getElementById("check1");
			var save1 = document.getElementById("check2");
			login.addEventListener("click", function(e) {
				e.preventDefault();
				var userval=user.value;
				var passval=pass.value;
				if(flag && flag2 && flag3) {
				    var userval=user.value;
				    var passval=pass.value;
					//判断cookie中是否有用户的数据信息
					var obj={
						"username" : userval,
				     	"password" : passval
					}
//					var res;
					var arr=JSON.parse(cookie.getCookie("user"));
					if(arr==null){
						var res=false;
					}else{
						res=arr.some(function(item){
							return obj.username==item.username&&obj.password==item.password;
						})
					}
					
					if(res){
						if(save.checked&&save1.checked) {
							var d = new Date();
							d.setDate(d.getDate() + 10);
							cookie.setCookie("name", userval, d, "/");
							cookie.setCookie("pwd", passval, d, "/");
						}
//						fm.submit();
						window.location.href = "index.html";
					}else{
						alert("此用户尚未注册");
					}
				}
			})
		})

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
})