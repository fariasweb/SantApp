/*
 * User Class
 * 
 */

app.models.user = Backbone.Model.extend({
    defaults: {
        "intIdioma": 1,
    },
    
    getLang: function() {
        if (this.get("intIdioma") != 0) {
            return this.get("intIdioma");
        } else if(app.collections.idiomes.length) {
            return app.collections.idiomes.at(0).get("intIdioma");
        }
        
        return 1;
    }
});