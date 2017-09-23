require(["../config"],function(){
	require(["jquery","jquery.ui"],function($){
		$(window).load(function(){
//		$(function() {
			$("#birds").autocomplete({
				source: function(request, response) {
					$.ajax({
						url: "http://suggestion.baidu.com?wd="+request.term,
						dataType: "jsonp",
						jsonp:"cb",
						success: function(data) {
							response(data.s);
						}
					});
				},
				select : function( event, ui ){
		      		console.log(ui.item.value)
		      	}
			});
			$(".classify").mouseenter(function(){
				console.log("kkkk");
				$(".banner-side").show();
			})
			$(".classify").mouseleave(function(){
				console.log("kkkk");
				$(".banner-side").hide();
			})
		})
	})
})
	