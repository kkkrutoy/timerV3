var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	lastAccess: {type:Date, default: Date.now},
	visits: {type: Number, default: 0},
	admin: {type: Boolean, default: false},
});

mongoose.model('User', userSchema);  

//mongoose.connect('mongodb://172.17.29.79/timer'); 