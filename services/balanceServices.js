import axios from "axios";
const url = "https://gold-lab-backend.onrender.com/api/balances";

export const addBalance = async (balance) => {
  try {
    const res = await axios.post(url, balance);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getBalance = async (id) => {
  const url = `https://gold-lab-backend.onrender.com/api/balances/${id}`;
  const res = await axios
    .get(url)
    .catch(function (error) {
      return error
    })
    .finally(() => {});
    return res.data
};
export const updateBalance = async(id, balance)=>{
    const url = `https://gold-lab-backend.onrender.com/api/balances/${id}`;
    var res;
    try {
      res = await axios
      .put(url, balance)
    } catch (error) {
      console.log(error);
    } finally{
        return res.data;
    }
}

export const getBalances = () =>{
  const res = axios.get(url).catch((error)=>{
    return error
  })
  return res
}
export const getBalanceByCustomerID = async(id)=>{
    const url = `https://gold-lab-backend.onrender.com/api/balances/customer/${id}`;
    const res = await axios
      .get(url)
      .catch(function (error) {
        return error
      })
      .finally(() => {});
      return res.data
}