import axios from "axios";

const baseURL = "https://gold-lab-backend.onrender.com/api/supplier/";
//const  baseURL :"https://gold-lab-backend.onrender.com/api/auth/",

export const addSupplier = async (supplier) => {
  return await axios.post(baseURL, supplier).then((res)=>{
    return res.data
  }).catch((error)=>{
    console.log(error);
  });
};

export const getSuppliers = async () => {
  return await axios.get(baseURL).then((res)=>{
    return res.data
  }).catch((error)=>{
    console.log(error);
  });
};

