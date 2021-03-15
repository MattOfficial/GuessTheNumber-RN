// Import predefined Components
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

// Import custom Components
import Header from "./components/Header";

// Import Screens
import StartGameScreen from "./screen/StartGameScreen";
import GameScreen from "./screen/GameScreen";
import GameOverScreen from "./screen/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    open_sans: require("./assets/fonts/OpenSans-Regular.ttf"),
    open_sans_bold: require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNo, setUserNo] = useState(NaN);
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err: Error) => console.log(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNo(NaN);
  };

  const gameOverHandler = (rounds: number) => {
    setGuessRounds(rounds);
  };

  const startGameHandler = (selectedNumber: number) => {
    setUserNo(selectedNumber);
    setGuessRounds(0);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (!isNaN(userNo) && guessRounds === 0) {
    content = <GameScreen userChoise={userNo} onGameOver={gameOverHandler} />;
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        userNumber={userNo}
        guessNumber={guessRounds}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screenView}>
      <Header title="Guess a number:" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
});
