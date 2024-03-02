import axios from "axios";
export const authAPI = axios.create({
  baseURL: "https://majna.onrender.com/",
});
