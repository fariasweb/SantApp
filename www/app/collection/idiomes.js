/**
 * Idiomes fitxes
 * 
 */

app.collections.idiomes = Backbone.Collection.extend({
	model: app.models.idioma,
	
	request_all: function(param, success, error) {
		app.service.get("idiomesFitxa", "Idioma", {}, function (status, data){
			logger.log(status.code+" "+status.desc+" "+status.total);

			var_dump(data);
			
			/*$(data).find("Idioma").each(function(){
				logger.log($(this).find("strIdioma").text());
				logger.log(typeof this)
			});*/
		});
	}
});

app.collections.idiomes = new app.collections.idiomes();
