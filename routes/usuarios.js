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

module.exports = router;
