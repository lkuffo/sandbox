var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  // Enviar en title: express la lista con todos los usuarios para poder 
  res.render('usuarios', { title: 'Express' });
});

module.exports = router;
