/*
 * Response Class
 * 
 */

app.models.response = Backbone.Model.extend({
	defaults: {
		"intCodiEstat": 0,
		"strDescripcioEstat": "",
		"intTotalResultats": 0
	},
	
	constructor: function() {
    	Backbone.Model.apply(this, arguments);
  	},
});