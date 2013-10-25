/**
 * Category controller
 */

app.controllers.category = function(cat, subcat) {
	console.log("I am going to category...",cat, subcat);	
	$.mobile.changePage($('#category'), {changeHash:false});
}
