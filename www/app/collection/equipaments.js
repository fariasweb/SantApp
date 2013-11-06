/**
 * Equipaments collection
 * 
 */

app.collections._equipaments = app.collections._collection.extend({
    
    model: app.models.equipament,
    
    initialize: function(){
    	this.index = "intIdFitxa";
        this.comparator = "strDescripcio"; 

        this.flags =  {
            "request_all": 0
        };

        //Reset pags
        this.reset_pags();
    },

    reset_pags: function(field, total) {
        if (field && total) {

            this.pags[field] = {'total': total, 'page': 0, 'last': false};
        } else {

            this.pags = {
                "request_all": {'total': 0, 'page': 0, 'last': false}
            }
        }
    },
    
    request_all: function(param, success, error) {

        if (this.pags['request_all']['total'] > 0 && !this.pags['request_all']['last']) {

            var first = this.pags['request_all']['page'] * app.constants.get("MAX_NEWS");
            var last  = (this.pags['request_all']['page'] + 1) * app.constants.get("MAX_NEWS") - 1;

            //Es el ultimo? o se puede sumar una nueva pagina?
            if (last >= this.pags['request_all']['total']) {
                last = this.pags['request_all']['total'] - 1;

                this.pags['request_all']['last'] = true;
            } else {
                this.pags['request_all']['page']++;
            }
                
            //Creo la respuesta
            var status = new app.models.response({                  
                    intCodiEstat: app.constants.get("SUCCESS_REQUEST"),
                    strDescripcioEstat: "",
                    intTotalResultats: app.constants.get("MAX_NEWS")
            });

            var data = [];
            for (i = first; i <= last; i++) data.push(this.at(i).toJSON());

            if (typeof success == "function") success(status, data, this.pags['request_all']['last']);    
        } else {
            //No hay nada

            if (typeof success == "function") {
                
                //Creo la respuesta
                var status = new app.models.response({                  
                    intCodiEstat: app.constants.get("SUCCESS_REQUEST"),
                    strDescripcioEstat: "No info",
                    intTotalResultats: 0
                });
                
                success(status, [], true);
            }
        }
    },

    request_all_order: function(param, success, error) {
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


                        //Num_pages
                        t.reset_pags("request_all", app.collections.equipaments.length);

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
                var status = new app.models.response({                  
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

app.collections.equipaments = new app.collections._equipaments();
