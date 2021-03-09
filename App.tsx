import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screen/StartGameScreen";
import GameScreen from './screen/GameScreen';

export default function App() {
  const [userNo, setUserNo] = useState(NaN);

  const startGameHandler = (selectedNumber: number) => {
    setUserNo(selectedNumber);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (!isNaN(userNo)) {
    content = <GameScreen userChoise={userNo} />;

  }

  return (
    <View style={styles.screenView}>
      <Header title="Guess a number:" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
});
