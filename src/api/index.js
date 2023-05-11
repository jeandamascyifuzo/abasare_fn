import axios from "axios";

// const BASE_URL = "http://localhost:8000/api/v1/";
const BASE_URL= "https://abasare-bn.vercel.app/api/v1/"

export const axiosRequest = axios.create({
  baseURL: BASE_URL,
});

export default axios.create({
  baseURL: BASE_URL,
});

export const refreshPage = () => {
  window.location.reload(false);
}