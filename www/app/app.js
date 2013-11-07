
/*$.mobile.ajaxEnabled = false;
$.mobile.linkBindingEnabled = false; 
$.mobile.hashListeningEnabled = false; 
$.mobile.pushStateEnabled = false; 
$.mobile.changePage.defaults.changeHash = false;
*/
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

	//PROCESO DE CARGA
	//app.user = new app.models.user();

	var start = function() {
		//Internet?
		if (true) {

			//Base de datos
			app.db.init(function() {
					//La base de datos se ha creado
					echo("Base de datos creada - ")
					app.user.init(	
						function() {
							//El usuario existe -> Tenemos idioma
							echo("El usuari existe - ");

							//SiGUIETNES PASOS

						},
						function(err) {
							if (!err) {
								echo ("No existe el usuari - ")
								//No existia el usuario -> Vamos al apartod de idioma y paramos

								//DEBUG
								app.user.setLang(1, function(){
									//Reload
									echo ("<br>");
									start();
								})
							} else {
								//Eror
								echo ("Usuario Init error - ");
							}
						}
					);
				},
				function(err) {
					//No se ha podido crear la BD - Error grave
					echo("Base de datos ERROR - ")
				}
			);

		} else {
			//No hay internet!!!
		}
	}

	//start();
	
	//app.db.init(function() {
	//	app.db.clear();
	//}, function() {});

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

									updateLangVars();

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
	
	function updateLangVars(){
		$('[class^="lang"]').on('click',function(){
			alert("class lang founded");
		});
	}
	
    // echo(app.lang.line("AAB"));

    // app.collections.idiomes.request_all({}, function(status, data){ var_dump(data); })

    //TEST: Detalles de fitxa (Horario, Equipacion, Doc, Imagen)
	//==================================================================
	// app.collections.agenda.reset_pags();
	// var test = function() {
	    // app.collections.agenda.request_today({},
	    	// function(status, data, last){
	    		// echo("<hr>");
// 
	    		// //_.each(data, function(element){
	    			// //var_dump(element);
	    			// var id = data[0].intIdFitxa;
	    			// echo(id," ");
// 	    			
	    			// //SCHEDULE
					// /*app.collections.activitats.get(id).request_schedule({},
	    				// function(status, data){
	    					// echo("DONE");
// 
	    					// if (!last) test();
	    				// },
	    				// function(){
	    					// echo("ERROR");
	    				// })
					// */
// 
					// //DOC: request_doc
					// app.collections.activitats.get(id).request_doc({},
	    				// function(status, data){
	    					// echo("DONE");
	    					// var_dump(data);
	    					// if (!last) test();
	    				// },
	    				// function(){
	    					// echo("ERROR");
	    				// });
// 
					// /*app.collections.activitats.get(id).request_doc({},
// 
						// app.collections.activitats.get(id).request_doc({},
	    			// echo("<hr>");*/
	    		// //});
// 
	    		// //SI no es la ultima, continuamos otra vez...
	    		// //if (!last) test();
	    	// },
	    	// function (jqXHR, textStatus, errorThrown) {
// 	    		
	    	// });
	// }
	
    //echo(app.lang.line("AAB"));

    //app.collections.idiomes.request_all({}, function(status, data){ var_dump(data); })

    //TEST: Detalles de fitxa (Horario, Equipacion, Doc, Imagen)
	//==================================================================
	// app.collections.agenda.reset_pags();
// 
	// var test = function() {
	    // app.collections.agenda.request_all({},
	    	// function(status, data, last){
	    		// var_dump(status.toJSON());
	    		// echo("<hr>");
// 
	    		// _.each(data, function(element){
	    			// //var_dump(element);
	    			// var id = element.strDescripcio;
	    			// echo(id, ", ");
// 	    			
	    			// //SCHEDULE
					// /*app.collections.activitats.get(id).request_schedule({},
	    				// function(status, data){
	    					// echo("DONE");
// 
	    					// if (!last) test();
	    				// },
	    				// function(){
	    					// echo("ERROR");
	    				// })
					// */
// 
					// //DOC: request_doc
					// /*app.collections.activitats.get(id).request_doc({},
	    				// function(status, data){
	    					// echo("DONE");
	    					// var_dump(data);
	    					// if (!last) test();
	    				// },
	    				// function(){
	    					// echo("ERROR");
	    				// });
					// */
					// /*app.collections.activitats.get(id).request_doc({},
// 
						// app.collections.activitats.get(id).request_doc({},
	    			// echo("<hr>");*/
	    			// //});
	    		// });
// 	    		
	    		// //SI no es la ultima, continuamos otra vez...
	    		// //if (!last) test();
	    		// //OR
	    		// //if (status.isSuccess() && status.getResults()) test();
	    	// },
	    	// function (jqXHR, textStatus, errorThrown) {
// 	    		
	    	// });
	// }

	//test();
	//app.collections.activitats.add({"intIdFitxa": 8815})
	
    //TEST: Subagendas
	//==================================================================	
	// app.collections.subagendes.request_all({}, 
		// function(status, data){
			// echo ("Subagenda 0");
			// echo("<br>");
			// var_dump(data[0]);
// 
			// //Conseguir actividades de una subagenda:
			// //app.collections.subagendes.get(data[0]['intIdNivell']).request_all
// 			
			// //Conseguir las categorias de una subagenda
			// var subagenda_id = data[0]['intIdNivell'];
// 
			// app.collections.subagendes.get(subagenda_id).request_all_categories({},
				// function(status, data) {
					// echo ("<br>");
					// echo (" > Categorias de la subagenda - "+data[1]['intIdNivell']+" - "+data[1]['strNivell']+" -> ");
// 					
					// var_dump(status.toJSON());
					// echo("<br>");
					// var_dump(data);
// 
					// //Conseguir noticias de una categoria
					// app.collections.subagendes.get(subagenda_id).categories.get(data[1]['intIdNivell']).request_all_activitats({},
						// function(status, data, last) {
// 
							// echo ("Actividades de una categoria");
							// echo ("<br>");
							// var_dump(status.toJSON());
							// var_dump(data);
							// echo ("<br>");
							// _.each(data, function(fitxa) {
								// echo (fitxa['strDescripcio']+", ")
							// })
						// },
// 
						// function(){
							// echo ("FAIL");
						// }
					// );
// 
				// },
				// function() {
					// echo("ERROORRRR");
				// }
			// );
// 
			// echo("FIN");
		// },
		// function (jqXHR, textStatus, errorThrown) {
			// echo("ERRORRRRRRRR");
		// }
	// );
	// app.collections.subagendes.request_all({}, 
		// function(status, data){
			// echo("Subagenda 0");
			// echo("<br>");
			// var_dump(data[0]);
// 
			// //Conseguir actividades de una subagenda:
			// //app.collections.subagendes.get(data[0]['intIdNivell']).request_all
// 			
			// //Conseguir las categorias de una subagenda
			// var subagenda_id = data[0]['intIdNivell'];
// 
			// //Sacar actividades de una subagenda paginadas
			// var testII = function (){
				// app.collections.subagendes.get(subagenda_id).request_all_activitats({},
					// function(status, data, last) {
						// var_dump(status.toJSON());
						// echo ("<hr>");
						// var_dump(data);
// 
						// if (!last) { testII(); }
						// if (status.isSuccess() && status.getResults()) testII();
					// },
					// function() {
						// echo ("ERROROROROR");
					// }
				// );
			// }
// 
			// //testII();
// 			
			// app.collections.subagendes.get(subagenda_id).request_all_categories({},
				// function(status, data) {
					// echo ("<br>");
					// echo (" > Categorias de la subagenda - "+data[1]['intIdNivell']+" - "+data[1]['strNivell']+" -> ");
// 					
					// var_dump(status.toJSON());
					// echo("<br>");
					// //var_dump(data);
// 
					// //Conseguir noticias de una categoria
					// var testIII = function() {
						// app.collections.subagendes.get(subagenda_id).categories.get(data[1]['intIdNivell']).request_all_activitats({},
							// function(status, data, last) {
// 
								// echo ("Actividades de una categoria");
								// echo ("<br>");
								// var_dump(status.toJSON());
								// //var_dump(data);
								// _.each(data, function(fitxa) {
									// //echo (fitxa['strDescripcio']+", ")
								// })
// 
								// if (!last) { testIII(); }
								// //else 
								// //if (status.isSuccess() && status.getResults()) testIII();
							// },
// 
							// function(){
								// echo ("FAIL");
							// }
						// );
					// }
// 
					// testIII();
				// },
				// function() {
					// echo("ERROORRRR");
				// }
			// );
// 
			// echo("FIN");
		// },
		// function (jqXHR, textStatus, errorThrown) {
			// echo("ERRORRRRRRRR");
		// }
	// );

    //TEST: Agenda por fechas request_{today, week, month, all}
	//==================================================================
	/*app.collections.agenda.reset_pags();

	var test = function() {
	    app.collections.agenda.request_today({},
	    	function(status, data, last){
	    		echo("<hr>");
	    		var_dump(status.toJSON());
	    		echo("<hr>");
	    		var_dump(data[0]);

	    		echo("<hr>");
	    		var id = data[0]['intIdFitxa'];

	    		app.collections.activitats.get(id).request_info({},
	    			function(status, data){
	    				var_dump(data);
	    			},
	    			function() {
	    				echo("FAIL");
	    			}
	    			);


	    		//SI no es la ultima, continuamos otra vez...
	    		//if (!last) test();
	    	},
	    	function (jqXHR, textStatus, errorThrown) {
	    		
	    	});
	}*/

	//test();

	//TEST: Equipaciones + info
	//==================================================================

	/*var test_equipament = function() {
		app.collections.equipaments.request_all({}, 
    		function(status, data, last){

    		    //var_dump(status.toJSON());
    			var_dump(data.length);
    			_.each(data, function(element) {
	    			echo(element.strDescripcio+", \n");
	    			echo("<br>");

	    			app.collections.equipaments.get(element.intIdFitxa).request_info({},
	    			    function (status, data){
	    			    	
	    			    	var_dump(data);
	                    },
	                    function (jqXHR, textStatus, errorThrown) {
	                        echo("FAIL");
	                    });
	                
    			});

    			// if(!last) test_equipament();
    		},
    		function(){
    		    echo("FAIL");
    		}
    	);
		
	};*/

	//test_equipament();
	//RECOGO TODAS LAS EQUPACIONES
	app.collections.equipaments.request_all_order({},
		function(status, data){
			//alert("TOTAL " + data.length);
		},
		function() {
			//ERROR
		}
	);
	//console.log("LANG", app.user.getLang());
});
