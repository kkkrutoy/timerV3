var path = require('path'),
routes = require('./routes'),
exphbs = require('express-handlebars'),
express = require('express'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
morgan = require('morgan'),
methodOverride = require('method-override'),
errorHandler = require('errorhandler'),
moment = require('moment'),
cookieParser = require('cookie-parser'),
session = require('express-session');


module.exports = function(app){

 	app.use(cookieParser());

	app.use(session({
	    secret: '12345',
	    name: 'timer',
		cookie: {maxAge: 2*24*60*60*1000},
		resave: false,
		saveUninitialized: true,
	}));

	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({'extended':true}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(cookieParser('some-secret-value-here'));
	routes(app);//moving the routes to routes folder.

 	app.use(
 		'/public/', 
 		express.static(
 			path.join(__dirname,
 			'../public')
 		)
 	);

	app.engine('handlebars', exphbs.create({
		defaultLayout: 'timer',
		layoutsDir: app.get('views') + '/layouts',
		partialsDir: [app.get('views') + '/partials'],
		helpers: {
			timeago: function(timestamp){
				return moment(timestamp).startOf('minute').fromNow();
			}
		}
	}).engine);

	app.set('view engine', 'handlebars');

	if ('development' === app.get('env')) {
		app.use(errorHandler());
	}

	return app;
};
