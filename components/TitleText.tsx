import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

export interface ITitleTextProps {
  children: any;
  style?: TextStyle;
}

export default function TitleText(props: ITitleTextProps) {
  return (
    <Text style={{ ...props.style, ...styles.title }}>{props.children}</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "open_sans_bold",
  },
});
