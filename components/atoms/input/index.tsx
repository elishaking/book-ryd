import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface TProps extends TextInputProps {}

export const Input = (props: TProps) => {
  return <TextInput style={style.input} {...props} />;
};

const style = StyleSheet.create({
  input: {
    width: "100%",
    paddingVertical: 7,
    paddingHorizontal: 20,
    backgroundColor: "#ececec",
    borderRadius: 30,
  },
});
