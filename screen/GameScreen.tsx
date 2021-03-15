import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
// The editor might lose its head over not finding the perfect component, but nothing to worry about.
// RN will automatically handle this in the background.
import MainButton from "../components/MainButton";

import BodyText from "../components/BodyText";
import Colors from "../constants/Colors";

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

const renderListItem = (guess: number, index: number) => (
  <View key={guess} style={styles.listItem}>
    <BodyText>#{index}</BodyText>
    <BodyText>{guess}</BodyText>
  </View>
);

const GameScreen = ({ userChoise, onGameOver }: IGameScreenProps) => {
  const initGuess = generateRandomNumber(1, 100, userChoise);

  const [curGuess, setCurGuess] = useState(initGuess);
  const [rounds, setRounds] = useState(0);
  const [pastGuesses, setPastGuess] = useState<number[]>([initGuess]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  const curLow = useRef(1);
  const curHigh = useRef(100);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get("window").width);
      setAvailableDeviceHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

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
    const nextGuess = generateRandomNumber(
      curLow.current,
      curHigh.current,
      curGuess
    );
    setCurGuess(nextGuess);
    setRounds((rounds) => rounds + 1);
    setPastGuess((curPastGuess) => [nextGuess, ...curPastGuess]);
  };

  let listContainerStyle = styles.listContainer;

  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (Dimensions.get("window").height < 500) {
    return (
      <View style={styles.screen}>
        <BodyText>Opponent's guess: </BodyText>
        <View style={styles.landscapeView}>
          <MainButton
            style={styles.LowerBtn}
            onPress={nextGuessHandler.bind(this, Choice.LOWER)}
          >
            <Ionicons name="md-remove" color="white" size={24} />
          </MainButton>
          <NumberContainer>{curGuess}</NumberContainer>

          <MainButton onPress={nextGuessHandler.bind(this, Choice.HIGHER)}>
            <Ionicons name="md-add" color="white" size={24} />
          </MainButton>
        </View>
        <View style={listContainerStyle}>
          <ScrollView contentContainerStyle={styles.listContent}>
            {pastGuesses.map((guess, index) =>
              renderListItem(guess, pastGuesses.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <BodyText>Opponent's guess: </BodyText>
      <NumberContainer>{curGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton
          style={styles.LowerBtn}
          onPress={nextGuessHandler.bind(this, Choice.LOWER)}
        >
          <Ionicons name="md-remove" color="white" size={24} />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, Choice.HIGHER)}>
          <Ionicons name="md-add" color="white" size={24} />
        </MainButton>
      </Card>
      <View style={listContainerStyle}>
        <ScrollView contentContainerStyle={styles.listContent}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
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
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 300,
    maxWidth: "80%",
  },
  LowerBtn: {
    backgroundColor: Colors.accent,
  },
  listContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    justifyContent: "space-around",
    flexDirection: "row",
    width: Dimensions.get("window").width > 500 ? "60%" : "95%",
  },
  list: {
    flex: 1,
    width: "80%",
  },
  listContainer: {
    flex: 1,
    width: "60%",
  },
  listContainerBig: {
    flex: 1,
    width: "80%",
  },
  landscapeView: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center",
  },
});

export default GameScreen;
