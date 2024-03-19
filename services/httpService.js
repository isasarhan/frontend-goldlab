import axios from "axios";

const instance = axios.create({
    baseURL :"https://localhost:4000/api/",
    timeout:30000,
    timeoutErrorMessage:"Time out !"
})
export default instance