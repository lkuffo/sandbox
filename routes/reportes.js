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
        k = 0;
        pera = 0
        for (var i in cursos){
            key = cursos[i].paralelo;
            estudiants = cursos[i].estudiantes;
            for (var j = 0; j < estudiants.length; j++){
                estudiant = estudiants[j];
                Estudiante.find().where('matricula').equals(estudiant).exec(function(err, found){
                    rightnow = cursos[k].paralelo;
                    var value = found[0].ej_resueltos.length;
                    aDevolver[rightnow] = value;
                    console.log(aDevolver);
                    pera +=1
                    if (pera == estudiants.length){
                        k+=1;
                        pera = 0;
                    }
                    if (k == cursos.length){
                        res.json(aDevolver);
                    }

                });
            } 
        }
	});
});

module.exports = router;

