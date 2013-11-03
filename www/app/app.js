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
	models: {},
	collections: {},
	views: {},
	service: {},
	user: "",
	timer: {}
};

//CONTROL DE RUTAS
$(function(){
	var router = new app.router();
	Backbone.history.start();
	
	// Control del botón atrás
	$('.back').click(function(e){ e.preventDefault(); router.back(); });
	
	//USUARIO
	app.user = new app.models.user();
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
    
    //SET LANG
    app.user = new app.models.user();
    app.user.set({"intIdioma": 1});

    //TEST: Agenda por fechas request_{today, week, month, all}
	//==================================================================
	// app.collections.agenda.reset_pags();
	// var test = function() {
	    // app.collections.agenda.request_today({},
	    	// function(status, data, last){
	    		// echo("<hr>");
// 
	    		// //SI no es la ultima, continuamos otra vez...
	    		// if (!last) test();
	    	// },
	    	// function (jqXHR, textStatus, errorThrown) {
// 	    		
	    	// });
	// }
// 
	// test();

	//TEST: Equipaciones + info
	//==================================================================
	/*for(var i = 0; i < 1; i++) {
		app.collections.equipaments.request_all({}, 
    		function(status, data){

    		    //var_dump(status.toJSON());
    			var_dump(data.length);
    			_.each(data, function(element) {
	    			echo(element.intIdFitxa+", \n");

	    			app.collections.equipaments.get(element.intIdFitxa).request_info({},
	    			    function (status, data){
	    			    	
	    			    	var_dump(data);
	                    },
	                    function (jqXHR, textStatus, errorThrown) {
	                        echo("FAIL");
	                    });
    			});
    		},
    		function(){
    		    echo("FAIL");
    			logger.log("FAIL");
    		}
    	);
	}*/

	//TEST: Idiomas
	//==================================================================
	/*app.service.get("idiomesFitxa", {}, 
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
	);*/
});
