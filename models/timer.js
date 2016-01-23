var mongoose = require('mongoose');

var timerSchema = new mongoose.Schema({
	username: String,
	timerName: String,
	timerNum: Number,
	doneTime: {
		type: Number,
		default: 1
	}, 
	state: {
		type: Number, 
		default: 0
	}
});

mongoose.model('Timer', timerSchema);  

//mongoose.connect('mongodb://172.17.29.79/timer');  