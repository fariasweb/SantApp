/**
 * Idiomes fitxes
 * 
 */

app.collections.idiomes = Backbone.Collection.extend({
	model: app.models.idioma,
	
	request_all: function(param, success, error) {
		if (!app.collections.idiomes.length) {
			//No existen datos y voy a la api a por ellos
			app.service.get("idiomesFitxa", "Idioma", {}, 
				function (status, data){
					app.collections.idiomes.add(data, {at: 1});
					echo(typeof success == "function");
					if (typeof success == "function") success(status, data);
				},
				function (jqXHR, textStatus, errorThrown) {
					if (typeof error == "function") error(jqXHR, textStatus, errorThrown);
				});
		} else {
			//Existen datos
			if (typeof success == "function") {
				var status = new new app.models.response({					
					intCodiEstat: 0,
					strDescripcioEstat: "Exist info",
					intTotalResultats: app.collections.idiomes.lenght
				});
				
				var data = app.collections.idiomes.toJSON();
				
				success(status, data);
			}
		}
	}
});

app.collections.idiomes = new app.collections.idiomes();
