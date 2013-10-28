/**
 * Basic collection
 * 
 */

app.collections._collection = Backbone.Collection.extend({
    
    initialize: function(){
        //Mantiene el orden por el ID de los modelos
        this.comparator = this.model.idAttribute;
    },
    
    add: function(newElement) {
  
         if (_.isArray(newElement)) {
             //Listado de arryas
             var data = [],
                 i = 0;    
                 
             for (element in newElement) {
                 var id = newElement[element][this.comparator];
                 if (id && !this.at(id)) {
                     Backbone.Collection.prototype.add.call(this, newElement[element], {at: id});
                 }
             };
             
         } else {
             //Si no es array es el objeto directamente
             var id = newElement[this.comparator];
             
             if (id && !this.at(id)) {
                 Backbone.Collection.prototype.add.call(this, newElement, {at: id});
             }
         }
         
         return;
    }
}); 