var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer")

var Usuario = require('../models/usuario');
var transport = nodemailer.createTransport('smtps://kufgal%40gmail.com:galoGALOkuffoKUFFO22@smtp.gmail.com');


/* GET users listing. */
router.get('/', function(req, res, next) {
  Usuario.find(function(err, usuarios){
      if (err){
          res.send(err)
      }
      res.json(usuarios);
  });
});

router.get('/profesor', function(req,res,next){
    var busqueda = req.query.term;
    Usuario.find(function(err, usuarios){
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

router.get('/estudiantes', function(req,res,next){
    var busqueda = req.query.term;
    Usuario.find(function(err, usuarios){
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


router.get('/:id', function(req, res, next){
    Usuario.find().where('identif').equals(req.params.id).exec(function(err, found){
        res.json(found);
    });
});

function handlePut(req, res){
    var tipo_identif = "matricula";
    var carrera = req.body.editCarreraUsuario;
    if (req.body.editRolUsuario == "Administrador" || req.body.editRolUsuario == "Profesor"){
        tipo_identif = "cedula";
    }
    if (carrera == "No Aplica"){
        carrera = "";
    }
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
    res.redirect("/users");
}

router.put('/:id', handlePut);

router.delete('/:id', function(req,res,next){
    Usuario.find({identif : req.params.id}).remove().exec();
});

router.post('/:id?', function(req,res,next){
    if (req.params.id){
        return handlePut(req, res);
    }
    var tipo_identif = "matricula";
    var carrera = req.body.carreraUsuario;
    if (req.body.rolUsuario == "Administrador" || req.body.rolUsuario == "Profesor"){
        tipo_identif = "cedula";
    }
    if (carrera == "No Aplica"){
        carrera = "";
    }
    var usuario = new Usuario({
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

    res.redirect("/users");
    
});

module.exports = router;
