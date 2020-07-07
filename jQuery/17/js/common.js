$(function() {
	// 导航滚动特效
	$(".scroll").click(function(event){		
		event.preventDefault();
		$('html,body').animate({
			scrollTop:$(this.hash).offset().top
		},1000);
	});
});
$(window).load(function(){
	// 载入效果
	$('.flexslider').flexslider({
		animation: "slide",
		start: function(slider){
			$('body').removeClass('loading');
		}
	});
});