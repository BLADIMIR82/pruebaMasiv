import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { getTareas, postTareas, putTareas } from "./callsTareas";
import "../componets/frontTareas.css";

export default function FrontTareas() {
  const [tareas, setTareas] = useState();
  const [reload, setReload] = useState(false);
  const [modid, setModId] = useState();
  let form = document.getElementById("form");
  let form1 = document.getElementById("form1");

  const modificarTarea = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var dataInput = {
      fecha: data.get("Fecha"),
      estado: data.get("Estado")
    };
    putTareas(modid, dataInput);
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
    setReload(!reload);
    form.reset();
  };

  useEffect(() => {
    getTareas().then((response) => setTareas(response.data.response.tareas));
  }, [reload]);

  return (
    <div className="container-principal">
      <div className="container-form">
        <div>
          <h1>Crear Tarea</h1>
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
                      autoFocus
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
                    <TextField
                      required
                      fullWidth
                      id="Estado"
                      label="Estado"
                      name="Estado"
                      autoComplete="Estado"
                    />
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
          <h1>Modificar Tarea</h1>
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
                      required
                      type="date"
                      fullWidth
                      id="Fecha"
                      name="Fecha"
                      autoComplete="Fecha"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="Estado"
                      label="Estado"
                      name="Estado"
                      autoComplete="Estado"
                    />
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

      <div>
        <h1>Tareas</h1>
      </div>
      <div className="container-table">
        <table className="table">
          <thead>
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
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
