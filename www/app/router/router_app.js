app.router = Backbone.Router.extend({
	routes: {
		// "": "home", //DEFAULT
		"home": "home",
		"category/:cat/:subcat": "category",
		"config": "configuration",
		"activity/:id": "activity",
		"diary/:cat": "diary",
		"equipment(/:equipmentId)": "equipment",
		"equipment_activity": "equipment_activity"
	},
	
	initialize: function(){
		
		// Guardamos información de las páginas
		history = [];
		this.listenTo(this, 'route', function (name, args) {
		  history.push({
		    name : name,
		    args : args,
		    fragment : Backbone.history.fragment
		  });
		});
		
		// $.mobile.changePage($('#home'));
		
	},
	back: function(){
		// Información de la página anterior
		var backPage = history[history.length-2];
		
		// Guardamos la información de la página a la que nos moveremos en el historial
		history.push({
			name : backPage.name,
		    args : backPage.args,
		    fragment : backPage.fragment
		});
		
		// Cambiamos la vista
		$.mobile.changePage($('#'+backPage.name), {changeHash:false});
		
		// Cambiamos Hash
		this.navigate(backPage.fragment, {trigger: false});
	},
	home: app.controllers.home,
	category: app.controllers.category,
	configuration: app.controllers.configuration,
	activity: app.controllers.activity,
	diary: app.controllers.diary,
	equipment: app.controllers.equipment
});