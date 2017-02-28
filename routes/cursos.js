var express = require('express');
var router = express.Router();

var Usuario = require('../models/usuario');
var Curso = require('../models/curso')


router.get('/', function(req, res, next) {
  Curso.find(function(err, usuarios){
      if (err){
          res.send(err)
      }
      res.json(usuarios);
  });
});

router.get('/:id', function(req, res, next){
    Curso.find().where('paralelo').equals(req.params.id).exec(function(err, found){
        res.json(found);
    });
});

function handlePut(req, res){

    /*Usuario.update({identif : req.params.id}, {
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
    */

}

router.put('/:id', handlePut);

router.delete('/:id', function(req,res,next){
    console.log(req.params.id);
    Curso.find({paralelo : req.params.id}).remove().exec();
});

router.post('/:id?', function(req,res,next){
    if (req.params.id){
        return handlePut(req, res);
    }
    
});

module.exports = router;
