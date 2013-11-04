
$(document).bind("mobileinit", function () {
	$.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});


$( document ).on("pageinit", "#index", function() {
	
		$.mobile.ajaxEnabled = false;
		$.mobile.linkBindingEnabled = false;
		$.mobile.hashListeningEnabled = false;
		$.mobile.pushStateEnabled = false;
		$.mobile.changePage.defaults.changeHash = false;

	
	$(document).on("pagechange", function(a, b) {
		console.log("PAGECHANGE", a,b);
		return false;
	});
	
	$( window ).on( "navigate", function( event, data ) {
  		console.log("NAVEIGATE", data );
	});

});
