/**
 * Activitats collection
 * 
 */

app.collections.activitats = app.collections._collection.extend({
    
    model: app.models.activitat,
    
    initialize: function(){
    	this.index = "intIdFitxa";
        //this.comparator = "intIdFitxa"; 
    }
});

app.collections.activitats = new app.collections.activitats();
