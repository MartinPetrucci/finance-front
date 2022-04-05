import axios from "axios";
const API = "http://localhost:3001";
const TESTING_USER_ID = "62310f4c8a254e63fd7b1bc9";

export const getDollarRate = async () => {
  const endpoint = "https://api-dolar-argentina.herokuapp.com/api/evolucion/dolarblue"
  const response = await axios.get(endpoint)
  return response.data.meses
}

export const getItems = async (param) => {
  console.log('get items')
  const response = await axios.get(`${API}/items?userId=${TESTING_USER_ID}`);
  return response.data
};

export const addItem = async (item) => {
  const response = await axios.post(`${API}/items`,item)
  return response.data
}

export const deleteItem = async (itemId) => {
  const response = await axios.delete(`${API}/items?itemId=${itemId}`)
  return response.data
}

