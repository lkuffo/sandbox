var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var Curso = require('../models/curso');
var Estudiante = require('../models/estudiante');
var router = express.Router();

/* Top 3 dado un curso */
router.get('/', function(req, res, next) {
    res.render('reporte', { user: req.user });
});

router.get('/cursos', function(req, res, next) {
    var aDevolver = {}
    Curso.find(function(err, cursos){
		if (err){
			res.send(err)
		}
        Estudiante.find(function(err, estudiantes){
        	if (err){
			    res.send(err)
		    }
            for (var i in cursos){
                paralelo = cursos[i].paralelo;
                estudiantes_de_curso = cursos[i].estudiantes;
                for (var j = 0; j < estudiantes_de_curso.length; j++){
                    actual = estudiantes_de_curso[j];
                    for (var k in estudiantes){
                        if (estudiantes[k].matricula == actual){
                            value = estudiantes[k].ej_resueltos.length;
                            if (paralelo in aDevolver){
                                aDevolver[paralelo] += value;
                            }else{
                                aDevolver[paralelo] = value;
                            }       
                            break;
                        }
                    }            
                }
            }
            res.json(aDevolver);    
        });
	});
});

module.exports = router;

