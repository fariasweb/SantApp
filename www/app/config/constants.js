var _constants = function () {
	
	var _const = {
		VERSION: 3600,
		
		//Time
		TIME_UPDATE_LOW: 3600 * 1000,
		TIME_UPDATE_MIDDLE: 3600 * 12 * 1000,
		TIME_UPDATE_HIGHT: 3600 * 24 * 1000,
		
		//News
		MAX_NEWS: 10,
		
		//EXIT AND ERRORS
		SUCCESS_REQUEST: 0,
		RESPONSE_NO_DATA: "No info"
	}
	
	return {
		
		get: function(name) {
			return _const[name];
		}
		
	}
	
}

app.constants = new _constants();
