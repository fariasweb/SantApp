/**
 * Equipment controller
 */

app.controllers.equipment = function(equipmentId) {
	console.log("I am going to equipment...");	
	
	var equipment = (equipmentId) ? $('#equipment-detail') : $('#equipment'),
		equipmentContent = equipment.find('[data-role=content]'),
		equipmentHeader = equipment.find('[data-role=header]'),
		strHeader = (equipmentId) ? app.collections.equipaments.get(equipmentId).get("strDescripcio") : app.lang.line("lang_menu_equipment");
		
	$.mobile.changePage(equipment, {changeHash:false});
	
	clearContent();

	// Ver más infraestructuras
	$('#equipment .vermas').click(function(){
		getEquipment();		
	});

	equipmentHeader.find('h1').html(strHeader);

	// Detalles de infraestructura | Listado de infraestructuras
	if(equipmentId){
		getEquipmentById(equipmentId);
	}else{
		// Reset
		app.collections.equipaments.reset_pags("request_all", app.collections.equipaments.length);
		
		// Call
		getEquipment();
	}
	
	// Close panel
	equipment.find('.left-panel').panel('close');
	
	function clearContent(){
		equipment.find('[data-role=content]').html("").append(app.views.btnMore);
	}
	
	function getEquipment(){
		
		$('#equipment .vermas').hide();
		
		app.collections.equipaments.request_all({}, 
    		function(status, data, last){
				if(status.isSuccess()){
					
					var aListData = {"equipments":[]};
					
					_.each(data, function(element) {
	
						aListData.equipments.push({
							"equipmentId": element.intIdFitxa,
							"equipmentName": element.strDescripcio
						});
	    			});
					
					// Generamos template
	    			var aListTemplate = app.views.equipmentList;
					var renderedTemplate = Mustache.render(aListTemplate, aListData);
					
					// Content
					equipmentContent.append(renderedTemplate);
					$('#equipment .vermas').appendTo(equipmentContent);
					
					// Page create
					equipment.trigger('pagecreate');
					
				}
				
				//SI no es la ultima, mostramos botón de mostrar más...
				if (!last){
					$('#equipment .vermas').show();
				}
    			
    		},
    		function(){
    		}
    	);
	}
	
	function getEquipmentById(equipmentId){
		
		app.collections.equipaments.get(equipmentId).request_info({},
			function (status, data){
				if(status.toJSON().intCodiEstat == 0){
					
					var equipmentData = {};
					
					_.each(data, function(val){
						equipmentData = {
							"strDescripcio": "Lorem ipsum ad his scripta blandit partiendo, eum fastidii accumsan euripidis in, eum liber hendrerit an.",
							"strDescripcioCarrer": val.strDescripcioCarrer,
							"strBarri": val.strBarri,
							"strDescripcioPoblacio": val.strDescripcioPoblacio,
							"strDescripcioProvincia": val.strDescripcioProvincia,
							"strCodiPostal": val.strCodiPostal,
							"strNom": strHeader,
							"strUrl": val.strUrl,
							"strNomResponsable": val.strNomResponsable,
							"strTelefonA": val.strTelefonA,
							"strTelefonB": val.strTelefonB,
							"strFax": val.strFax
						};
					});
					
					// Generamos template
					var equipmentTemplate = app.views.equipmentDetail;
					var renderedTemplate = Mustache.render(equipmentTemplate, equipmentData);
					
					equipmentContent.html(renderedTemplate);
					
					// Page create
					equipment.trigger('pagecreate');
					
				}
				// var_dump(data);
			},
			function (jqXHR, textStatus, errorThrown) {
			    echo("FAIL");
		});
		
		
	}
};
