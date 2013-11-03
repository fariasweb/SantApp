/**
 * Subagenda collection
 * 
 */

app.collections.categories = app.collections._collection.extend({
    
    model: app.models.categoria,
    
    initialize: function(){
        this.index = "intIdNivell";
        this.comparator = "strNivell"; 

        this.flags = {
            "request_all": 0,
        }
    },
    
    request_all: function(param, success, error) {
        //Es necesario actualizar?
        if (app.timer.isUpdateHight(this.flags.request_all)) {
            
            //Viene dado por el invocador de la funcion
            //param.idTipusAgenda
            //Añado el parametro de idioma
            param.idioma = app.user.getLang();

            var t = this;
            //No existen datos y voy a la api a por ellos
                app.service.get("categoriesAgenda", "TipCatAgenda", param, 
                    function (status, data){

                        if (_.size(_.keys(data)) > 0) {
                            //Vacio la collecion, por que vamos ha cogerlos todos
                        	//Guardo los datos en laa collecion
                            if (t.lenght) t.reset(); //.add(data);
                            t.add(data);

                            //ACTUALIZO TIEMPO
                            t.flags.request_all = app.timer.getTime();
                        }

                        if (typeof success == "function") success(status, t.toJSON());

                    },
                    function (jqXHR, textStatus, errorThrown) {
                        if (typeof error == "function") error(jqXHR, textStatus, errorThrown);
                    }
                );
        } else {
            //Existen datos
            if (typeof success == "function") {
                
                //Creo la respuesta
                var status = new new app.models.response({                  
                    intCodiEstat: app.constants.get("SUCCESS_REQUEST"),
                    strDescripcioEstat: "Exist info",
                    intTotalResultats: this.lenght
                });
                
                //Datos de antes
                var data = this.toJSON();
                
                success(status, data);
            }
        }
    }
});

//app.collections.categories = new app.collections.categories();
