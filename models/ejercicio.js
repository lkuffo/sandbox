var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Crea el esquema del ejercicio
var ejercicioSchema = new Schema({
    titulo: String,
    descripcion: String,
    datosEntrada: String,
    datosSalida: String,
    etiquetas: String,
    nombres: String,
    nivelDificultad: String
},
{
    collection: 'Ejercicios'
});


//mongoose.model("Ejercicio", ejercicioSchema);
var Ejercicio = mongoose.model("Ejercicio", ejercicioSchema);

//Ejercicio.insert({titulo: 'Suma', descripcion: 'suma de dos digitos', datosEntrada: '5+2', datosSalida:'10', etiquetas: 'numpy', nombres:'nombreUno', nivelDificultad:'Dificil'})

module.exports = Ejercicio;