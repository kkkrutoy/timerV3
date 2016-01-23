var express = require('express'),
router = express.Router(),
home = require('../controllers/home');

module.exports = function(app){
	router.get('/', home.index);
	router.get('/login', home.login);
	router.post('/login', home.loginProcess);
	router.get('/logout', home.logout);
	router.get('/about', home.about);
	router.get('/register', home.register);
	router.post('/register', home.registerProcess);
	//router.get('/timer', home.timer);
	router.get('/api/v1/timer/:username/:timernum', home.getTimer);
	router.put('/api/v1/timer/:username/:timernum', home.updateTimer);
	app.use(router);
};
