/**
 * Home controller
 */

app.controllers.home = function() {
	console.log("I am going to home...");	
	$.mobile.changePage($('#index'), {changeHash:false});
}
