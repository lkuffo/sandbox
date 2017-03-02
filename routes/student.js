var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var router = express.Router();
var Ejercicio = require('../models/ejercicio');


router.get('/myprofile',
	function(req, res, next){
		res.render('myprofile', { user: req.user });
	});



router.get('/practice', function(req, res, next) {
		res.render('estudianteEjer', { user: req.user });
});

///TRAER EJERCICIOS POR LA DIFICULTAD Y TAGS ELEGIDOS
router.get('/practice/:id', function(req, res){
	var nivelDif = req.params.id;
	var tagEscog = 'random dados'; //etiquetas
	Ejercicio.find({ nivelDificultad : nivelDif },function(error, ejercicios) {
		if (error) {
			res.send(error);
		}
		res.json(ejercicios);
	});
	//res.redirect('estudianteEjer');
});


module.exports = router;

