import React, { useEffect, useState } from "react";
import { getTareas, postTareas, putTareas, deleteTareas } from "./callsTareas";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

    
const Table = (setModId ) =>{
    //hooks//
    const [tareas, setTareas] = useState();
    const [reload, setReload] = useState(false);
    

    useEffect(() => {
        getTareas().then((response) => setTareas(response.data.response.tareas));
      }, [reload]);
    //var//
    const MySwal = withReactContent(Swal);
   //functions// 
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
  
      return (

       <div className="container-table">
        <table className="table border-primary ">
          <thead className= "table-primary">
            <tr>
              <th scope="col">Creador</th>
              <th scope="col">Fecha </th>
              <th scope="col">Tarea </th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          {tareas?.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td>{item.creador}</td>
                <td><b>{item.fecha}</b></td>
                <td>{item.tarea}</td>
                <td><b>{item.estado}</b></td>
              </tr>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setModId(item._id)}

              >
                Modificar
              </button>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => eliminarTarea(item._id)} 
              >
                Eliminar
              </button>
            </tbody>
          ))}
        </table>
      </div>
    )

}
export default Table