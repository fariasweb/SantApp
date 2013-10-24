/**
 * Idiomes fitxes
 * 
 */

app.collections.idiomes = Backbone.Collection.extend({
	model: app.models.idioma,
	
	request_all: function(param, success, error) {
		app.service.get("idiomesFitxa", {}, function (status, data){
			logger.log(status.code+" "+status.desc+" "+status.total);


			var r = data.getElementsByTagName("Idioma");
			
			for (i = 0; i < r.length; i++) {
				logger.log(i);
				logger.log(r[i].childNodes[1].nodeName + " " + r[i].childNodes[1].childNodes[0].nodeValue);
			}
			
			
			/*$(data).find("Idioma").each(function(){
				logger.log($(this).find("strIdioma").text());
				logger.log(typeof this)
			});*/
		});
	}
});

app.collections.idiomes = new app.collections.idiomes();
