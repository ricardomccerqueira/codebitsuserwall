Codebits.app.get('#/', function(context){
	Codebits.loaderElement = $('#detailContainer');
	context.app.swap('','home');

	Codebits.getUserProfile=function(){
		if(Codebits.Preloader.preloading==false){
			Codebits.Preloader.start('Loading Users',true);

			var loopAmmount = Codebits.paginationCalculator();
			var pagination = Codebits.pagination;
				Codebits.currentLoop = loopAmmount + pagination;
				Codebits.appendItems = null;
				
			if(Codebits.pagination >= Codebits.Globals.users.length){
				Codebits.Preloader.start('No more users to load');
				setTimeout(Codebits.Preloader.finish,5000);
			}

			for(var i = pagination; i<pagination + loopAmmount; i++){
				if(Codebits.Globals.users[i]){
					//$.get(Codebits.Globals.SERVICES.user + '?token='+Codebits.Globals.token + '&user='+ Codebits.Globals.users[i].id,null, Codebits.gotUserProfile);

					Codebits.getServiceData(Codebits.Globals.SERVICES.user + Codebits.Globals.users[i].id,Codebits.gotUserProfile);
				}
			}
		}
	};

	Codebits.gotUserProfile=function(data){
		//console.log("gotUserProfile",data);

		if(data.error && data.error.id == '-1'){
			Codebits.getToken(Codebits.getUserProfile);
		}else{
			Codebits.itemsToAppend.push(data);
			Codebits.pagination ++;

			Codebits.Globals.usersDetailed.push(data);

			if(Codebits.pagination == Codebits.currentLoop){
				Codebits.deployItemsOnStage();
			}
		}
	};

	Codebits.deployItemsOnStage=function(){
		context.render('templates/homeitem.template', {userdata:Codebits.itemsToAppend}).then(function(content) {
			Codebits.itemsToAppend.splice(0,Codebits.itemsToAppend.length);
			Codebits.Preloader.finish();

			$('#container').isotope( 'insert', $(content) );

			setTimeout(function(){
				$('#container').isotope( 'reLayout');
			},1000);
		});		
	}

	if(Codebits.isApplicationLoaded == false){
		Codebits.isApplicationLoaded = true;
		Codebits.getUserProfile();
	
		$(window).scroll(function() {
			if($(window).scrollTop() + $(window).height() == $(document).height() && Codebits.currentPage =="home"){
				Codebits.getUserProfile();
			}
		});
	}
});