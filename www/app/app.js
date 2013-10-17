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
	
	
    $( document ).on( "swipeleft swiperight", "#demo-page", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight"  ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
});