/**
 * Timer class
 */

app.timer = {
	date: new Date(),
	_limitators: "-",
	
	getTime: function() {
		return this.date.getTime();
	},

	getTimeTomorrow: function() {
		return this.date.getTime() + (86400 * 1000);
	},

	getTimeWeek: function() {
		return this.date.getTime() + (7 * (86400 * 1000));
	},

	getTimeMonth: function() {

		var d = new Date();
		d.setMonth(d.getMonth() + 1);
		d.setDate(1)

		return this.date.getTime();
	},

	// $time is timestamps
	getDateYYYYMMDD: function(time) {

		var d = new Date(time);

		var month = d.getMonth() + 1; //Va del 0 al 11
		if (month < 10) month = "0" + month;

		var day = d.getDate();
		if (day < 10) day = "0" + day;

		return d.getFullYear() + this._limitators + month + this._limitators + day;
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
