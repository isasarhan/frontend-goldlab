import axios from "axios";
const url = "https://gold-lab-backend.onrender.com/api/invoices";

export const addInvoice = async (invoice) => {
  try {
    const res = await axios.post(url, invoice);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getInvoicesByCustomerId = async (id) => {
  const url = `https://gold-lab-backend.onrender.com/api/invoices/customers/${id}`;
  try {
    const res = (await axios.get(url)).data;
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteInvoiceById = async (id) => {
  const url = `https://gold-lab-backend.onrender.com/api/invoices/${id}`;
  try {
    const res = (await axios.delete(url));
    return res;
  } catch (error) {
    return error;
  }
};
