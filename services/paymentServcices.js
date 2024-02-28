import axios from "axios";
const url = "https://gold-lab-backend.onrender.com/api/payments";

export const addPayment = async (payment) => {
  try {
    const res = await axios.post(url, payment);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPaymentByCustomerIdBetweenDates = async(input)=>{
  const url = "https://gold-lab-backend.onrender.com/api/payments/dates";

  try {
    const res  = (await axios.get(url,{params:input})).data
    return res
  } catch (error) {
      return error
  }
  }