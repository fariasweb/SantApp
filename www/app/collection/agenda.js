/**
 * Agenda collection
 *
    - Organiza fitxas por fechas: hoy, esta semana, el mes proximo y todas
    -- TODAS -> request_all
    -- MES PROX -> request_month
    -- SEMANA -> request_week
    -- HOY -> request_today
 */

app.collections.agenda = app.collections._collection.extend({

    //Guarda en cache
    pags: {},
    
    initialize: function(){

        //Reset pags
        this.reset_pags();
    },

    reset_pags: function(field, total) {
        if (field && total) {

            this.pags[field] = {'total': total, 'page': 0, 'last': false};
        } else {

            this.pags = {
                "request_all": {'total': 0, 'page': 0, 'last': false},
                "request_today": {'total': 0, 'page': 0, 'last': false},
                "request_week": {'total': 0, 'page': 0, 'last': false},
                "request_month": {'total': 0, 'page': 0, 'last': false}
            }
        }
    },

    //Todas las noticias de hoy en adelante
    //En caso de recivir en status.intCodiEstat = 0 y status.intTotalResultats < app.constants.get("MAX_NEWS") == ULTIMA PAGINA
    request_all: function(param, success, error) {

        //Añado el parametro de idioma
        param.idioma = app.user.getLang();
        this._request("agendaPaginada", "agendaNombreResultats" ,"request_all", param, success, error);

        /*app.service.get("agendaPaginada", "FitxaActivitat", param, 
            function (status, data){

                //Save in collection - si existe -> no guarda, else -> guarda
                if (_.size(data)) app.collections.activitats.add(data);

                //Aumentamos la paginas si no es la ultima
                var last = true;
                if (status.getStatus() == 0 && status.getResults() >= app.constants.get("MAX_NEWS")) {
                     app.collections.agenda.pags['request_all']++;
                     last = false;
                }

                if (typeof success == "function") success(status, data, last);
            },
            function (jqXHR, textStatus, errorThrown) {
                if (typeof error == "function") error(jqXHR, textStatus, errorThrown);
            }
        );*/
    },

    //Todas las noticias de hoy en adelante
    //En caso de recivir en status.intCodiEstat = 0 y status.intTotalResultats < app.constants.get("MAX_NEWS") == ULTIMA PAGINA
    request_today: function(param, success, error) {

        param.idioma = app.user.getLang();
        param.dataInici = app.timer.getDateYYYYMMDD(app.timer.getTime());
        param.dataFi = app.timer.getDateYYYYMMDD(app.timer.getTime());

        this._request("agendaPaginadaDates", "agendaNombreResultatsDates" ,"request_today", param, success, error);
    },

    //Todas las noticias de hoy en adelante
    //En caso de recivir en status.intCodiEstat = 0 y status.intTotalResultats < app.constants.get("MAX_NEWS") == ULTIMA PAGINA
    request_week: function(param, success, error) {

        //Añado el parametro de idioma
        param.idioma = app.user.getLang();
        param.dataInici = app.timer.getDateYYYYMMDD(app.timer.getTimeWeek());
        param.dataFi = app.timer.getDateYYYYMMDD(app.timer.getTimeWeek());

        this._request("agendaPaginadaDates", "agendaNombreResultatsDates" ,"request_week", param, success, error);

    },

    request_month: function(param, success, error) {

        //Añado el parametro de idioma
        param.idioma = app.user.getLang();        
        param.dataInici = app.timer.getDateYYYYMMDD(app.timer.getTimeMonth());
        param.dataFi = app.timer.getDateYYYYMMDD(app.timer.getTimeMonth());

        this._request("agendaPaginadaDates", "agendaNombreResultatsDates" ,"request_month", param, success, error);        
    },

    _request: function(action, action_count ,function_name, param, success, error) {

        if (app.collections.agenda.pags[function_name]['total'] == 0) {

            var t = this;

            app.service.get(action_count, "", param, 
                function (status, data){

                    if (status.isSuccess()) {

                        t.reset_pags(function_name, status.getResults());

                        //Hay algun dato?
                        if (status.getResults() == 0) app.collections.agenda.pags[function_name]['last'] = true;

                        t._request(action, action_count ,function_name, param, success, error);
                    } else {
                        error();
                    }
                }, 
                error
            );

        } else {

            if (app.collections.agenda.pags[function_name]['last']) {
                if (typeof success == "function") {

                    //Creo la respuesta
                    var status = new app.models.response({                  
                        intCodiEstat: app.constants.get("SUCCESS_REQUEST"),
                        strDescripcioEstat: app.constants.get("RESPONSE_NO_DATA"),
                        intTotalResultats: 0
                    });
                    
                    success(status, [], true);
                }
            } else {

                param.firstRow = this.pags[function_name]['total'] - (((this.pags[function_name]['page'] + 1) * app.constants.get("MAX_NEWS")) - 1);
                param.lastRow  = this.pags[function_name]['total'] - (this.pags[function_name]['page'] * app.constants.get("MAX_NEWS"));
                if (param.firstRow < 0) param.firstRow = 0;

                app.service.get(action, "FitxaActivitat", param, 
                    function (status, data){

                        //Save in collection - si existe -> no guarda, else -> guarda
                        if (_.size(data)) app.collections.activitats.add(data);

                        //Aumentamos la paginas si no es la ultima
                        if (status.getStatus() == 0 && status.getResults() >= app.constants.get("MAX_NEWS")) {
                            app.collections.agenda.pags[function_name]['page']++;
                        } else {
                            app.collections.agenda.pags[function_name]['last'] = true;
                        }

                        if (typeof success == "function") success(status, data, app.collections.agenda.pags[function_name]['last']);

                    },
                    function (jqXHR, textStatus, errorThrown) {
                        if (typeof error == "function") error(jqXHR, textStatus, errorThrown);
                    }
                );
            }
        }
    }
});

app.collections.agenda = new app.collections.agenda();
