import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

export interface IBodyTextProps {
  children: any;
  style?: TextStyle;
}

export default function BodyText(props: IBodyTextProps) {
  return (
    <Text style={{ ...props.style, ...styles.text }}>{props.children}</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "open_sans",
  },
});
