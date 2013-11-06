/**
 * Equipment Activity controller
 */

app.controllers.equipment_activity = function(equipmentId) {
	console.log("I am going to equipment_activity...");	
	
	var equipmentActivity = $('#equipment_activity'),
		equipmentActivityContent = equipmentActivity.find('[data-role=content]'),
		equipmentActivityHeader = equipmentActivity.find('[data-role=header]'),
		strHeader = "Listado de actividades de X";
	
	equipmentActivityHeader.find('h1').html(strHeader);
	
	$.mobile.changePage($('#equipment_activity'), {changeHash:false});
	
	var aListData = {};
	
	// Generamos template
	var equipmentActivityTemplate = app.views.activityList;
	var renderedTemplate = Mustache.render(equipmentActivity, aListData);
	
	equipmentActivityContent.html(renderedTemplate);
	
	// Page create
	equipmentActivity.trigger('pagecreate');
	
};
