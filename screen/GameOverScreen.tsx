import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
// The editor might lose its head over not finding the perfect component, but nothing to worry about.
// RN will automatically handle this in the background.
import MainButton from "../components/MainButton";

export interface IGameOverScreenProps {
  userNumber: number;
  guessNumber: number;
  onRestart: Function;
}

export default function GameOverScreen({
  userNumber,
  guessNumber,
  onRestart,
}: IGameOverScreenProps) {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Card style={styles.card}>
          <Image
            style={styles.image}
            source={require("../assets/success.png")}
          />
          <TitleText>Game Over!</TitleText>
          <View style={styles.resultContainer}>
            <BodyText style={styles.resultText}>
              Your phone needed{" "}
              <Text style={styles.highlight}>{guessNumber}</Text> rounds to
              guess the number{" "}
              <Text style={styles.highlight}>{userNumber}</Text>
            </BodyText>
          </View>

          <MainButton onPress={() => onRestart()}>RESTART</MainButton>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  card: {
    width: 300,
    maxWidth: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    padding: 10,
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  resultText: {
    textAlign: "center",
    fontSize: 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open_sans_bold",
  },
});
