var express = require('express');
var router = express.Router();

var Ejercicio = require('../models/ejercicio');


router.get('/', function(req, res, next) {
	res.render('ejercicios', { title: 'Ejercicios' });
});

//TRAE TODOS LOS EJERCICIOS
router.get('/all', function(req, res, next) {
	Ejercicio.find(function(err, ejercicios){
		if (err) {
			res.send(err);
		}
		res.json(ejercicios);
	});
});

//TRAE UN EJERCICIO EN ESPECIFICO
router.get('/:id', function(req, res, next) {
	var ejercicioFind = req.params.id;
	console.log(ejercicioFind);

});

//CREA UN NUEVO EJERCICIO
router.post('/new/ejercicio', function(req, res, next){

		
		//console.log(req.body.nivelNewEjer);

		var ejercicioNew = new Ejercicio({
			titulo:          req.body.tituloNewEjer,
			descripcion:     req.body.descNewEjer,
			datosEntrada:    req.body.dataEnNewEjer,
			datosSalida:     req.body.dataSaNewEjer,
			etiquetas:       req.body.tagsNewEjer,
			nombres: "",
			nivelDificultad: req.body.nivelNewEjer
		})
		ejercicioNew.save(function(err) {
			if (err) {
				return handleError(err);
			}
		});

		res.redirect("/ejercicios");
});

//ACTUALIZA UN EJERCICIO
router.put('/:id', function(req, res, next) {
	var ejercicioEdit = req.params.id;
	console.log(ejercicioEdit);
	Ejercicio.update(

		{titulo:          req.body.tituloNewEjer,
		descripcion:     req.body.descNewEjer,
		datosEntrada:    req.body.dataEnNewEjer,
		datosSalida:     req.body.dataSaNewEjer,
		etiquetas:       req.body.tagsNewEjer,
		nombres: "",
		nivelDificultad: req.body.nivelNewEjer},
		{multi : false},
		callback
	)
	function callback(err, numAffected){
        if (err){
            console.log(err.message);
        }
    }
    res.redirect("/ejercicios");

});

//BORRA UN EJERCICIO EN ESPECIFICO
router.delete('/:id', function(req, res, next) {
	var ejercicioDelete = req.params.id;
	console.log(ejercicioDelete);
	Ejercicio.find({ _id : ejercicioDelete}).remove().exec();
});

module.exports = router;