/**
 * Activity controller
 */

app.controllers.activity = function(activity_id) {
	console.log("I am going to activity...");	
	$.mobile.changePage($('#index'), {changeHash:false});
}