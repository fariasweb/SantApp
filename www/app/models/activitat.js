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
        //this.schedule = new app.collections.horaris();
        //DocImgs
        this.docs = new app.collections.docImgs();
        this.imgs = new app.collections.docImgs();

        //Flags
        this.flags = {
            "request_info": app.timer.getTime(),
            "request_schedule": 0,
            "request_doc": 0,
            "request_img": 0
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
        var_dump(app.timer.isUpdateHight(this.flags.request_info));
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
            //No existen datos y voy a la api a por ellos
            app.service.get("horarisFitxa", "FitxaHorari", param, 
                    function (status, data){
                        //Save data in array
                        if (status.getResults() > 0) {
                            //t.schedule.add(data);
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

                        if (status.getResults() > 0) {

                            if (t.docs.length) t.docs.reset();
                            t.docs.add(element)
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
                status.setTotalResults(this.docs.length);
                
                //Return
                success(status, this.docs.toJSON());
            }
       }
    },

    request_img: function(param, success, error) {
        if (app.timer.isUpdateHight(this.flags.request_img)) {
        
            //Añado el parametro de idioma
            param.idFitxa = parseInt(this.get(this.idAttribute));
            param.idioma = app.user.getLang();
            
            var t = this;

            //No existen datos y voy a la api a por ellos
            app.service.get("imgsFitxa", "DocImg", param, 
                    function (status, data){
                        //Save data in array
                        if (status.getResults() > 0) {

                            if (t.imgs.length) t.imgs.reset();
                            t.imgs.add(element)
                        }
                        
                        //Update flag
                        t.flags.request_img = app.timer.getTime();

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
                status.setTotalResults(this.imgs.length);
                
                //Return
                success(status, this.imgs.toJSON());
            }
       }
    },

    request_equipament: function(param, success, error) {
        if (app.timer.isUpdateHight(this.flags.request_equipament)) {
        
            //Añado el parametro de idioma
            param.idFitxa = parseInt(this.get(this.idAttribute));
            
            var t = this;

            //No existen datos y voy a la api a por ellos
            app.service.get("equipamentsFitxa", "FitxaEquipament", param, 
                    function (status, data){
                        //Save data in array
                        if (status.getResults() > 0) {

                            if (t.imgs.length) t.imgs.reset();
                            t.imgs.add(element)
                        }
                        
                        //Update flag
                        t.flags.request_equipament = app.timer.getTime();

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
                status.setTotalResults(this.imgs.length);
                
                //Return
                success(status, this.imgs.toJSON());
            }
       }
    }
});