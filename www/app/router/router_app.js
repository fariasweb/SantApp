app.router = Backbone.Router.extend({
	routes: {
		"": "home", //DEFAULT
		"home": "home",
		"category/:cat/:subcat": "category",
		"config": "configuration",
		"activity/:id": "activity"
	},
	
	initialize: function(){
		$.mobile.changePage($('#index'));
	},
	home: app.controllers.home,
	category: app.controllers.category,
	configuration: app.controllers.configuration,
	activity: app.controllers.activity
});