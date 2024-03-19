import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/auth/",
  // baseURL :"https://gold-lab-backend.onrender.com/api/auth/",
  timeout: 30000,
  timeoutErrorMessage: "Time out !",
});

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log(error);
    
  }
  return Promise.reject(error);
});

export const registerUser = async (file) => {
  
    const res = await axios.post("https://gold-lab-backend.onrender.com/api/auth/register", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  
};

export const loadImage = async (imageUrl) => {
  return await axios
    .get(`https://gold-lab-backend.onrender.com/uploads/${imageUrl}`, { responseType: "blob" })
    .then((response) => {
      const objectURL = URL.createObjectURL(response.data);
      return objectURL;
    })
    .catch((error) => {
      console.error("There was a problem fetching the image:", error);
    });
};

export const loginUser = async (user) => {
  let res = await axios.post("https://gold-lab-backend.onrender.com/api/auth/login", user)
    return res
};
