/*
 * DocImg Class
 * 
 */

app.models.docImg = Backbone.Model.extend({

    defaults: {
        "intIdFitxa": 0,
        "intIdNivell": 0,
        "intIdioma": 0,
        "strDescripcio": "",
        "intIdNivellRef": 0,
        "strExtensio": "",
        "strURL": ""
    }
});