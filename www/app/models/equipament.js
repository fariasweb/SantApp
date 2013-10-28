/*
 * Equipament Class
 * 
 */

app.models.equipament = Backbone.Model.extend({
    
    idAttribute: "intIdFitxa",
    
    defaults: {
        "intIdFitxa": 0,
        "strDescripcion": "",
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
        "strCentre": ""
    },
    
    
    request_info: function(param, success, error) {
        //Añado el parametro de idioma
        echo( this.get("intIdFitxa"));
        param.idFitxa = this.get("intIdFitxa");
        
        //No existen datos y voy a la api a por ellos
        app.service.get("detallsFitxaEquipament", "FitxaEquipament", param, 
                function (status, data){
                    var_dump(data[0]);
                    //app.collections.equipaments.add(data);
                    
                    if (typeof success == "function") success(status, data);
                },
                function (jqXHR, textStatus, errorThrown) {
                    if (typeof error == "function") error(jqXHR, textStatus, errorThrown);
                }
        );
    }
});