import React from "react";
import { View, Text, StyleSheet, ProgressViewIOSComponent } from "react-native";
import Colors from "../constants/Colors";
import TitleText from './TitleText';

const Header = (props: { title: string }) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.headerText}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "black",
    fontSize: 18,
    fontFamily: "open_sans_bold",
  },
});

export default Header;
