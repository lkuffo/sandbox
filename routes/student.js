var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var router = express.Router();


router.get('/myprofile',
	function(req, res, next){
		res.render('myprofile', { user: req.user });
	});


module.exports = router;

