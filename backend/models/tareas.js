const mongoose = require('mongoose')
const tareasSchema = new mongoose.Schema({
  creador: { type: String, required: true },
  fecha: { type: String, required: true },
  estado: { type: String, required: true },
});
const Tareas = mongoose.model("tareas", tareasSchema);
module.exports = Tareas;
 