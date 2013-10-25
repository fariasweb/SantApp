var _constants = function () {
	
	var _const = {
		VERSION: 3600,
		
		//Time
		TIME_UPDATE: 3600,
		
		//News
		MAX_NEWS: 10,
	}
	
	return {
		
		get: function(name) {
			return _const[name];
		}
		
	}
	
}

app.constants = new _constants();
