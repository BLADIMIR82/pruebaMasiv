const Router = require('express').Router();

const tareasControllers = require("../controllers/tareasControllers");
const { getTareas,  postTareas,  putTareas}=tareasControllers

Router.route("/alltareas").get(getTareas).post(postTareas);

Router.route("/alltareas/:id")
  .put(putTareas)
 
   

module.exports = Router  