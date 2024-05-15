import { useEffect } from "react";
import axios from "axios";

const url = "https://course-api.com/react-store-products";
const url2 = "http://localhost:4000";
export const api = axios.create({
  baseURL: url2,
  headers: {
    "Content-Type": "application/json",
    // Add any other headers you need (e.g., authorization)
  },
});

const FirstRequest = () => {
  const fetchData = async () => {
    try {
      const { data } = await api.get("/users");
      console.log(data);
      
      // const resp = await axios.get(url, {
      //   headers: {
      //     Accept: "application/json",
      //   },
      // });
      // console.log(resp.data, "data");
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };

  return (
    <div className="m-3">
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};

export default FirstRequest;
