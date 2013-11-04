/*
 * Language Library
 * Author: Francisco Javier Arias
 */

app.lang = Backbone.Model.extend({

	defaults: { 
		"vars": {
			"AAA": ["CAT", "CAST"], 
			"AAB": ["CAT2", "CAST2"], 
			"AAC": ["CAT3", "CAST3"] 
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