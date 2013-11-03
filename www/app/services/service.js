/**
 * Service
 * 
 */

app.service = {
	
	//CONSTANTS
	_url: "http://195.235.66.115:10001/WSApp/WSApp/AppColoma.asmx?op=", 
	_request: {
		"head": '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>',
		"action": {
			"open": '<%action% xmlns="http://www.gramene.net/appcoloma/" >',
			"close": '</%action%>',
		},
		"foot": '</soap:Body></soap:Envelope>'
	},
	
	_last_request: {},
	
	//FUNCTIONS
	
	/**
	 * Get
	 * 
	 */
	get: function(action, class_name, param, success, error) {
		
		//Action is correct

		//Ajax
		$.ajax({
        	type: "POST",
            url: this._url+action,
            contentType: "text/xml; charset=\"utf-8\"",
            dataType: "xml",
            processData: false,
            data: this._make_soaprequest(action, param),
            beforeSend: function () { },
            success: function (data, textStatus, jqXHR) {
				//Crear un objeto con el estado de la peticion + resultados
				app.service._last_request = new app.models.response({
					intCodiEstat: $(jqXHR.responseXML).find("intCodiEstat").text(),
					strDescripcioEstat: $(jqXHR.responseXML).find("strDescripcioEstat").text(),
					intTotalResultats: $(jqXHR.responseXML).find("intTotalResultats").text()
				});

				//TODO: Mirar si el code no es correcto
				//En caso de no serlo se envia a la funcion error
						
				//Procesar los resultados y devolver
				if (typeof success == "function") {
    				success(app.service._last_request, 
    				        app.service._parseXML_toclass(class_name, jqXHR.responseXML)
    				       );
				} else {
				   // return app.service._parseXML_toclass(class_name, jqXHR.responseXML);
				}		
	         },
	         error: function(jqXHR, textStatus, errorThrown) {
	            //Gestionar el error
	         	if (typeof error == "function") error(jqXHR, textStatus, errorThrown);
	         }
         });
	},
	
	/**
	 * _make_soaprequest
	 */
	
	_make_soaprequest: function(action, param) {
		
		var str = "";
		
		str  = this._request.head;
		str += this._request.action.open.replace("%action%", action);

        //Parametros
		_.each(param, function(element, index) {
		  str += "<"+index+">"+element+"</"+index+">";
		});
		
        //str += "<idioma>1</idioma>";
		str += this._request.action.close.replace("%action%", action);
		str += this._request.foot;


		return str;
	},
	
	/**
	 * _parseXML_toclass
     *  @param string class_name
	 */
	_parseXML_toclass: function(class_name, data) {
	    var data_ = [];
        var r = data.getElementsByTagName(class_name);
        
  		//echo ("LONG: "+r.length)
        for (i = 0; i < r.length; i++) {
            data_[i] = {}; 
            
            for (j = 0; j < r[i].childNodes.length; j++) {
            	//var_dump(r[i].childNodes[j].nodeName,r[i].childNodes[j].childNodes.length);
                data_[i][r[i].childNodes[j].nodeName] = (r[i].childNodes[j].childNodes.length)? r[i].childNodes[j].childNodes[0].nodeValue : "";
            }
            
        }

        //var_dump(data_)

        return data_;
	}
	
}
