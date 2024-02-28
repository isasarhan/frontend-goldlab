import axios from "axios";
const url = "https://gold-lab-backend.onrender.com/api/customers";

export const getCustomers = async () => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addCustomer = async (customer) => {
  try {
    const res = await axios.post(url, customer);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCustomer = async (id) => {
  const url = `https://gold-lab-backend.onrender.com/api/customers/${id}`;
  const res = await axios
    .get(url)
    .catch(function (error) {
      return error
    })
    .finally(() => {});
    return res.data
};

export const updateCustomer = async(id, customer)=>{
  const url = `https://gold-lab-backend.onrender.com/api/customers/${id}`;
  let res;
  try {
    res = await axios
    .put(url, customer)
    return res
  } catch (error) {
    console.log(error);
  }
  
    
    
}
