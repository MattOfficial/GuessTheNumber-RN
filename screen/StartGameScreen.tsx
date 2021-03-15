import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
// The editor might lose its head over not finding the perfect component, but nothing to worry about.
// RN will automatically handle this in the background.
import MainButton from "../components/MainButton";

const StartGameScreen = (props: { onStartGame: any }) => {
  const [enteredVal, setEnteredVal] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedVal, setSelectedVal] = useState("");
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };

    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const numberInputHandler = (inputText: String) => {
    setEnteredVal(inputText.replace(/[^0-9]/g, ""));
  };

  const resetHandler = () => {
    setEnteredVal("");
    setConfirmed(false);
  };

  const submitHandler = () => {
    const chosenNo = parseInt(enteredVal);
    if (chosenNo <= 0 || chosenNo > 99 || isNaN(chosenNo)) {
      Alert.alert(
        "Invalid input!",
        "Input should be an integer between 1 and 99, including 1 and 99.",
        [{ text: "ok", style: "destructive", onPress: resetHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedVal(enteredVal);
    setEnteredVal("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected:</BodyText>
        <NumberContainer>{selectedVal}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(parseInt(selectedVal))}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a new game!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText style={styles.text}>Select a number: </BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredVal}
              />
              <View style={styles.buttonContainer}>
                <View style={{ ...styles.buttons, width: buttonWidth }}>
                  <Button
                    title="Reset"
                    onPress={resetHandler}
                    color={Colors.accent}
                  />
                </View>
                <View style={{ ...styles.buttons, width: buttonWidth }}>
                  <Button
                    title="Confirm"
                    onPress={submitHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open_sans_bold",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  inputContainer: {
    minWidth: 300,
    maxWidth: "95%",
    width: "80%",
    alignItems: "center",
  },
  buttons: {
    width: Dimensions.get("window").width / 4,
  },
  input: {
    width: 70,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  text: {
    fontFamily: "open_sans",
  },
});

export default StartGameScreen;
