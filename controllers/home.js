var crypto = require('crypto');

function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
};

var mongoose = require('mongoose');
require('../models/user');
require('../models/timer');
var userModel = mongoose.model('User');
var timerModel = mongoose.model('Timer');

module.exports = {
	index: function(req, res){
		if (req.session.username){
			res.render('timer', {username: req.session.username});
		} else {
			res.render('main');
		}
	},
	login: function(req, res){
		res.render('loginform');
	},
	loginProcess: function(req, res){
		if (req.body.username && req.body.password) {

			instance = userModel.findOne({username: req.body.username}, 'username password', function(err, user){

				if (err) {
					res.render('loginform', {lastUsername: req.body.username, error: 'Wrong'});
				}

				if (user.password == md5(req.body.password)) {
					req.session.username = req.body.username;
					res.redirect('/');
				} else {
					res.render('loginform', {lastUsername: req.body.username, error: 'Incorrect Password'});
				}

			})

		} else {
			res.render('loginform', {lastUsername: req.body.username, error: 'Invalid Username or Password'});
		}
	},
	logout: function(req, res){
		req.session.username = null;
		res.redirect('/');
	},
	about: function(req, res){
		res.render('about', {username: req.session.username});
	},
	register: function(req, res){
		res.render('registerform')
	},
	registerProcess: function(req, res){
		if (req.body.username && req.body.password && req.body.password_again && req.body.email) {

			if (req.body.password == req.body.password_again) {

				userdata = {
					username: req.body.username,
					password: md5(req.body.password),
					email: req.body.email
				}

				userModel.create(userdata)

				req.session.username = req.body.username;

				res.redirect('/');

			} else {
				res.render('registerform', {error: 'Password does not match'});
			}
		} else {
			res.render('registerform', {error: 'Invalid Username or Password or Email'});
		}
	},
	getTimer: function(req, res){

		var d = {}; 

		if (req.session.username){

			var a = timerModel.find({username: req.params.username, timerNum: parseInt(req.params.timernum)}, function(err, result){

				if (err) {
					d.error = err;
					console.log("get timer error");
					console.log(err);
				} else {
					if (result[0]) {
						d.timer = result[0];
					}
					else {
						d.timer = "";
					}
					//d.error = "";
				}

				res.json(d);
			});
			console.log(d);
		} else {
			d.error = "not login";
			res.json(d);
		}
	},
	updateTimer: function(req, res){

		var d = {};

		if (req.session.username){

			if (req.query.doneTime && req.query.state) {

				timerModel.update({
					username: req.params.username, 
					timerNum: parseInt(req.params.timernum)
				}, {
					'$set': {
						doneTime:  parseInt(req.query.doneTime),
						state: parseInt(req.query.state),
						timerName: req.query.timerName
					}
				}, {
					upsert: true
				}, function(err, doc) {
					d.error = err;
				})
			} else {
				d.error = "params error";
			}

		} else {
			d.error = "not login";
		}
			
		res.json(d);
	}
};
