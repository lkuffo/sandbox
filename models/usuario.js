var mongoose = require('mongoose');

var mongoDB = 'mongodb://lkuffo2:sandbox1@ds153699.mlab.com:53699/daw_sandbox';
mongoose.connect(mongoDB);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

//Crea el esquema usarios
var schema = new Schema({
    correo: String,
    password: String,
    rol: String,
    tipo_identif: String,
    indentif: String,
    nombres: String,
    apellidos: String,
    carrera: String
},
{
    collection: 'Users'
});

var Usuario = mongoose.model("Usuario", schema);

module.exports = Usuario;
