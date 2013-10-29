/**
 * Timer class
 */

app.timer = {
	date: new Date(),
	
	getTime: function() {
		return this.date.getTime();
	},
	
	isUpdateHight: function(time) {
		return (this.getTime() - time) > app.constants.get("TIME_UPDATE_HIGHT");
	},
	
	isUpdateMiddle: function(time) {
		return (this.getTime() - time) > app.constants.get("TIME_UPDATE_MIDDLE");
	},
	
	isUpdateLow: function(time) {
		return (this.getTime() - time) > app.constants.get("TIME_UPDATE_LOW");
	}
}
