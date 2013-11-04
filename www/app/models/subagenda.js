/*
 * Categoria Modelo
 * 
 */

app.models.subagenda = Backbone.Model.extend({
    
    idAttribute: "intIdNivell",

    pags: {},

    categories: "", //Colecion de categorias que almacena esta subagenda
    
    defaults: {
        "intIdNivell": 0,
        "intIdNivellPare": 0,
        "intNivell": 0,
        "strNivell": "",

    },

    initialize: function(){
        //Reset pags
        this.reset_pags();
        this.categories = new app.collections.categories();
    },

    reset_pags: function(field) {
        if (field) {
            this.pags[field] = 0;
        } else {
            this.pags = {
                "request_all": 0
            }
        }
    },

    getColor: function() {
        //Dice cual es el color de la categoria
        return;
    },

    getImg: function() {
        //Devuelve el nombre de la imagen asociada
        return;
    },

    request_all_activitats: function(param, success, error) {

        param.idioma = app.user.getLang();
        param.idTipusAgenda = this.get(this.idAttribute);
        param.firstRow = (this.pags['request_all'] * app.constants.get("MAX_NEWS")) + 1;
        param.lastRow = ((this.pags['request_all'] + 1) * app.constants.get("MAX_NEWS"));
        param.data = app.timer.getDateYYYYMMDD(app.timer.getTime());

        var t = this;

        app.service.get("fitxesTipusAgendaPaginadaData", "FitxaActivitat", param, 
            function (status, data){

                //Save in collection - si existe -> no guarda, else -> guarda
                if (_.size(data)) app.collections.activitats.add(data);

                //Aumentamos la paginas si no es la ultima
                var last = true;
                if (status.getStatus() == 0 && status.getResults() >= app.constants.get("MAX_NEWS")) {
                     t.pags['request_all']++;
                     last = false;
                }

                if (typeof success == "function") success(status, data, last);
            },
            function (jqXHR, textStatus, errorThrown) {
                if (typeof error == "function") error(jqXHR, textStatus, errorThrown);
            }
        );
    },

    request_all_categories: function(param, success, error) {
        param.idTipusAgenda = this.get(this.idAttribute);
        this.categories.request_all(param, success, error);
    }

});