var Codebits = {
	loaderElement:null,
	isApplicationLoaded:false,
	currentLoop:0,
	pagination:0,
	currentPage:'',
	itemsToAppend:[],
	preloading:false,
	lastScrollPops:null,

	init:function(){
		$('#container').isotope({
			animationEngine:'best-available',
			animationOptions:{
				duration:750,
				easing:'linear',
				queue:false
			},
			masonry:{
				columnWidth:10
			}
		});

		
		Codebits.Preloader.start("Starting Application",false);
		Codebits.getToken();
	},

	getToken:function(_callback){
		if(!_callback){
			_callback = Codebits.gotToken;
		}

		//$.getJSON(Codebits.Globals.SERVICES.token,null, _callback);
		$.getJSON('https://services.sapo.pt/Codebits/gettoken?user=r0ckf3l3r@gmail.com&password=ricardomccerqueira&callback=?',null, _callback);
	},

	gotToken:function(data){
		console.log("gotToken",data);
		
		if(data === null){
			console.log("Error occured while retrieving access token");
		}else{
			Codebits.Globals.token = data.token;
			Codebits.getBadges();
		}
	},

	getBadges:function(){
		Codebits.getServiceData(Codebits.Globals.SERVICES.badges,Codebits.gotBadges);
	},

	gotBadges:function(data){
		console.log('gotBadges',data);
		Codebits.Globals.badges = data;
		Codebits.getUsers();
	},

	getUsers:function(){
		//$.getJSON(Codebits.Globals.SERVICES.users + '?token='+Codebits.Globals.token,null, Codebits.gotUsers);
		Codebits.getServiceData(Codebits.Globals.SERVICES.users,Codebits.gotUsers);
	},

	gotUsers:function(data){
		console.log("gotUsers",data);

		if(data.error && data.error.id == '-1'){
			Codebits.getToken(Codebits.gotUsers);
		}else{
			Codebits.Globals.users = data;
			Codebits.applicationLoaded();
		}
	},

	applicationLoaded:function(){
		Codebits.app.run("#/");
	},

	paginationCalculator:function(){
		var pagination = 0;

		var itemsPerWidth = $(window).width() / 250;
		var itemsPerHeight = $(window).height() / 100;

		return Math.ceil(itemsPerWidth * itemsPerHeight);
	},

	getServiceData:function(_service, _callback){
		$.getJSON(_service+'?callback=?&token='+Codebits.Globals.token,null, function(data){
			if(_callback!==undefined){
				_callback(data);
			}
		});
	}
};