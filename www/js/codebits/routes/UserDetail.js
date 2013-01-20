Codebits.app.get('#/user/:id', function(context){
	Codebits.loaderElement = $('#detailContainer');

	var uid = this.params['id'];

	var userprofile = _.find(Codebits.Globals.usersDetailed, function(context){ 
		return context.id == uid;
	});

	Codebits.Preloader.start('Loading User Profile',true);

	Codebits.getUserFriends=function(item){
		Codebits.getServiceData(Codebits.Globals.SERVICES.friends +  userprofile.id,Codebits.gotUserFriends);
	};

	Codebits.gotUserFriends=function(data){
		console.log("gotUserFriends",data);

		if(data.error && data.error.id == '-1'){
			Codebits.getToken(Codebits.getUserFriends);
		}else{
			var actualFriends = [];
			var filledFriends = [];

			_.each(data, function(friend) { 
				if(friend.state == "accepted"){
					actualFriends.push(friend);
				}
			});

			_.each(actualFriends, function(friend) {
				Codebits.getServiceData(Codebits.Globals.SERVICES.user +  friend.id,function(data){
					filledFriends.push(data);
					
					if(filledFriends.length == actualFriends.length){
						userprofile.friends = filledFriends;
						Codebits.gotUserProfile();
					}
				});
			});	
		}
	};

	Codebits.gotUserProfile=function(){
		context.render('templates/userdetail.template', {userdata:userprofile}).then(function(content) {
			Codebits.app.swap(content,'detail');
			Codebits.Preloader.finish();
		});
	};


	if(!userprofile){
		Codebits.getServiceData(Codebits.Globals.SERVICES.user +  uid,function(data){
			userprofile = data;
			Codebits.getUserFriends();
		});
	}else{
		Codebits.getUserFriends();
	}
});




























		
/*		$.getJSON(Codebits.Globals.SERVICES.user + '?token='+Codebits.Globals.token + '&user='+ user.id,null, function(data){
			context.render('templates/userdetail.template', {userdata:data}).then(function(content) {
				Codebits.app.swap(content,'detail');
				Codebits.Preloader.finish();
			});
		});
*/