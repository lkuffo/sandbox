var express = require('express');
var router = express.Router();

var Usuario = require('../models/usuario');

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
    res.redirect("/users");
    
});

module.exports = router;
