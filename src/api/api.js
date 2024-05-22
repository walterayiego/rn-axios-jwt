import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.8.144:4000",
  headers: {
    "Content-Type": "application/json",
    // Add any other headers you need (e.g., authorization)
  },
});

api.interceptors.request.use(
  (request) => {
    console.log("Success auth:4000 req");
    return request;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response) => {
    console.log("Success auth:4000 res");
    return response;
  },
  (error) => Promise.reject(error)
);

const serv = axios.create({
  baseURL: "http://192.168.8.144:3000",
  headers: {
    "Content-Type": "application/json",
    // Add any other headers you need (e.g., authorization)
  },
});
serv.interceptors.request.use(
  (request) => {
    console.log("Request serv:3000, req then proceed");
    return request;
  },
  (error) => Promise.reject(error)
);
serv.interceptors.response.use(
  (response) => {
    console.log("Response serv:3000, req then proceed");
    return response;
  },
  (error) => Promise.reject(error)
);


export { api, serv };
