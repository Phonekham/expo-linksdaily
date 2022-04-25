import React, { useState } from "react";
import { View } from "react-native";
import Text from "@kaloraat/react-native-text";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CircleLogo from "../components/auth/CircleLogo";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import { API } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState("ryan@gmail.com");
  const [password, setPassword] = useState("rrrrrr");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    // console.log("SIGNINREQUEST => ", name, email, password);
    try {
      const { data } = await axios.post(`${API}/signin`, {
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        setLoading(false);
        console.log("SIGN IN SUCCESS => ", data);
        alert("Sign in successful");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const loadFromAsyncStorage = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log(data);
  };
  loadFromAsyncStorage();
  return (
    <KeyboardAwareScrollView
      contentCotainerStyle={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View style={{ marginVertical: 100 }}>
        <CircleLogo />
        <Text title center>
          Sign In
        </Text>

        <UserInput
          name="EMAIL"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <UserInput
          name="PASSWORD"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoComplteType="password"
        />

        <SubmitButton
          title="Sign In"
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <Text small center>
          Not yet registered?{" "}
          <Text onPress={() => navigation.navigate("Signup")} color="#ff2222">
            Sign Up
          </Text>
        </Text>

        <Text small center color="orange" style={{ marginTop: 10 }}>
          Forgot Password?
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signin;
