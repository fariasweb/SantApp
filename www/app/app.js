$.mobile.ajaxEnabled = false;
$.mobile.linkBindingEnabled = false; 
$.mobile.hashListeningEnabled = false; 
$.mobile.pushStateEnabled = false; 
$.mobile.changePage.defaults.changeHash = false;

/**
 * APP START
 * 
 * Create the principal variables to the app
 */

var app = {
	router: {},
	controllers: {},
	views: {},
	service: {}
};

//CONTROL DE RUTAS
$(function(){
	var router = new app.router();
	Backbone.history.start();
});


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

//PARA TODOS
// $( document ).on("pageinit", function() {
// 	$.mobile.ajaxEnabled = false;
// 	$.mobile.linkBindingEnabled = false;
// 	$.mobile.hashListeningEnabled = false;
// 	$.mobile.pushStateEnabled = false;
// 	$.mobile.changePage.defaults.changeHash = false;
// });

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

	/*$(document).on("pagechange", function(a, b) {
		console.log("PAGECHANGE", a,b);
		return false;
	});
	
	$( window ).on( "navigate", function( event, data ) {
  		console.log("NAVEIGATE", data );
	});*/


$(document).ready(function() {
	//TEST API
	//==================================================================
	app.service.get("idiomesFitxa", {}, 
		function(status, data){
			
			var response = $.parseXML( data );
			
			$("#stage").append("<b>LISTO:" + $(data).find("intTotalResultats").text()+"</b><br><br>");
			$(data).find("Idioma").each(function(){
				$("#stage").append($(this).find("strIdioma").text()+" - "+$(this).find("intIdioma").text());
				$("#stage").append("<hr>");
			});
		},
		
		function(a,b,c){
			$("#stage").append("ERROR");
		}
	);
});
