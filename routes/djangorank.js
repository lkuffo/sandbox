var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var Curso = require('../models/curso');
var Estudiante = require('../models/estudiante');
var router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', function(req, res, next) {
    Estudiante.find().sort([['puntaje', 'descending']]).exec(
        function(err, cursos){
            if (err){
                res.send(err)
            }
            res.json(cursos);
        });
});

router.get('/:id', function(req, res, next) {
    User.find().where("identif").equals(req.params.id).exec(function(err, found){
        res.json(found);
    });
});

module.exports = router;
