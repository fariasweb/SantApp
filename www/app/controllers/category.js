/**
 * Category controller
 */

app.controllers.category = function(cat, subcat) {
	console.log("I am going to category...",cat, subcat);
	
	var category = $('#category'),
		categoryHeader = category.find('[data-role=header]'),
		categoryContent = category.find('[data-role=content]'),
		diaryColorClass = app.collections.subagendes.get(cat).getColorClass(),
		headerColorClass = app.collections.subagendes.get(cat).getColorHeaderClass(),
		categoryName = (subcat == 0) ? "Todas": app.collections.subagendes.get(cat).categories.get(subcat).get("strNivell");
	
	clearContent();
	
	if(subcat == 0) app.collections.subagendes.get(cat).reset_pags();
	else app.collections.subagendes.get(cat).categories.get(subcat).reset_pags();
	
	// Ver más actividades
	$('#category .vermas').click(function(){
		getActivities(cat, subcat);				
	});
	
	// Header, H1
	categoryHeader.attr('class',headerColorClass);
	categoryHeader.find('h1').html(categoryName);
	
	getActivities(cat, subcat);
	
	$.mobile.changePage($('#category'), {changeHash:false});
	
	// Close panel
	category.find('.left-panel').panel('close');
	
	function clearContent(){
		category.find('[data-role=content]').html("").append(app.views.btnMore);
	}
	
	function getActivities(cat, subcat){
		
		$('#category .vermas').hide();
		
		// Ver todas | por categoría
		if(subcat == 0) app.collections.subagendes.get(cat).request_all_activitats({}, success, error);
		else app.collections.subagendes.get(cat).categories.get(subcat).request_all_activitats({}, success, error);
	}
	
	function success(status, data, last){
		if(status.getStatus() == 0 && status.getResults() > 0){
			
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
			
			// Content
			categoryContent.append(renderedTemplate);
			$('#category .vermas').appendTo(categoryContent);
		
			// Page create
			category.trigger('pagecreate');
			
		}
		
		//SI no es la ultima, mostramos botón de mostrar más...
		if (!last){
			$('#category .vermas').show();
		}
	}
		
	function error(){
		
	}
	
};
