/*
 * Horari Class
 * 
 */

app.models.horari = Backbone.Model.extend({
    
    idAttribute: "intIdFitxa",
    
    defaults: {
        "intIdFitxa": "long",
        "intOrdre": 0,
        "intDiaDesde": 0,
        "intDiaHasta": 0,
        "intMesDesde": 0,
        "intMesHasta": 0,
        "bytdl": false,
        "bytdt": false,
        "bytdc": false,
        "bytdj": false,
        "bytdv": false,
        "bytds": false,
        "bytdg": false,
        "intFinsDia": 0,
        "dtmHoraInici": "",
        "dtmHoraFi": "",
        "strDescripcio": ""
    }
});