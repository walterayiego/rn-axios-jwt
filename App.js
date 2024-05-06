import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api, serv } from "./api/api";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);

  const getUser = async () => {
    if (!user?.accessToken) return;
    try {
      const response = await serv.get("/user-logged-in", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setLoggedUser(response.data.username);
    } catch (error) {
      console.error(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await api.get("/users");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const logIn = async () => {
    try {
      const res = await api.post("/login", {
        username: "Jane",
      });
      setUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getNewToken = async () => {
    try {
      const res = await api.post("/getnewToken", {
        token: user.refreshToken,
      });
      setUser((prev) => ({ ...prev, accessToken: res.data.accessToken }));
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={getUser} style={styles.btn}>
        <Text>Get user Logged</Text>
      </TouchableOpacity>

      <Text> User Logged : {loggedUser ? loggedUser : "No user"}</Text>

      <TouchableOpacity onPress={getUsers} style={styles.btn}>
        <Text>Get Users</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logIn} style={styles.btn}>
        <Text className="bg-black">Log In</Text>
      </TouchableOpacity>
      <View className="">
        <Text> AccessToken : {user ? user.accessToken : "No user"}</Text>
        <Text> RefreshToken : {user ? user.refreshToken : "No user"}</Text>
      </View>

      <TouchableOpacity onPress={getNewToken} style={styles.btn}>
        <Text className="bg-black">Get New Token</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: 300,
    borderBlockColor: "black",
    borderWidth: 1,
    margin: 10,
  },
});