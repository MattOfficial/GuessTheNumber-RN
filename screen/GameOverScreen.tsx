import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Card from "../components/Card";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";

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
    <View style={styles.screen}>
      <Card style={styles.card}>
        <TitleText>Game Over!</TitleText>
        <BodyText>Total no. of guesses: {guessNumber}</BodyText>
        <BodyText>The number was: {userNumber}</BodyText>
        <Button title="Play again" onPress={() => onRestart()} />
      </Card>
    </View>
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
});
