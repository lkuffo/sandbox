var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var router = express.Router();
var Ejercicio = require('../models/ejercicio');
var PythonShell = require('python-shell');
var request = require("request")

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

router.post('/practice', function(req, res, next){
	console.log(req.body);

	ide = req.body.idExer;

	var result = "http://localhost:3000/admin/practice/unique/"+ide;

	request({url: result,json: true}, function (error, response, item) {
		if(error){console.log(error)}
	    if (!error && response.statusCode === 200) {
	    	console.log(item);
	    	res_e = item;
	    	expected_answer = res_e.datosSalida;
	    	expected_input = res_e.datosEntrada;

	        let file = req.files;
	        var pyshell = new PythonShell(file);

	        var output = '';
			pyshell.stdout.on('data', function (data) {
				console.log(data);
			});

	        pyshell.send(expected_input);

	        if(output == expected_answer){
	        	console.log("ENTER");
	        }else{
	        	console.log("DONT");
	        }


	    }
	})

	/*var options = {
		mode: 'text',
		pythonPath: 'path/to/python',
		pythonOptions: ['-u'],
		scriptPath: 'path/to/my/scripts',
		args: ['value1', 'value2', 'value3']
	};

	PythonShell.run('my_script.py', options, function (err, results) {
		if (err) throw err;
			// results is an array consisting of messages collected during execution
			console.log('results: %j', results);
		});*/
});


module.exports = router;

