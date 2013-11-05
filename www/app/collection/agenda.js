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

    reset_pags: function(field) {
        if (field) {
            this.pags[field] = 0;
        } else {
            this.pags = {
                "request_all": 0,
                "request_today": 0,
                "request_week": 0,
                "request_month": 0
            };
        }

        /**
        this.pags = {
                "request_today": {
                    'num': 0,
                    'pag': [
                        {
                            flag: 0,
                            fitxes: [1,2,3,...]
                        }
                    ]
                },
            }
        **/
    },

    //Todas las noticias de hoy en adelante
    //En caso de recivir en status.intCodiEstat = 0 y status.intTotalResultats < app.constants.get("MAX_NEWS") == ULTIMA PAGINA
    request_all: function(param, success, error) {

        //Añado el parametro de idioma
        param.idioma = app.user.getLang();
        param.firstRow = (this.pags['request_all'] * app.constants.get("MAX_NEWS")) + 1;
        param.lastRow = ((this.pags['request_all'] + 1) * app.constants.get("MAX_NEWS"));

        app.service.get("agendaPaginada", "FitxaActivitat", param, 
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
        );
    },

    //Todas las noticias de hoy en adelante
    //En caso de recivir en status.intCodiEstat = 0 y status.intTotalResultats < app.constants.get("MAX_NEWS") == ULTIMA PAGINA
    request_today: function(param, success, error) {

        //Añado el parametro de idioma
        param.idioma = app.user.getLang();
        param.firstRow = (this.pags['request_today'] * app.constants.get("MAX_NEWS")) + 1;
        param.lastRow = ((this.pags['request_today'] + 1) * app.constants.get("MAX_NEWS"));
        
        param.dataInici = app.timer.getDateYYYYMMDD(app.timer.getTime());
        param.dataFi = app.timer.getDateYYYYMMDD(app.timer.getTime());

        this._request("agendaPaginadaDates", "request_today", param, success, error);

    },

    //Todas las noticias de hoy en adelante
    //En caso de recivir en status.intCodiEstat = 0 y status.intTotalResultats < app.constants.get("MAX_NEWS") == ULTIMA PAGINA
    request_week: function(param, success, error) {

        //Añado el parametro de idioma
        param.idioma = app.user.getLang();
        param.firstRow = (this.pags['request_week'] * app.constants.get("MAX_NEWS")) + 1;
        param.lastRow = ((this.pags['request_week'] + 1) * app.constants.get("MAX_NEWS"));
        
        param.dataInici = app.timer.getDateYYYYMMDD(app.timer.getTimeWeek());
        param.dataFi = app.timer.getDateYYYYMMDD(app.timer.getTimeWeek());

        this._request("agendaPaginadaDates", "request_week", param, success, error);
    },

    request_month: function(param, success, error) {

        //Añado el parametro de idioma
        param.idioma = app.user.getLang();
        param.firstRow = (this.pags['request_month'] * app.constants.get("MAX_NEWS")) + 1;
        param.lastRow = ((this.pags['request_month'] + 1) * app.constants.get("MAX_NEWS"));
        
        param.dataInici = app.timer.getDateYYYYMMDD(app.timer.getTimeMonth());
        param.dataFi = app.timer.getDateYYYYMMDD(app.timer.getTimeMonth());

        this._request("agendaPaginadaDates", "request_month", param, success, error);
    },

    _request: function(action, function_name, param, success, error) {

        app.service.get(action, "FitxaActivitat", param, 
            function (status, data){

                //Save in collection - si existe -> no guarda, else -> guarda
                if (_.size(data)) app.collections.activitats.add(data);

                //Aumentamos la paginas si no es la ultima
                var last = true;
                if (status.getStatus() == 0 && status.getResults() >= app.constants.get("MAX_NEWS")) {
                     app.collections.agenda.pags[function_name]++;
                     last = false;
                }

                if (typeof success == "function") success(status, data, last);

            },
            function (jqXHR, textStatus, errorThrown) {
                if (typeof error == "function") error(jqXHR, textStatus, errorThrown);
            }
        );
    }
});

app.collections.agenda = new app.collections.agenda();
