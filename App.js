import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Keyboard,
} from "react-native";
import { api, serv } from "./src/api/api.js";
import { useState } from "react";
import { Dialog, Portal, Provider, Text } from "react-native-paper";

export default function App() {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);

  React.useEffect(() => {
    if (error) {
      setVisible(true);
      console.log("Message : ", error?.message);
      console.log("Error : ", error);
    }
  }, [error]);

  React.useEffect(() => {
    console.log(user, "useEffect User");
  }, [user]);

  const getUser = async () => {
    if (!user?.accessToken) {
      console.log("No user logged in");
      return;
    }
    if (loggedUser) {
      console.log("User already logged in");
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
      setError(error);
      setLoggedUser("No user logged in");
    }
  };

  const getUsers = async () => {
    try {
      
      const response = await api.get("/users");
      const username = response.data.map((user) => user.username);
      setAllUsers(username);
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  const logIn = async () => {
    try {
      const res = await api.post("/login", {
        username: name,
      });
      setUser(res.data);
      Keyboard.dismiss();
    } catch (error) {
      setError(error);
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
      setError(error);
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
        console.log("User logged out");
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <TouchableOpacity onPress={getUser} style={styles.btn}>
          <Text style={{ color: "white" }}>Get User Logged</Text>
        </TouchableOpacity>
        {loggedUser && <Text>User Logged: {loggedUser}</Text>}
        <TouchableOpacity onPress={getUsers} style={styles.btn}>
          <Text style={{ color: "white" }}>Get Users</Text>
        </TouchableOpacity>

        <Text>{allUsers?.join(", ")}</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            onChangeText={(text) => setName(text)}
            value={name}
            style={styles.input}
          />
          <TouchableOpacity onPress={logIn} style={styles.logBtn}>
            <Text>Log In</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>AccessToken: {user ? user.accessToken : "No user"}</Text>
          <Text>RefreshToken: {user ? user.refreshToken : "No user"}</Text>
        </View>
        <TouchableOpacity onPress={getNewToken} style={styles.btn}>
          <Text style={{ color: "white" }}>Get New Token</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logOut} style={styles.btn}>
          <Text style={{ color: "white" }}>Log Out</Text>
        </TouchableOpacity>
        {/* Add your ErrorDialog component here */}
      </View>
      <StatusBar style="auto" />
      <ErrorDialog error={error} visible={visible} setVisible={setVisible} />
    </Provider>
  );
}

const ErrorDialog = ({ error, children, visible, setVisible }) => {
  const hideDialog = () => setVisible(false);

  return (
    <Portal
      theme={{
        colors: {
          // backdrop: backdrop || "#00000099",
          // background: colors.darkGreyLight,
        },
      }}
    >
      <Dialog
        visible={visible}
        style={{
          alignSelf: "center",
          width: "80%",
        }}
        onDismiss={hideDialog}
      >
        <Dialog.Title>Error</Dialog.Title>

        <Dialog.Content>
          <View>
            <Text>{error?.message}</Text>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: 300,
    borderWidth: 1,
    margin: 10,
    backgroundColor: "black",
    alignItems: "center",
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    height: "7%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 0.8,
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 10,
  },
  logBtn: {
    borderWidth: 1,
    height: "100%",
    borderBlockColor: "green",
    backgroundColor: "#00FF0020",
    alignItems: "center",
    justifyContent: "center",
    // padding: 10,
  },
});
