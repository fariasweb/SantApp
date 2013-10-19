$( document ).on( "pageinit", "#demo-page", function() {
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

$(document).ready(function(){

    //TODO: Pendiente obtener las categorías y pintarlas mediante templates.
    // Las categorías tendrán una clase específica para identificarlas, las fichas otra

    // TODO: Selector que identifica Categorías
    $('a').on("click", function(e){
        e.preventDefault();

        // Navegamos a la ruta y guardamos información del href
        $.mobile.navigate($(this).attr('href'), {info: $(this).attr('href')});

        // Obtener categorías mediante id categoría
        getCardsByCategory($(this).attr('href'));
    });


    // TODO: Selector que identifica Fichas
    $('a').on("click", function(e){
        e.preventDefault();

        // Navegamos a la ruta y guardamos información del href
        $.mobile.navigate($(this).attr('href'), {info: $(this).attr('href')});

        // Obtener categorías mediante id categoría
        getCard($(this).attr('href'));
    });

    // Información que obtenemos del método navigate
    $( window ).on( "navigate", function( event, data ) {
      console.log(data.state);

    });

});


// Esto estaría en un controlador aparte
function getCardsByCategory(category){
    // Obtenemos fichas de la categoría recibida y compilamos template

}

// Esto estaría en un controlador aparte
function getCard(card){
    // Obtenemos información de la ficha y compilamos template
}