app.device = {
	
	isConnected: function() {
		return (navigator.connection.type != Connection.NONE) && (navigator.connection.type != Connection.UNKNOWN);
	}
}