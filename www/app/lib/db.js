app.db = {

	_databaseName: "AppColoma",
	_db: "",

	init: function(success, error) {
		
		this._db = window.openDatabase(this._databaseName, "1.0", this._databaseName, 1000);
		
		//DEBUG
		this._db.transaction(this._create, error, success)
	},

	_create: function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS user_conf (id unique, lang)');
	},

	query: function(query, success, error) {
		this._db.transaction(function(tx){
			tx.executeSql(query, [], success, error);
		}, error);
	},

	clear: function() {
		//window.localStorage.clear();
		this.query('DROP TABLE IF EXISTS user_conf', function(){}, function() {});
	}
}