/**
 * Diary controller
 */

app.controllers.diary = function(cat) {
	console.log("I am going to diary...",cat);
	
	var diary = $('#diary'),
		diaryContent = diary.find('[data-role=content]'),
		diaryHeader = diary.find('[data-role=header]');
	
	clearContent();
	
	// Ver más actividades
	$('#diary .vermas').click(function(){
		getActivities(cat);				
	});
	
	// Cuando entramos, queremos mostrar solo las primeras noticias
	app.collections.agenda.reset_pags();
	
	// Update Header
	diaryHeader.find('h1').html("Listado de actividades de "+cat);
	
	getActivities(cat);
		
	$.mobile.changePage($('#diary'), {changeHash:false});
	
	// Close panel
	diary.find('.left-panel').panel('close');
	
	function clearContent(){
		diary.find('[data-role=content]').html("").append(app.views.btnMore);
	}
	
	function getActivities(diary){
		
		$('#diary .vermas').hide();
		
		switch(diary){
			case 'today':
				app.collections.agenda.request_today({}, success, fail);	
				break;
			case 'week':
				app.collections.agenda.request_week({}, success, fail);	
				break;
			case 'month':
				app.collections.agenda.request_month({}, success, fail);	
				break;
			case 'all':
				app.collections.agenda.request_all({}, success, fail);	
				break;
			default:
				app.collections.agenda.request_all({}, success, fail);	
				break;			
		}
	}
	
	function success(status, data, last){
		echo("<hr>");
				
		if(status.toJSON().intCodiEstat == 0 && status.toJSON().intTotalResultats > 0){
			
			var aListData = {"activities":[]};
			
			$.each(data, function(key, val){
								
				// TODO: Obtener tipo de actividad de la ficha
				
								
				aListData.activities.push({
					"activityId": val.intIdFitxa,
					"activityName": val.strDescripcio,
					"description": val.strObservacions,
					"activityClass": "acul",
					"activityType": "culturals"
				});
				
			});
			
			// Generamos template
			var aListTemplate = app.views.activityListIcon;
			var renderedTemplate = Mustache.render(aListTemplate, aListData);
			
			// Content
			diaryContent.append(renderedTemplate);
			$('#diary .vermas').appendTo(diaryContent);
		
			// Page create
			diary.trigger('pagecreate');
			
		}
		//SI no es la ultima, mostramos botón de mostrar más...
		if (!last){
			$('#diary .vermas').show();
		}
	}
	
	function fail(jqXHR, textStatus, errorThrown){
		
	}
};
