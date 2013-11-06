
$.mobile.ajaxEnabled = false;
$.mobile.linkBindingEnabled = false; 
$.mobile.hashListeningEnabled = false; 
$.mobile.pushStateEnabled = false; 
$.mobile.changePage.defaults.changeHash = false;

/**
 * APP START
 * 
 * Create the principal variables to the app
 * 
 * app.collections.equipaments.reset_pags("request_all", app.collections.equipaments.length);
 * 
 * app.collections.equipaments.request_all_order({}, function, functionm);
 */

var app = {
	router: {},
	controllers: {},
	models: {},
	collections: {},
	views: {},
	service: {},
	user: "",
	timer: {},
	lang: {},
	device: {},
	db: {}
};

// START AFTER LOAD
// TODO: Controlar cuando todo esta cargado para quitar la 

//SOLO FUNCIONA EN MOBIL!!!
$( document ).bind("mobileinit", function() {
	$.mobile.ajaxEnabled = false;
	$.mobile.linkBindingEnabled = false;
	$.mobile.hashListeningEnabled = false;
	$.mobile.pushStateEnabled = false;
	$.mobile.changePage.defaults.changeHash = false;

	$.mobile.loader.prototype.options.text = "Cargando";
  	$.mobile.loader.prototype.options.textVisible = false;
  	$.mobile.loader.prototype.options.theme = "a";
  	$.mobile.loader.prototype.options.html = "";
});

//INICIO DE LA PAGINA PRINCIPAL
$( document ).on("pageinit", "#index", function() {
	
	//NOTE: Conseguir variables
	//console.log(app.constants.get("MAX_NEWS"));
	
	//EVENTOS AL CARGAR
	$( document ).on( "swipeleft swiperight", "#index", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight"  ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
});


$(document).ready(function() {
    
    var router = new app.router();
	Backbone.history.start();

	//INIT DB
	//app.db.init(function(){}, function(){}); //CONTROLAR ERROR
	
	// Control del botón atrás
	$('.back').click(function(e){ e.preventDefault(); router.back(); });
    
    //SET LANG
    app.user = new app.models.user();
    app.user.set({"intIdioma": 1});


	// MENU
	var menuData;
	// Obtnemos subagendas
	app.collections.subagendes.request_all({}, 
		function(status, dataSubagencia){
			
			if(status.getStatus() == 0 && status.getResults() > 0){
				
				menuData = {"diary": []};
				
				// Por cada subagenda...
				var i = 1;
				_.each(dataSubagencia, function(subagenda, key){

					// Obtenemos Color e Icono de la subagenda
					var color = app.collections.subagendes.get(subagenda.intIdNivell).getColorClass(),
						img = app.collections.subagendes.get(subagenda.intIdNivell).getImgClass();
					
					// Obtenemos categorías
					app.collections.subagendes.get(subagenda.intIdNivell).request_all_categories({},
						function(status, data) {
							
							var agenda = {
								"diaryIcon": img,
								"diaryClass": color,
								"diaryName": subagenda.strNivell,
								"diaryId": subagenda.intIdNivell,
								"cats": []
							};
							
							if(status.getStatus() == 0){
								
								// Por cada categoría
								_.each(data, function(categoria){
									agenda.cats.push({
										"catId": categoria.intIdNivell,
										"catName": categoria.strNivell
									});
								});
								
								menuData.diary.push(agenda);
								
								// Cuando hayamos completado la ultima Subagencia, generamos template
								if(i == dataSubagencia.length){
									
									var menuTemplate = app.views.menu;
									var renderedTemplate = Mustache.render(menuTemplate, menuData);
								
									$(".left-panel").html(renderedTemplate);
								
									// Lo actualizamos para la página actual
									$('#home').trigger('pagecreate');

								}
								i++;
							}
						},
						function() {
							
						}
					);
					
					
					
				});
				
			}
			
			
		},
		function (jqXHR, textStatus, errorThrown) {
			
		}
	);

	//Obtenemos los equipamientos
	app.collections.equipaments.request_all_order({},
		function(status, data){
			//alert("TOTAL " + data.length);
		},
		function() {
			//ERROR
		})
	//console.log("LANG", app.user.getLang());
});
