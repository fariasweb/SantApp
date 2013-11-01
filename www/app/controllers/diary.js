/**
 * Diary controller
 */

app.controllers.diary = function(cat) {
	console.log("I am going to diary...",cat);	
	$.mobile.changePage($('#diary'), {changeHash:false});
}
