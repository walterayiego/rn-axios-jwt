import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.8.144:4000",
  headers: {
    "Content-Type": "application/json",
    // Add any other headers you need (e.g., authorization)
  },
});

const serv = axios.create({
  baseURL: "http://192.168.8.144:3000",
  headers: {
    "Content-Type": "application/json",
    // Add any other headers you need (e.g., authorization)
  },
});

export { api, serv };