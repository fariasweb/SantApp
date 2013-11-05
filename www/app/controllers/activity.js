/**
 * Activity controller
 */

app.controllers.activity = function(activityId) {
	console.log("I am going to activity...");	
	
	var activity = $('#activity'),
		activityContent = activity.find('[data-role=content]'),
		activityHeader = activity.find('[data-role=header]'),
		strHeader = "Actividad X";
	
	activityHeader.find('h1').html(strHeader);
	
	$.mobile.changePage($('#activity'), {changeHash:false});
	
	var activityData = {};
	
	// Generamos template
	var activityTemplate = app.views.activityDetail;
	var renderedTemplate = Mustache.render(activityTemplate, activityData);
	
	activityContent.html(renderedTemplate);
	
	// Page create
	activity.trigger('pagecreate');
	
};
