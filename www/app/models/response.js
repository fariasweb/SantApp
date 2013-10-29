/*
 * Response Class
 * 
 */

app.models.response = Backbone.Model.extend({
	defaults: {
		"intCodiEstat": app.constants.get("SUCCESS_REQUEST"),
		"strDescripcioEstat": "Exist info",
		"intTotalResultats": 0
	},
	
	constructor: function() {
    	Backbone.Model.apply(this, arguments);
  	},
  	
  	setTotalResults: function(results) {
  		this.set({intTotalResultats: results});
  	}
});