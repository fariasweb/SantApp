/*
 * Idioma Class
 * 
 */

app.models.idioma = Backbone.Model.extend({
    
    idAttribute: "intIdioma",
    
	defaults: {
		"intIdioma": 0,
		"strIdioma": "",
	}
});