app.router = Backbone.Router.extend({
	routes: {
		"": "home", //DEFAULT
		"home": "home",
		"category/:cat/:subcat": "category",
	},
	
	initialize: function(){
		$.mobile.changePage($('#index'));
	},
	home: app.controllers.home,
	category: app.controllers.category
});