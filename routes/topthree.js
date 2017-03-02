var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var Curso = require('../models/curso');
var Estudiante = require('../models/estudiante');
var router = express.Router();

/* Top 3 dado un curso */
router.get('/:id', function(req, res, next) {
    var aDevolver = [];
    Curso.find().where("paralelo").equals(req.params.id).exec(
        function(err, curso){
            if (err){
                res.send(err)
            }
            var estudiantes = curso[0].estudiantes;
            console.log(estudiantes);
            Estudiante.find().sort([['puntaje', 'descending']]).exec(
                function(err, todos){
                    if (err){
                        res.send(err)
                    }
                    for (i in todos){
                        var j = estudiantes.indexOf(todos[i].matricula);
                        if (j != -1){
                            aDevolver.push(todos[i]);
                        }
                    } 
                    res.json(aDevolver.slice(0, 3));
                });
        });
});


module.exports = router;