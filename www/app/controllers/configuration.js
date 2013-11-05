/**
 * Configuration controller
 */

app.controllers.configuration = function() {
	console.log("I am going to configuration...");	
	$.mobile.changePage($('#config'), {changeHash:false});
}