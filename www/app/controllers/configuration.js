/**
 * Configuration controller
 */

app.controllers.configuration = function() {
	console.log("I am going to configuration...");	
	
	var config = $('#config'),
		configContent = config.find('[data-role=content]'),
		configHeader = config.find('[data-role=header]'),
		strHeader = "Configuration";
	
	configHeader.find('h1').html(strHeader);
	
	$.mobile.changePage($('#config'), {changeHash:false});
	
	var configData = {};
	
	// Generamos template
	var configTemplate = app.views.config;
	var renderedTemplate = Mustache.render(configTemplate, configData);
	
	configContent.html(renderedTemplate);
	
	// Page create
	config.trigger('pagecreate');
};