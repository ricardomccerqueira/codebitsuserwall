Codebits.Preloader = {
	preloading:false,
	
	start:function(msg,preloading){
		if(preloading){
			Codebits.Preloader.preloading=true;
			$('body').css('pointer-events','none');	
		}

		$("#preloader").html(msg);
		$("#preloader").fadeIn();
	},
	finish:function(){
		Codebits.Preloader.preloading=false;
		$('body').css('pointer-events','auto');
		$("#preloader").fadeOut();
	}
}