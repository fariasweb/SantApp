app.router = Backbone.Router.extend({
	routes: {
		"": "home", //DEFAULT
		"home": "home",
		"category/:cat/:subcat": "category",
		"config": "configuration",
		"activity/:id": "activity",
		"diary/:cat": "diary",
		"equipment(/:equipmentId)": "equipment",
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
		
		$.mobile.changePage($('#home'));

		// Obtenemos datos del menú (HARDCODEADO)
		var menuData = {
			"diary": [
			{
				"diaryIcon": "adminis",
				"diaryClass": "admin",
				"diaryName": "Administrativa",
				"diaryId": "1",
				"cats": [{"catId": "1", "catName": "Categoría 1"},{"catId": "2", "catName": "Categoría 2"}]
			},
			{
				"diaryIcon": "acul",
				"diaryClass": "acul",
				"diaryName": "Cultural",
				"diaryId": "2",
				"cats": [{"catId": "3", "catName": "Categoría 3"},{"catId": "4", "catName": "Categoría 4"}]
			},
			{
				"diaryIcon": "esportives",
				"diaryClass": "esportives",
				"diaryName": "Esportiva",
				"diaryId": "3",
				"cats": [{"catId": "5", "catName": "Categoría 5"},{"catId": "6", "catName": "Categoría 6"}]
			}]
		};
  
		var menuTemplate = app.views.menu;
		var renderedTemplate = Mustache.render(menuTemplate, menuData);

		$(".left-panel").html(renderedTemplate);

		// Lo actualizamos para la página actual
		$('#home').trigger('pagecreate');
		
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