var express = require('express'),
config = require('./server/configure'),
app = express();
app.set('port', process.env.PORT || 3630);
app.set('views', __dirname + '/views');
app = config(app);

var mongoose = require('mongoose');

//app.get('/', function(req, res){
//	res.send('Hello World');
//});

mongoose.connect('mongodb://172.17.29.79/timer'); 

var server = app.listen(app.get('port'), function(){
	console.log('Server up: http://localhost:' + app.get('port'));
});
