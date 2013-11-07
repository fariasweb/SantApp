/*
 * User Class
 * 
 */

app.models.user = Backbone.Model.extend({
    defaults: {
        "intIdioma": 1,
        "created": true,
    },

    init: function(success, error) {
        //Existe el usario en la BD?
        app.db.query("SELECT * FROM user_conf",
            function(tx, results) {
                if (!results.rows.length) {
                    //Crear usuario
                    app.user.createUser(
                        function(){
                            //Informamos de que el usuario no existia y se ha creado
                            error(0);
                        },
                        error);
                } else {
                    echo ("EXISTEEE :D");

                    app.user.set({"created": true, "intIdioma": results.rows.item(0).lang});
                    success();
                }
            },
            error
        );
            //No existe? Creo el usuario 

            //Error

        //Existe y seteo el paramtro de created = true
        //intIdioma = idioma de BD

        //Devuelvo funcion OK
    },

    createUser: function(success, error) {
        app.db.query("INSERT INTO user_conf VALUES (1, 0)", success, error); 
    },
    
    getLang: function() {
        if (this.get("intIdioma") != 0 && this.get("created")) {
            return this.get("intIdioma");
        } else {
            return 1;
        }  
    },

    setLang: function(lang, success, error) {
        //Guardar en base de datos
        app.db.query('UPDATE user_conf SET lang = '+lang+' WHERE id = 1', 
            function() {
                app.user.set({"lang": lang});
                if (typeof success == "function") success();
            },function(){
                if (typeof error == "function") error();
            });
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