Codebits.app=$.sammy(function(){
	this.use('Template');

	this.swap = function(content,area) {
		Codebits.currentPage = area;
		if(area === 'home'){
			$('#detailContainer').fadeOut('slow', function(){
				Codebits.loaderElement.html(content);
				$('#container').fadeIn('slow');
				$(window).scrollTop(Codebits.lastScrollPos);
				Codebits.lastScrollPos = 0;
			});
		}else{
			Codebits.lastScrollPos = $(window).scrollTop();

			$('#container').fadeOut('slow');
			$('#detailContainer').fadeOut('slow', function(){
				$(window).scrollTop(0);
				Codebits.loaderElement.html(content);
				$('#detailContainer').fadeIn('slow');
			});	
		}
	};

	this.notFound = function(){
		this.setLocation("#/");
	}
});