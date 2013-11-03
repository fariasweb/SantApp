/**
 * Diary controller
 */

app.controllers.diary = function(cat) {
	console.log("I am going to diary...",cat);
	
	clearDiv();
	// Ver más actividades
	$('.vermas').click(function(){
		getActivities();				
	});
	
	// Cuando entramos, queremos mostrar solo las primeras noticias
	app.collections.agenda.reset_pags();
	
	// Update Header
	var diary = $('#diary'),
		diaryContent = diary.find('[data-role=content]'),
		diaryHeader = diary.find('[data-role=header]');
		
	diaryHeader.find('h1').html("Listado de actividades de "+cat);
	
	getActivities();
		
	$.mobile.changePage($('#diary'), {changeHash:false});
	
	// Close panel
	diary.find('.left-panel').panel('close');
	
	function clearDiv(){
		$('#diary').find('[data-role=content]').html("").append(app.views.btnMore);
	}
	
	function getActivities(){
		
		$('.vermas').hide();
		
		app.collections.agenda.request_all({},
	    	function(status, data, last){
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
	    			$('.vermas').show();
	    		}	
	    	},
	    	function (jqXHR, textStatus, errorThrown) {
	    		
	    });
	}
}
