/**
 * Category controller
 */

app.controllers.category = function(cat, subcat) {
	console.log("I am going to category...",cat, subcat);
	$.mobile.changePage($('#category'), {changeHash:false});
	
	// app.collections.subagendes.get(cat).categories.get(subcat).request_all_activitats({},
		// function(status, data, last) {
// 
			// echo ("Actividades de una categoria");
			// echo ("<br>");
			// var_dump(status.toJSON());
			// //var_dump(data);
			// _.each(data, function(fitxa) {
				// echo (fitxa['strDescripcio']+", ");
			// });
		// },
// 
		// function(){
			// echo ("FAIL");
		// }
	// );
					
	// Obtenemos datos
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

	// Generamos template
	var aListTemplate = app.views.activityList;
	var renderedTemplate = Mustache.render(aListTemplate, aListData);

	// DOM Update
	var category = $('#category'),
		categoryHeader = category.find('[data-role=header]'),
		categoryContent = category.find('[data-role=content]');

	// Header, H1
	categoryHeader.attr('class',aListData.headerClass);
	categoryHeader.find('h1').html(aListData.headerName);
	
	// Content
	categoryContent.html(renderedTemplate);

	// Page create
	category.trigger('pagecreate');

	// Close panel
	category.find('.left-panel').panel('close');
	
};
