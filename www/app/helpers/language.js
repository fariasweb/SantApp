/*
 * Language Library
 * Author: Francisco Javier Arias
 */

app.lang = Backbone.Model.extend({

	defaults: { 
		"vars": {
			"lang_category_all": ["Totes", "Todas"], 
			"lang_menu_search": ["Cerca", "Búsqueda"],
			"lang_menu_main_diary": ["Agenda principal", "Agenda principal"],
			"lang_menu_equipment": ["Llistat de infraestructures", "Listado de infraestructuras"],
		}
	},

	setVar: function(name, value){
		this.get("vars").push({"name": name, "value":value});
	},

	line: function(name){

		var ret = this.get("vars")[name];
		return (typeof ret == "undefined") ? "-" : ret[app.user.getLang() - 1];
	}

	
});

app.lang = new app.lang();