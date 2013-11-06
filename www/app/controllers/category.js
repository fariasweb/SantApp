/**
 * Category controller
 */

app.controllers.category = function(cat, subcat) {
	console.log("I am going to category...",cat, subcat);
	$.mobile.changePage($('#category'), {changeHash:false});
	
	var categoryName = app.collections.subagendes.get(cat).categories.get(subcat).get("strNivell"),
		diaryColorClass = app.collections.subagendes.get(cat).getColorClass(),
		headerColorClass = app.collections.subagendes.get(cat).getColorHeaderClass();
	
	app.collections.subagendes.get(cat).categories.get(subcat).reset_pags();
	app.collections.subagendes.get(cat).categories.get(subcat).request_all_activitats({},
		function(status, data, last) {
			if(status.toJSON().intCodiEstat == 0){
				
				var aListData = {"headerClass": headerColorClass, "headerName": categoryName, "activities":[]};
				
				_.each(data, function(fitxa) {
					
					aListData.activities.push({
						"activityId": fitxa.intIdFitxa,
						"activityName": fitxa.strDescripcio,
						"description": fitxa.strObservacions,
						"activityClass": diaryColorClass
					});
				});
				
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
				
			}
		},

		function(){
			alert("error");
		}
	);
	
};
