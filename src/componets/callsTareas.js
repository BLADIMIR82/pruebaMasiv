import axios from "axios";

export const getTareas = async () => {
  try {
    let data = await axios.get(`http://localhost:4001/api/alltareas`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const postTareas = async (dataInput) => {
  console.log(dataInput);
  try {
    let data = await axios.post(`http://localhost:4001/api/alltareas`, {
      dataInput,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const putTareas = async (id, dataInput) => {
  console.log(id, dataInput);
  try {
    let data = await axios.put(`http://localhost:4001/api/alltareas/${id}`, {
      dataInput,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const  deleteTareas = async (id) => {
    try {
        let data = await axios.delete(`http://localhost:4001/api/alltareas/${id}`)
        return data
    }
    catch (error) {
        throw error
    }
}
