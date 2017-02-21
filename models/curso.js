var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Crea el esquema usarios
var schema = new Schema({
    paralelo: Number,
    profesor: String,
    estudiantes: [String]
},
{
    collection: 'Courses'
});

var Curso = mongoose.model("Curso", schema);

module.exports = Curso;
