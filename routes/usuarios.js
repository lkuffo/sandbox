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

router.delete('/:id', function(req,res,next){
    Usuario.find({identif : req.params.id}).remove().exec();
});

router.post('/', function(req,res,next){
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
