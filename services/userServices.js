import axios from "axios";


export const registerUser = async (user) => {
    const url = "https://gold-lab-backend.onrender.com/api/auth/register";

    try {
      const res = await axios.post(url, user);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

export const loginUser = async (user) => {
    const url = "https://gold-lab-backend.onrender.com/api/auth/login";

    try {
      const res = await axios.post(url, user);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };