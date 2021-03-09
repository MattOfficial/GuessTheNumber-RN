// Import predefined Components
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Import custom Components
import Header from "./components/Header";

// Import Screens
import StartGameScreen from "./screen/StartGameScreen";
import GameScreen from './screen/GameScreen';
import GameOverScreen from './screen/GameOverScreen';

export default function App() {
  const [userNo, setUserNo] = useState(NaN);
  const [guessRounds, setGuessRounds] = useState(0);

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNo(NaN);
  }

  const gameOverHandler = (rounds: number) => {
    setGuessRounds(rounds);
  }

  const startGameHandler = (selectedNumber: number) => {
    setUserNo(selectedNumber);
    setGuessRounds(0);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (!isNaN(userNo) && guessRounds === 0) {
    content = <GameScreen userChoise={userNo} onGameOver={gameOverHandler} />;

  } else if (guessRounds > 0) {
    content = <GameOverScreen userNumber={userNo} guessNumber={guessRounds} onRestart={configureNewGameHandler} />
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
