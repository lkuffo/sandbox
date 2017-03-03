var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var Curso = require('../models/curso');
var Ejercicio = require('../models/ejercicio');
var Estudiante = require('../models/estudiante');

var multer = require("multer");
var fs = require('fs');
var storage = multer.diskStorage({  
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},    
	filename: function (req, file, cb) {
		cb(null, file.fieldname)
	}
})
var upload = multer({storage: storage})
var router = express.Router();


var nodemailer = require("nodemailer")
var transport = nodemailer.createTransport('smtps://kufgal%40gmail.com:galoGALOkuffoKUFFO22@smtp.gmail.com');

//////////////////////////
// RUTEO PARA USUARIOS
//////////////////////////
router.get('/users', function(req, res, next){
	res.render('users', { user: req.user });
});

/* GET users listing. */
router.get('/users/list', function(req, res, next) {
	User.find(function(err, usuarios){
		if (err){
			res.send(err)
		}
		res.json(usuarios);
	});
});

router.get('/users/profesor', function(req,res,next){
	var busqueda = req.query.term;
	User.find(function(err, usuarios){
		if (err){
			res.send(err);
		}
		nombres = [];
		for(i=0; i<usuarios.length; i++){
			nombre_completo = usuarios[i].nombres + " " + usuarios[i].apellidos + "-" + usuarios[i].identif;
			if (usuarios[i].rol == "Profesor" && nombre_completo.includes(busqueda)){
				nombres.push(nombre_completo);
			}
		}
		res.json(nombres);
	});
});

router.get('/users/estudiantes', function(req,res,next){
	var busqueda = req.query.term;
	User.find(function(err, usuarios){
		if (err){
			res.send(err);
		}
		nombres = [];
		for(i=0; i<usuarios.length; i++){
			nombre_completo = usuarios[i].nombres + " " + usuarios[i].apellidos + "-" + usuarios[i].identif;
			if (usuarios[i].rol == "Estudiante" && nombre_completo.includes(busqueda)){
				nombres.push(nombre_completo);
			}
		}
		res.json(nombres);
	});
});


router.get('/users/:id', function(req, res, next){
	User.find().where('identif').equals(req.params.id).exec(function(err, found){
		res.json(found);
	});
});

function handleUserPut(req, res){
	var tipo_identif = "matricula";
	var carrera = req.body.editCarreraUsuario;
	if (req.body.editRolUsuario == "Administrador" || req.body.editRolUsuario == "Profesor"){
		tipo_identif = "cedula";
	}
	if (carrera == "No Aplica"){
		carrera = "";
	}
	User.update({identif : req.params.id}, {
		correo: req.body.editCorreoUsuario,
		password: req.body.editPasswordUsuario,
		rol: req.body.editRolUsuario,
		nombres: req.body.editNombreUsuario,
		apellidos: req.body.editApellidoUsuario,
		carrera: carrera},{multi : false}, callback)

	function callback(err, numAffected){
		if (err){
			console.log(err.message);
		}
	}
	res.redirect("/admin/users");
}

router.put('/users/:id', handleUserPut);


router.post('/users/new/:id?', function(req,res,next){
	if (req.params.id){
		return handleUserPut(req, res);
	}
	var tipo_identif = "matricula";
	var carrera = req.body.carreraUsuario;
	if (req.body.rolUsuario == "Administrador" || req.body.rolUsuario == "Profesor"){
		tipo_identif = "cedula";
	}
	if (carrera == "No Aplica"){
		carrera = "";
	}
	var usuario = new User({
		correo: req.body.correoUsuario,
		password: req.body.passwordUsuario,
		rol: req.body.rolUsuario,
		tipo_identif: tipo_identif,
		identif: req.body.idUsuario,
		nombres: req.body.nombreUsuario,
		apellidos: req.body.apellidoUsuario,
		carrera: carrera
	})
	usuario.save(function(err){
		if (err) return handleError(err);
	});
	
	if (req.body.rolUsuario == "Estudiante"){
		var estudiante = new Estudiante({
			matricula: req.body.idUsuario,
			puntaje: 0,
			insignia: "",
			ej_resueltos: []
		})

		estudiante.save(function(err){
			if (err) return handleError(err);
		});
	}


	var message = {
		from: 'fpsandbox@example.com',
		to: req.body.correoUsuario,
		subject: "BIENVENIDO! Fundamentos de Programacion",
		text: "BIENVENIDO AL CURSO DE FUNDAMENTOS DE PROGRAMACION!\n\n Para poder acceder al Sandbox del curso utilice la siguiente contrasena: "+req.body.passwordUsuario,
		html: '<h2>BIENVENIDO AL CURSO DE FUNDAMENTOS DE PROGRAMACION!</h2><br><br><p> Para poder acceder al Sandbox del curso utilice la siguiente contrasena: '+req.body.passwordUsuario+'</p>'
	};

	transport.sendMail(message, function(error){
		if (error){
			console.log('Error Ocurred');
			console.log(error.message);
			return;
		}
	})

	res.redirect("/admin/users");

});

router.delete('/users/:id', function(req,res,next){
	User.find({identif : req.params.id}).remove().exec();
});

//////////////////////////
// RUTEO DE CURSOS
//////////////////////////


router.get('/courses', function(req, res, next){
	res.render('courses', { user: req.user });
});


/* GET Courses listing. */
router.get('/courses/list', function(req, res, next) {
	Curso.find(function(err, cursos){
		if (err){
			res.send(err)
		}
		res.json(cursos);
	});
});




function handleCoursePut(req, res){
	Usuario.update({identif : req.params.id}, {
		correo: req.body.editCorreoUsuario,
		password: req.body.editPasswordUsuario,
		rol: req.body.editRolUsuario,
		nombres: req.body.editNombreUsuario,
		apellidos: req.body.editApellidoUsuario,
		carrera: carrera},{multi : false}, callback)

	function callback(err, numAffected){
		if (err){
			console.log(err.message);
		}
	}
}




router.put('/courses/:id', handleCoursePut);

router.delete('/courses/:id', function(req,res,next){
	console.log(req.params.id);
	Curso.find({paralelo : req.params.id}).remove().exec();
});

router.post('/courses/:id?', function(req,res,next){
	if (req.params.id){
		return handleCoursePut(req, res);
	}

});


router.get('/courses/new', function(req, res, next) {
	res.render('newcourse', { user: req.user  });
});

router.put('/courses/par/:paralelo/:id', function(req, res, next){
	var estudiante = req.params.id;
	var paralelo = req.params.paralelo;
	Curso.findOne({paralelo: paralelo}, function(err, par){
		var estudiantes = par.estudiantes;
		var i = estudiantes.indexOf(estudiante);
		if (i != -1){
			estudiantes.splice(i, 1);
		}else{
			estudiantes.push(estudiante);
		}
		console.log(estudiantes);
		Curso.update({paralelo : paralelo}, {
			estudiantes: estudiantes},{multi : false}, callback)

		function callback(err, numAffected){
			if (err){
				console.log(err.message);
			}
		}
	});
});


router.put('/courses/par/profesor/:paralelo/:id', function(req, res, next){
	var profesor = req.params.id;
	var paralelo = req.params.paralelo;
	Curso.update({paralelo: paralelo}, {
		profesor: profesor },{multi : false}, callback)

	function callback(err, numAffected){
		if (err){
			console.log(err.message);
		}
	}
});

router.post('/courses/new/archivo', upload.single('upl'), function(req,res,next){
	var result = ''; 
	console.log(req.file);
	fs.readFile('uploads/upl', 'utf-8', function(err,data){
		if (err){
			return console.log(err);
		}
		info = data.split("\r\n");
		paralelo = info[0];
		profesor = info[1];
		estudiantes = info.slice(2);
		var curso = new Curso({
			profesor: profesor,
			paralelo: paralelo,
			estudiantes: estudiantes
		});

		curso.save(function(err){
			if (err) return handleError(err);
		})
	});
	res.redirect("/admin/courses");
});


router.post('/courses/new/n', function(req, res, next) {
	estud = [];
	for (var key in req.body){
		var value = req.body[key];
		if (key != "id-paralelo" && key != "autocompletar-profesor" && key != "autocompletar-estudiante"){
			estud.push(value.split("-")[1]);
		}
	}
	profesor = req.body["autocompletar-profesor"].split("-")[1];
	var curso = new Curso({
		profesor: profesor,
		paralelo: req.body["id-paralelo"],
		estudiantes: estud
	})

	curso.save(function(err){
		if (err) return handleError(err);
	});

	res.redirect("http://localhost:3000/admin/courses");
});


router.post('/courses/file', function(req, res, next) {
	console.log(req);
	console.log(req.files); 

	res.redirect("http://localhost:3000/admin/courses");
});


//////////////////////////
// RUTEO DE PARALELOS
//////////////////////////



router.get('/courses/par/:id', function(req, res, next) {
	res.render('paralel', { paralelo: req.params.id,  user: req.user });
});


/* PARALEL users listing. */
router.get('/courses/par/list/:id', function(req, res, next){
	Curso.find().where('paralelo').equals(req.params.id).exec(function(err, found){
		res.json(found);
	});
});


//////////////////////////
// RUTEO DE EJERCICIOS 
//////////////////////////


router.get('/practice', function(req, res, next) {
	res.render('ejercicios', { title: 'Ejercicios',  user: req.user });
});


/*Exercise list */
router.get('/practice/list', function(req, res, next) {
	Ejercicio.find(function(err, ejercicios){
		if (err) {
			res.send(err);
		}
		res.json(ejercicios);
	});
});


router.get('/practice/:id', function(req, res, next) {
	var ejercicioFind = req.params.id;
	console.log(ejercicioFind);

});

function editEjercicioCont(req, res) {
	var ejercicioEdit = req.params.id;
	console.log(ejercicioEdit);

	Ejercicio.findOneAndUpdate(
		{ _id: ejercicioEdit},
		{titulo:          req.body.tituloNewEjer,
			descripcion:     req.body.descNewEjer,
			formEntrada: 	req.body.formEntrada,
	   		formSalida: 	req.body.formSalida,
			datosEntrada:    req.body.casoEntrada,
			datosSalida:     req.body.casoSalida,
			etiquetas:       req.body.tagsNewEjer,
			nivelDificultad: req.body.nivelNewEjer},
			function(err, numAffected){
				if (err){
					console.log(err.message);
					}
					//return res.send('Ejercicio modificado con exito');
				}
			);
	
	res.redirect("/admin/practice");
}

router.put('/practice/edit/:id', editEjercicioCont);

router.post('/practice/new/:id?', function(req, res, next){
	if(req.params.id) {
		return editEjercicioCont(req, res);
	}

	var ejercicioNew = new Ejercicio({
		titulo:          req.body.tituloNewEjer,
		descripcion:     req.body.descNewEjer,
		formEntrada: 	req.body.formEntrada,
   		formSalida: 	req.body.formSalida,
		datosEntrada:    req.body.casoEntrada,
		datosSalida:     req.body.casoSalida,
		etiquetas:       req.body.tagsNewEjer,
		nivelDificultad: req.body.nivelNewEjer
	})
	ejercicioNew.save(function(err) {
		if (err) {
			return handleError(err);
		}
	});

	res.redirect("/admin/practice");
});



router.delete('/practice/:id', function(req, res, next) {
	var ejercicioDelete = req.params.id;
	console.log(ejercicioDelete);
	Ejercicio.find({ _id : ejercicioDelete}).remove().exec();
});


module.exports = router;
