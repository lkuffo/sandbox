var express = require('express');
var router = express.Router();
var Curso = require('../models/curso');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('nuevocurso', { title: 'Express' });
});

router.post('/', function(req, res, next) {
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

    res.redirect("../courses");
});


module.exports = router;