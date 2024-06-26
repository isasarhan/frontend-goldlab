import axios from "axios";

const baseURL = "https://gold-lab-backend.onrender.com/api/supply/";
// const baseURL :"https://gold-lab-backend.onrender.com/api/auth/",

export const addSupply = async (supply) => {
  return await axios
    .post(baseURL, supply)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
export const getSuppliesByDates = async (input) => {
  return await axios
    .get(`https://gold-lab-backend.onrender.com/api/supply/dates`, { params: input })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
export const getSupplies = async () => {
  return await axios
    .get(baseURL)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
