var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var router = express.Router();
var Ejercicio = require('../models/ejercicio');
var PythonShell = require('python-shell');
var request = require("request")
var fs = require('fs')

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

router.post('/practice/solve/:id', function(req, res, next){
	
	var url = "http://localhost:3000/admin/practice/unique/"+req.params.id;

	var score		 = 0;
	var sendBy		 = req.user.identif;

	
	var fileName	= req.files.solution.name;
	var targetPath 	='./uploads/exer-st/'+fileName;
	var tempPath	= req.files.archivo.path;
	var extension 	= req.files.archivo.type;

	var pyshell 	= new PythonShell(targetPath);
	var result;

	
	request({url: url,json: true}, function (error, response, item) {
		if(error){console.log(error)}
		if (!error && response.statusCode === 200) {
			var rule = item;

			//Probar el codigo

			fs.rename(tempPath,targetPath,function(err){
				if(err){console.log(error)}
				else{
				fs.unlink(tmp_path,function(err){
					pyshell.send(rule.datosSalida);
					pyshell.on('message', function (message) {
						result 	= message;
					});
				});}
			});

			//Verificacion si la salida es los datos de prueba de salida.
			if (rule.datosSalida == result){
				//Verificacion si es que ya no tiene el ejercicio resuelto
				Estudiante.findOne({"resueltos.id" : req.params.id}, function(err, resuelto){
					if (err){res.send(err);}
					if(!resuelto){
						Estudiante.update({identif:user.identif},{
							$push:{"resueltos":{id:req.params.id, fecha: new Date()}}
						});
						if (item.nivelDificultad == 'Fácil'){
							score = 5;
						}else if (item.nivelDificultad == 'Medio'){
							score = 10;
						}else{
							score = 15;
						}

						Estudiante.update({identif:user.identif},{
							puntaje:puntaje+score
						});
						console.log("resuelto por 1 vez");
					}else{
						console.log("ya lo resolvio");
					}
				});
				
			}else{
				console.log("NO FUNCIONA")
			}
		}	

	});

	res.redirect('/student/practice');

});


module.exports = router;

