app.router = Backbone.Router.extend({
	routes: {
		"": "home", //DEFAULT
		"home": "home",
		"category/:cat/:subcat": "category",
		"config": "configuration",
		"activity/:id": "activity",
		"diary/:cat": "diary",
		"equipment": "equipment"
	},
	
	initialize: function(){
		$.mobile.changePage($('#home'));

		// Obtenemos datos del menú
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

		// Control del botón atrás
		$('.back').click(function(e){ e.preventDefault(); window.history.back(); });
	},
	home: app.controllers.home,
	category: app.controllers.category,
	configuration: app.controllers.configuration,
	activity: app.controllers.activity,
	diary: app.controllers.diary,
	equipment: app.controllers.equipment
});