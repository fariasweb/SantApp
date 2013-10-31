/*
 * Equipament Class
 * 
 */

app.models.equipament = Backbone.Model.extend({
    
    idAttribute: "intIdFitxa",
    
    flags: {
    	"request_info": 0,
        "request_activitats" : 0
    },
    
    defaults: {
        "intIdFitxa": 0,
        "strDescripcio": "",
        "strObservacions": "",
        "intIdNivellRelacionat": 0,
        "intDistricte": 0,
        "strBarri": "",
        "strDescripcioCarrer": "",
        "strNumeroCarrer": "",
        "strDescripcioProvincia": "",
        "strDescripcioPoblacio": "",
        "strCodiPostal": "",
        "strNomResponsable": "",
        "strCognomsResponsable": "",
        "strCentre": "",
        "strTelefonA": "",
        "strTelefonB": "",
        "strTelefonC": "",
        "strFax": "",
        "strUrl": ""
    },
    
    
    request_info: function(param, success, error) {

    	if (app.timer.isUpdateHight(this.flags.request_info)) {
    	
            //Añado el parametro de idioma
            param.idFitxa = this.get("intIdFitxa");
            var t = this;
            
            //No existen datos y voy a la api a por ellos
            app.service.get("detallsFitxaEquipament", "FitxaEquipament", param, 
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

    request_activitats: function(param, success, error) {
        if (app.timer.isUpdateMiddle(this.flags.request_info)) {
        
            //Añado el parametro de idioma
            param.idCentre = this.get("intIdFitxa");
            param.Idioma = app.user.get("intIdioma");
            var t = this;
            
            //No existen datos y voy a la api a por ellos
            app.service.get("fitxesEquipamentPerId", "IdentificadorActivitat", param, 
                    function (status, data){
                        //Save data in array
                        //t.set(data[0]);
                        
                        if (_.size(data)) app.collections.activitats.add(data);

                        //Update flag
                        t.flags.request_activitats = app.timer.getTime();

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
    }
});