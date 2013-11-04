/**
 * Subagenda collection
 * 
 */

app.collections.subagendes = app.collections._collection.extend({
    
    model: app.models.subagenda,

    flags: {
        "request_all": 0
    },
    
    initialize: function(){
    	this.index = "intIdNivell";
        this.comparator = "strNivell"; 

        this.flags = {
            "request_all": 0
        }
    },
    
    request_all: function(param, success, error) {
        //Es necesario actualizar?
        if (app.timer.isUpdateHight(this.flags.request_all)) {
            
            //Añado el parametro de idioma
            param.idioma = app.user.getLang();
            
            //No existen datos y voy a la api a por ellos
            app.service.get("tipusAgenda", "TipCatAgenda", param, 
                function (status, data){
                    if (_.size(_.keys(data)) > 0) {
                        //Vacio la collecion, por que vamos ha cogerlos todos
                    	//Guardo los datos en laa collecion
                        if (app.collections.subagendes.lenght) app.collections.subagendes.reset(); //.add(data);
                        app.collections.subagendes.add(data);

                        //ACTUALIZO TIEMPO
                        app.collections.subagendes.flags.request_all = app.timer.getTime();
                    }

                    if (typeof success == "function") success(status, app.collections.subagendes.toJSON());

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
                    intTotalResultats: app.collections.subagendas.lenght
                });
                
                //Datos de antes
                var data = app.collections.subagendas.toJSON();
                
                success(status, data);
            }
        }
    }
});

app.collections.subagendes = new app.collections.subagendes();
