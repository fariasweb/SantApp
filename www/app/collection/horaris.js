/**
 * Subagenda collection
 * 
 */

app.collections.horaris = app.collections._collection.extend({
    
    model: app.models.horari,
    
    initialize: function(){
        this.index = "intIdFitxa";
        this.comparator = "intOrdre"; 
    }
});

//app.collections.categories = new app.collections.categories();
