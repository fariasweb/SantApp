/**
 * Equipaments collection
 * 
 */

app.collections.equipaments = app.collections._collection.extend({
    model: app.models.equipament,
    
    initialize: function(){
        this.comparator = "intIdFitxa"; 
    },
    
    request_all: function(param, success, error) {
        //if (!app.collections.equipaments.length) {
            
            //Añado el parametro de idioma
            param.idioma = app.user.getLang();
            
            //No existen datos y voy a la api a por ellos
            app.service.get("equipamentsDisponibles", "IdentificadorEquipament", param, 
                function (status, data){
                    app.collections.equipaments.add(data);
                    
                    if (typeof success == "function") success(status, data);
                },
                function (jqXHR, textStatus, errorThrown) {
                    if (typeof error == "function") error(jqXHR, textStatus, errorThrown);
                });
        /*} else {
            //Existen datos
            if (typeof success == "function") {
                
                //Creo la respuesta
                var status = new new app.models.response({                  
                    intCodiEstat: app.constants.get("SUCCESS_REQUEST"),
                    strDescripcioEstat: "Exist info",
                    intTotalResultats: app.collections.idiomes.lenght
                });
                
                //Datos de antes
                var data = app.collections.equipaments.toJSON();
                
                success(status, data);
            }
        }*/
    }
});

app.collections.equipaments = new app.collections.equipaments();
