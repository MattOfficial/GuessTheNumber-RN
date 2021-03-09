import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = (props: {
  style?: any;
  autoCapitalize?: any;
  blurOnSubmit?: any;
  autoCorrect?: any;
  keyboardType?: any;
  maxLength?: any;
  onChangeText?: any;
  value?: string;
}) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Input;
