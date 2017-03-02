const  express = require('express');
const  passport = require('passport');
const  User = require('../models/User');
const  router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
});


router.get('/login', function(req, res, next){
    res.render('login', { user: req.user });
  });
  
router.post('/login', passport.authenticate(
	'local', { successRedirect: '/',
            	failureRedirect: '/login'})
);

router.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/');
  });


module.exports = router;
