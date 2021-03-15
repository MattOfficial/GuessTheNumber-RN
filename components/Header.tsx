import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../constants/Colors";
import TitleText from "./TitleText";

const Header = (props: { title: string }) => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <TitleText style={styles.headerText}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIOS: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: "transparent",
    borderBottomWidth: 0,
  },
  headerText: {
    color: Platform.OS === "android" ? "white" : Colors.primary,
    fontSize: 18,
    fontFamily: "open_sans_bold",
  },
});

export default Header;
