define(["jquery"],function($){
	
	$.fn.hoverdir = function(options){
		var $self = $(this);
				
		temp.defaults = {
			speed : 500,
			selector : ".cover"
		}
		function temp(param){
			this.init(param);
		}
		temp.prototype.init = function(param){
			//将options合并至defaults，再合并至this
			$.extend(this, param, temp.defaults, options);
			this.calDir();
			return this;
		}
		temp.prototype.calDir = function(){
			var w = this.$el.width(), 
				h = this.$el.height(),
				x = (this.mouse.x-this.$el.offset().left-w/2)*(w>h?h/w:1);
				y = (this.mouse.y-this.$el.offset().top-h/2)*(h>w?w/h:1);
			this.direction = Math.round((Math.atan2(y,x)*180/Math.PI)/90 + 5)%4;
		}
		temp.prototype.move = function(){
			switch(this.direction) {
				case 0 : { //从上至下
					if(this.type == "mouseenter")
						this.$el.find(this.selector).css({left:0, top:"-100%"}).animate({top:0},this.speed);
					else 
						this.$el.find(this.selector).animate({top:"-100%"},this.speed);
					break;
				}
				case 1 : {//从右至左
					if(this.type == "mouseenter")
						this.$el.find(this.selector).css({left:"100%", top:0}).animate({left:0},this.speed);
					else 
						this.$el.find(this.selector).animate({left:"100%"},this.speed);
					break;
				}
				case 2 : {//从下至上
					if(this.type == "mouseenter")
						this.$el.find(this.selector).css({left:0, top:"100%"}).animate({top:0},this.speed);
					else	
						this.$el.find(this.selector).animate({top:"100%"},this.speed);
					break;
				}
				case 3 : {//从左至右
					if(this.type == "mouseenter")
						this.$el.find(this.selector).css({left:"-100%", top:0}).animate({left:0},this.speed);
					else
						this.$el.find(this.selector).animate({left:"-100%"},this.speed);
					break;
				}
			}
		}
		$(this).on("mouseenter mouseleave", function(evt){
			new temp({
				$el:$(this),
				mouse:{x:evt.pageX, y:evt.pageY},
				type:evt.type
			}).move();
		});
		return $(this);
	}
})
