import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { getTareas, postTareas, putTareas, deleteTareas } from "./callsTareas";
import "../componets/frontTareas.css";

export default function FrontTareas() {

  const [tareas, setTareas] = useState();
  const [reload, setReload] = useState(false);
  const [modid, setModId] = useState();

  let form = document.getElementById("form");
  let form1 = document.getElementById("form1");
  const MySwal = withReactContent(Swal);

  const modificarTarea = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var dataInput = {
      fecha: data.get("Fecha"),
      estado: data.get("Estado"),
    };
    putTareas(modid, dataInput);
    MySwal.fire({
      position: "top-start",
      icon: "success",
      title: "La tarea se ha modificado",
      showConfirmButton: false,
      timer: 1500,
    });
    setReload(!reload);
    form1.reset();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    var dataInput = {
      creador: data.get("Creador"),
      fecha: data.get("Fecha"),
      estado: data.get("Estado"),
    };

    postTareas(dataInput);
    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Se ha creado una nueva tarea",
      showConfirmButton: false,
      timer: 1500,
    });
    setReload(!reload);
    form.reset();
  };
  function eliminarTarea (id){
    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "La tarea se ha eliminado",
      showConfirmButton: false,
      timer: 1500,
    });
    deleteTareas(id);
    setReload(!reload)
}

  useEffect(() => {
    getTareas().then((response) => setTareas(response.data.response.tareas));
  }, [reload]);

  return (
    <div className="container-principal">
      <div className="title-principal">
        <h1>Modulo De Tareas</h1>
      </div>
      <div className="container-form">
        <div>
          <h2>Crear Tarea</h2>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
                id="form"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="Creador"
                      name="Creador"
                      required
                      fullWidth
                      id="Creador"
                      label="Creador"
                      
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      type="date"
                      fullWidth
                      id="Fecha"
                      name="Fecha"
                      autoComplete="Fecha"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="Estado"
                      name="Estado"
                    >
                      <option selected >Seleccione Estado</option>
                      <option value="Iniciado">Iniciado</option>
                      <option value="En Proceso">En Proceso</option>
                      <option value="Finalizado">Finalizado</option>
                    </select>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Enviar
                </Button>
              </Box>
            </Box>
          </Container>
        </div>
        <div>
          <h2>Modificar Tarea</h2>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                noValidate
                onSubmit={modificarTarea}
                sx={{ mt: 3 }}
                id="form1"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      type="date"
                      fullWidth
                      id="Fecha"
                      name="Fecha"
                      autoComplete="Fecha"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <select
                      className="form-select"
                      aria-label="Default select example"
                      id="Estado"
                      name="Estado"
                    >
                      <option selected>Seleccione Estado</option>
                      <option value="Iniciado">Iniciado</option>
                      <option value="En Proceso">En Proceso</option>
                      <option value="Finalizado">Finalizado</option>
                    </select>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Enviar
                </Button>
              </Box>
            </Box>
          </Container>
        </div>
      </div>

      <div className="container-table">
        <table className="table border-primary ">
          <thead className= "table-primary">
            <tr>
              <th scope="col">Creador</th>
              <th scope="col">Fecha </th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          {tareas?.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td>{item.creador}</td>
                <td>{item.fecha}</td>
                <td>{item.estado}</td>
              </tr>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setModId(item._id)}
              >
                Modificar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => eliminarTarea(item._id)}
              >
                Eliminar
              </button>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
