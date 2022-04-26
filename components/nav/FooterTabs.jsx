import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export const Tab = ({ name, text }) => (
  <TouchableOpacity>
    <>
      <Text>
        <FontAwesome5
          size={25}
          name={name}
          style={{ marginBottom: 3, alignSelf: "center" }}
        />{" "}
        {text}
      </Text>
    </>
  </TouchableOpacity>
);

export default function FooterTabs() {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}
    >
      <Tab text="Home" name="home" />
      <Tab text="Post" name="plus-square" />
      <Tab text="Links" name="list-ol" />
      <Tab text="Account" name="user" />
    </View>
  );
}
