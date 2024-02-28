import axios from "axios";
const url = "https://gold-lab-backend.onrender.com/api/orders";


export const addOrder = async (order) => {
  try {
    const res = await axios.post(url, order);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteOrderById = async (id) => {
  const url = `https://gold-lab-backend.onrender.com/api/orders/${id}`;
  try {
    const res = (await axios.delete(url));
    return res;
  } catch (error) {
    return error;
  }
};
