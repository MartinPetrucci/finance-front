import axios from "axios";
const API = "http://localhost:3001";
const TESTING_USER_ID = "62310f4c8a254e63fd7b1bc9";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGVzZGUgYXJjIiwiaWQiOiI2MjU0Y2E2Y2YwNjMzNThjYTQ1YzY4NWYiLCJpYXQiOjE2NDk3MzEyNDJ9.k9iB2u-M8DdfxQ34f-U-XdMc-kSk0-AV2jAAjb4D7Bs";

export const logIn = async (userData) => {
  try {
    const response = await axios.post(`${API}/users/login`, userData);
    return response.data;
  } catch ({ response }) {
    throw new Error(response.data.message);
  }
};

export const getDollarRate = async () => {
  const endpoint =
    "https://api-dolar-argentina.herokuapp.com/api/evolucion/dolarblue";
  const response = await axios.get(endpoint);
  return response;
};

export const getItems = async (param) => {
  console.log("get items");
  const response = await axios.get(`${API}/items?userId=${TESTING_USER_ID}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return response.data;
};

export const addItem = async (item) => {
  const response = await axios.post(`${API}/items`, item);
  return response.data;
};

export const deleteItem = async (itemId) => {
  const response = await axios.delete(`${API}/items?itemId=${itemId}`);
  return response.data;
};

export const updateItem = async (itemId, updatedItem) => {
  const response = await axios.put(
    `${API}/items?itemId=${itemId}`,
    updatedItem
  );
  return response.data;
};
