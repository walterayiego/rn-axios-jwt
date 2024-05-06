import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api, serv } from "./api/api";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);

  const getUser = async () => {
    if (!user?.accessToken) {
      console.log("No user logged in");
      return;
    }
    try {
      const response = await serv.get("/user-logged-in", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      setLoggedUser(response.data[0].username);
    } catch (error) {
      console.error(error);
      setLoggedUser("No user logged in");
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
    } catch (error) {
      console.error(error);
    }
    console.log(user);
  };

  const logOut = async () => {
    try {
      const res = await api.delete("/logout", {
        data: {
          token: user.refreshToken,
        },
      });
      console.log(res.data, "log out");
      if (res.data.loggedOut == true) {
        setUser(null);
        setLoggedUser(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={getUser} style={styles.btn}>
        <Text>Get user Logged</Text>
      </TouchableOpacity>
      {loggedUser && <Text> User Logged : {loggedUser} </Text>}
      <TouchableOpacity onPress={getUsers} style={styles.btn}>
        <Text>Get Users</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logIn} style={styles.btn}>
        <Text className="bg-black">Log In</Text>
      </TouchableOpacity>
      <View className="">
        <Text> AccessToken : {user ? user.accessToken : "No user"}</Text>
        <Text />
        <Text> RefreshToken : {user ? user.refreshToken : "No user"}</Text>
      </View>

      <TouchableOpacity onPress={getNewToken} style={styles.btn}>
        <Text className="bg-black">Get New Token</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logOut} style={styles.btn}>
        <Text className="bg-black">Log Out</Text>
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
