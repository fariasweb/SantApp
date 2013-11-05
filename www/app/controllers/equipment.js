/**
 * Equipment controller
 */

app.controllers.equipment = function(equipmentId) {
	console.log("I am going to equipment...");	
	
	var equipment = (equipmentId) ? $('#equipment-detail') : $('#equipment'),
		equipmentContent = equipment.find('[data-role=content]'),
		equipmentHeader = equipment.find('[data-role=header]'),
		strHeader = "";
	
	clearContent();
	
	
	
	// Detalles de infraestructura | Listado de infraestructuras
	if(equipmentId){
		
		strHeader = "Infraestructura X";
		getEquipmentById(equipmentId);
		
	}else{
		
		strHeader = "Listado de Infraestructuras";
		getEquipment();
		
	}
		
	equipmentHeader.find('h1').html(strHeader);
	
	$.mobile.changePage(equipment, {changeHash:false});
	
	// Close panel
	equipment.find('.left-panel').panel('close');
	
	function clearContent(){
		equipment.find('[data-role=content]').html("");
	}
	
	function getEquipment(){
		
		app.collections.equipaments.request_all_order({}, 
    		function(status, data){


				echo("<hr>");
				if(status.toJSON().intCodiEstat == 0 && status.toJSON().intTotalResultats > 0){
					
					var aListData = {"equipments":[]};
					
					_.each(data, function(element) {
	
						aListData.equipments.push({
							"equipmentId": element.intIdFitxa,
							"equipmentName": element.strDescripcio
						});
	
						// Generamos template
						var aListTemplate = app.views.equipmentList;
						var renderedTemplate = Mustache.render(aListTemplate, aListData);
						
						equipmentContent.html(renderedTemplate);
						
						// Page create
						equipment.trigger('pagecreate');
	
	    			});
				}
    			
    		},
    		function(){
    		    echo("FAIL");
    			logger.log("FAIL");
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
							"strNom": "Mas Fonollar",
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
