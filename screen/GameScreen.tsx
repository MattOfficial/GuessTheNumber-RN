import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";

import BodyText from "../components/BodyText";
import Colors from '../constants/Colors'

export interface IGameScreenProps {
  userChoise: number;
  onGameOver: Function;
}

enum Choice {
  LOWER = "Lower",
  HIGHER = "Higher",
}

const generateRandomNumber = function (
  min: number,
  max: number,
  exclude: number
): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = ({ userChoise, onGameOver }: IGameScreenProps) => {
  const [curGuess, setCurGuess] = useState(
    generateRandomNumber(1, 100, userChoise)
  );
  const [rounds, setRounds] = useState(0);

  const curLow = useRef(1);
  const curHigh = useRef(100);

  useEffect(() => {
    if (curGuess === userChoise) {
      onGameOver(rounds);
    }
  }, [curGuess, userChoise, onGameOver]);

  const nextGuessHandler = (dir: Choice) => {
    if (
      (dir === Choice.LOWER && curGuess < userChoise) ||
      (dir === Choice.HIGHER && curGuess > userChoise)
    ) {
      Alert.alert("Don't lie!", "This is misleading and you know it.", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (dir === Choice.LOWER) {
      curHigh.current = curGuess;
    }
    if (dir === Choice.HIGHER) {
      curLow.current = curGuess + 1;
    }
    setCurGuess(
      generateRandomNumber(curLow.current, curHigh.current, curGuess)
    );
    setRounds((rounds) => rounds + 1);
  };

  return (
    <View style={styles.screen}>
      <BodyText>Opponent's guess: </BodyText>
      <NumberContainer>{curGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton style={styles.LowerBtn} onPress={nextGuessHandler.bind(this, Choice.LOWER)}>
          <Ionicons name="md-remove" color="white" size={24} />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, Choice.HIGHER)}>
          <Ionicons name="md-add" color="white" size={24} />
        </MainButton>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
  LowerBtn: {
      backgroundColor: Colors.accent,
  }
});

export default GameScreen;
