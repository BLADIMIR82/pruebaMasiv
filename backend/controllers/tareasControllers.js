const Tareas = require("../models/tareas");
    
const tareasControllers = {

  getTareas: async (req, res) => {
    let tareas;
    let error = null;
    try {
      tareas = await Tareas.find();
    }catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : { tareas },
      success: error ? false : true,
      error: error,
    });
  },
                           
  postTareas: async (req, res) => {
    // console.log(req.body);
    const { creador,  fecha, tarea, estado } = req.body.dataInput;
    await new Tareas({ creador,  fecha, tarea, estado })
      .save()
      .then((respuesta) => res.json({ respuesta }));
  },
  
  putTareas: async (req, res) => {
    const id = req.params.id;
    const tarea = req.body.dataInput;

    await Tareas.findOneAndUpdate({ _id: id }, tarea).then(
      (respuesta) => res.json({ respuesta })
    );
    
  }, 
 
  deleteTareas: async (req, res) => {
    const id = req.params.id;
    await Tareas.findOneAndDelete({ _id: id }).then((respuesta) =>
      res.json({ respuesta })
    );
  },
};
           
module.exports = tareasControllers;
    