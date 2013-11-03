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
    
    flags: {
    	"request_info": 0
    },
    
    defaults: {
        "intIdFitxa": 0,
        "intIdioma": 0,
        "strDescripcio": "",
        "strObservacions": "",
        "strImport": 0
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

    //TODO: Request_schedule, request_doc, request_img, request_equipament

});