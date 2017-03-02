var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var Curso = require('../models/curso');
var Estudiante = require('../models/estudiante');
var User = require("../models/User");
var router = express.Router();
/* GET Courses listing. */
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
