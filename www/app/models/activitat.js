/*
 * Equipament Class
 * 
- intIdfitxa: codi de l’idioma identificador de l’activitat. 

- intIdioma: idioma en que s’ha triat obtenir la informació. 

- strDescripcio: text que apareix sobre el títol Descripció de la pàgina de l’OIAC. És el títol. 

- strObservacions: text que apareix sota el títol Descripció de la pàgina de l’OIAC. 

- strImport: preu de l’activitat en el cas de tenir-ne.
 */

app.models.activitat = Backbone.Model.extend({
    
    idAttribute: "intIdFitxa",

    initialize: function(){

        //Horario
        this.schedule = new app.collections.horaris();

        //Flags
        this.flags = {
            "request_info": 0,
            "request_schedule": 0
        }
    },
    
    defaults: {
        "intIdFitxa": 0,
        "intIdioma": 0,
        "strDescripcio": "",
        "strObservacions": "",
        "strImport": 0,
    },
    
    
    request_info: function(param, success, error) {

    	if (app.timer.isUpdateHight(this.flags.request_info)) {
    	
            //Añado el parametro de idioma
            param.idFitxa = this.get("intIdFitxa");
            var t = this;
            
            //No existen datos y voy a la api a por ellos
            app.service.get("detallsFitxaActivitat", "FitxaActivitat", param, 
                    function (status, data){
                        //Save data in array
                        t.set(data[0]);
                        
                        //Update flag
                        t.flags.request_info = app.timer.getTime();

                        //Return
                        if (typeof success == "function") success(status, data);
                    },
                    function (jqXHR, textStatus, errorThrown) {
                        if (typeof error == "function") error(jqXHR, textStatus, errorThrown);
                    }
            );
        
       } else {
       	    //Return the save date
           	if (typeof success == "function") {

                //Create manual status response
    	       	var status =  new app.models.response(); 
    	        status.setTotalResults(1);
    	       	
                //Return
    	       	success(status, this.toJSON());
    	   	}
       }
    },

    request_schedule: function(param, success, error) {
        
        if (app.timer.isUpdateHight(this.flags.request_schedule)) {
        
            //Añado el parametro de idioma
            param.idFitxa = parseInt(this.get(this.idAttribute));
            param.idioma = app.user.getLang();
            
            var t = this;
            echo ("A");
            //No existen datos y voy a la api a por ellos
            app.service.get("horarisFitxa", "FitxaHorari", param, 
                    function (status, data){
                        //Save data in array
                        if (status.getResults() > 0) {
                            t.schedule.add(data);
                            var_dump(t.schedule.toJSON());
                        }
                        
                        //Update flag
                        t.flags.request_schedule = app.timer.getTime();

                        //Return
                        if (typeof success == "function") success(status, data);
                    },
                    function (jqXHR, textStatus, errorThrown) {
                        if (typeof error == "function") error(jqXHR, textStatus, errorThrown);
                    }
            );
        
       } else {
            //TODO
            //Return the save date
            if (typeof success == "function") {

                //Create manual status response
                var status =  new app.models.response(); 
                status.setTotalResults(this.schedule.length);
                
                //Return
                success(status, this.schedule.toJSON());
            }
       }
    },

    //TODO: request_doc, request_img, request_equipament

    request_doc: function(param, success, error) {
        
        if (app.timer.isUpdateHight(this.flags.request_doc)) {
        
            //Añado el parametro de idioma
            param.idFitxa = parseInt(this.get(this.idAttribute));
            param.idioma = app.user.getLang();
            
            var t = this;

            //No existen datos y voy a la api a por ellos
            app.service.get("docsFitxa", "DocImg", param, 
                    function (status, data){
                        //Save data in array

                        var_dump(status.toJSON(), ">>>");
                        if (status.getResults() > 0) {

                            t.schedule.add(element)
                            var_dump(t.schedule.toJSON());
                        }

                        var_dump(t.schedule.length);
                        
                        //Update flag
                        t.flags.request_schedule = app.timer.getTime();

                        //Return
                        if (typeof success == "function") success(status, data);
                    },
                    function (jqXHR, textStatus, errorThrown) {
                        if (typeof error == "function") error(jqXHR, textStatus, errorThrown);
                    }
            );
        
       } else {
            //TODO
            //Return the save date
            if (typeof success == "function") {

                //Create manual status response
                var status =  new app.models.response(); 
                status.setTotalResults(1);
                
                //Return
                success(status, this.toJSON());
            }
       }
    },
});