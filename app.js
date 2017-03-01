var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

// Rutas
var index = require('./routes/index');
var users = require('./routes/users');
var usuarios = require('./routes/usuarios');
var courses = require('./routes/courses');
var cursos = require('./routes/cursos');
var course = require('./routes/course');
var newcourse = require('./routes/newcourse');
var ejercicios = require('./routes/ejercicios');

var app = express();

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', index);
app.use('/users', users);
app.use('/users/usuarios', usuarios);
app.use('/courses', courses);
app.use('/courses/cursos', cursos);
app.use('/course', course);
app.use('/newcourse', newcourse);
app.use('/ejercicios', ejercicios);

// CSS's Y JS's
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/node_modules/datatables/media/css')); // redirect CSS datatables
app.use('/js', express.static(__dirname + '/node_modules/datatables/media/js')); // redirect JS datatables

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000);
module.exports = app;
