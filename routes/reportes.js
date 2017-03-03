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

router.get('/:ini/:fin', function(req, res, next) {
    var aDevolver = {}
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    Estudiante.find(function(err, estudiantes){
        if (err){
            res.send(err)
        }
        for (var j = 0; j < estudiantes.length; j++){
            estud = estudiantes[j];
            ejercicios = estud.ej_resueltos;
            for (var k = 0; k < ejercicios.length; k++){
                var fecha_res = ejercicios[k].fecha;
                if (fecha_res > req.params.ini && fecha_res < req.params.fin){
                    var a = new Date(Number(fecha_res));
                    console.log(a);
                    var year = a.getFullYear();
                    var mes = months[a.getMonth()];
                    var dia = a.getDate();
                    var final = dia +"-"+ mes+"-"+ year
                    if (final in aDevolver){
                        aDevolver[final] += 1;
                    }else{
                        aDevolver[final] = 1;
                    }    
                }
   
            }
        }            
        res.json(aDevolver);    
    });
});

module.exports = router;

