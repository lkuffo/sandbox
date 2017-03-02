var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Crea el esquema usarios
var schema = new Schema({
    matricula: String,
    insignia: String,
    puntaje: Number,
    ej_resueltos: [{
        id: String,
        fecha_res: Number
    }]
},
{
    collection: 'Estudiantes'
});

var Estudiante = mongoose.model("Estudiante", schema);

module.exports = Estudiante;