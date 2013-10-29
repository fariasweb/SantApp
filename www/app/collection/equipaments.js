/**
 * Equipaments collection
 * 
 */

app.collections.equipaments = app.collections._collection.extend({
    
    model: app.models.equipament,

    flags: {
        "request_all": 0
    },
    
    initialize: function(){
    	this.index = "intIdFitxa";
        this.comparator = "strDescripcio"; 
    },
    
    request_all: function(param, success, error) {
        //Es necesario actualizar?
        if (app.timer.isUpdateHight(this.flags.request_all)) {

            var t = this;

            //Añado el parametro de idioma
            param.idioma = app.user.getLang();
            
            //No existen datos y voy a la api a por ellos
            app.service.get("equipamentsDisponibles", "IdentificadorEquipament", param, 
                function (status, data){

                    if (_.size(_.keys(data)) > 0) {
                        //Vacio la collecion, por que vamos ha cogerlos todos
                    	//Guardo los datos en laa collecion
                        if (app.collections.equipaments.lenght) app.collections.equipaments.reset(); //.add(data);
                        app.collections.equipaments.add(data);

                        //ACTUALIZO TIEMPO
                        t.flags.request_all = app.timer.getTime();
                    }

                    if (typeof success == "function") success(status, app.collections.equipaments.toJSON());

                },
                function (jqXHR, textStatus, errorThrown) {
                    if (typeof error == "function") error(jqXHR, textStatus, errorThrown);
                });

        } else {
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
        }
    }
});

app.collections.equipaments = new app.collections.equipaments();
