/**
 * Category controller
 */

app.controllers.category = function(cat, subcat) {
	console.log("I am going to category...",cat, subcat);
	$.mobile.changePage($('#category'), {changeHash:false});
	// Obtenemos datos del menú
	var aListData = {
		"headerClass": "hacul",
		"headerName": "Categoría X",
		"activities": [{
			"activityId": "1", 
			"activityName": "Nombre de la actividad/Infraestructura (1)",
			"description": "Descripción",
			"activityClass": "acul"
		},
		{
			"activityId": "2", 
			"activityName": "Nombre de la actividad/Infraestructura (2)",
			"description": "Descripción",
			"activityClass": "acul"
		},
		{
			"activityId": "3", 
			"activityName": "Nombre de la actividad/Infraestructura (3)",
			"description": "Descripción",
			"activityClass": "acul"
		}]
	};

	var aListTemplate = app.views.activityList;
	var renderedTemplate = Mustache.render(aListTemplate, aListData);
	$("#category").html(renderedTemplate);
	$('#category').trigger('pagecreate');
	
}
