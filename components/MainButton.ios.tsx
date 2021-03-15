import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";

export interface IMainButtonProps {
  children: any;
  onPress: Function;
  style?: ViewStyle;
}

export default function MainButton(props: IMainButtonProps) {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity activeOpacity={0.6} onPress={() => props.onPress()}>
        <View style={{ ...styles.btnView, ...props.style }}>
          <Text style={styles.btnText}>{props.children}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  btnView: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  btnText: {
    color: "white",
    fontFamily: "open_sans",
    fontSize: 18,
  },
});
