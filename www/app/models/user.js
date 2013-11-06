/*
 * User Class
 * 
 */

app.models.user = Backbone.Model.extend({
    defaults: {
        "intIdioma": 1,
        "created": true,
    },

    init: function(succes, error) {
        //Existe el usario en la BD?
            //No existe? Creo el usuario 

            //Error

        //Existe y seteo el paramtro de created = true
        //intIdioma = idioma de BD

        //Devuelvo funcion OK
    },

    createUser: function(success, error) {
        app.db.query("INSERT INTO USER_CONF (1, 0)", success, error); 
    },
    
    getLang: function() {
        if (this.get("intIdioma") != 0 && this.get("created")) {
            return this.get("intIdioma");
        } else {
            return 1;
        }  
    },

    setLang: function(lang) {
        //Guardar en base de datos

        //
    },

    //Miramos si no esta iniciado
            /*console.log(app.db);
            app.db.query("SELECT * FROM USER_CONF", 
                function(tx, results){
                    console.log("Returned rows = " + results.rows.length);
                    return results.rows.length;
                },
                function() {
                    console.log("ERROR");
                }
            );*/
});