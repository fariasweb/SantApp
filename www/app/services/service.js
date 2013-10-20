
app.service = {
	
	//CONSTANTS
	_url: "http://195.235.66.115:10001/WSApp/WSApp/AppColoma.asmx?op=", 
	_request: {
		"head": '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>',
		"action": {
			"open": '<%action% xmlns="http://www.gramene.net/appcoloma/" />',
			"close": '</%action%>',
		},
		"foot": '</soap:Body></soap:Envelope>'
	},
	
	
	//FUNCTIONS
	
	/**
	 * Get
	 * 
	 */
	get: function(action, param, success, error) {
		
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
            success: function (response, textStatus, c) {
				//Mirar que los datos sean correctos
						
				//Crear un objeto con el estado de la peticion + resultados
				var status = {};
						
				//Procesar los resultados
				var data = {};
				//DEBUG
				var data = c.responseXML
						
				success(status, data);
						
	         },
	         error: function(a,b,c) {
	            //Gestionar el error
	         	error(a,b,c);
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
		
		_.each(param, function(element) {
			str += "<"+element.name+">"+element.value+"</"+element.name+">";
		});
		
		//str += this._request.action.close.replace("%action%", action);
		str += this._request.foot;
		
		return str;
	}
	
}
