import { useEffect, useState } from "react";
import { Button, Text } from "react-native-paper";
import axios from "axios";

const productsUrl = "https://course-api.com/react-store-products";
const randomUserUrl = "https://randomuser.me/api";

const GlobalInstance = () => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const res = await axios(productsUrl);
      res.data && setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Text>Global instance</Text>
      <Button onPress={fetchData}>Fetch</Button>
      <Text numberOfLines={5}>
        {data ? JSON.stringify(data) : "No data Returned"}
      </Text>
    </>
  );
};
export default GlobalInstance;
