/*
**功能：stackshare
**作者：eveningwater
**日期:2017/4/5
*/

$(function(){
	if($(".navbar-toggle").display == "block"){
		$("#desktop").hide();
	}else if($(".navbar-toggle").display == "none"){
		$("#desktop").show();
	}
	var count = 1;
	$(".navbar-toggle").click(function(){
		count++;
		if(count % 2 == 0){
		 $(".navbar-collapse").removeClass(".collapse").addClass(".collapse in");
			$("#mobile").show();
			$("#desktop").hide();
		}
		else{
			$(".navbar-collapse").removeClass(".collapse in").addClass(".collapse");
			$("#mobile").hide();
			$("#desktop").show();
		}
	});
});