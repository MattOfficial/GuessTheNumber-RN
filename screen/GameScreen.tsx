import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

export interface IGameScreenProps {
    userChoise: number;
    onGameOver: Function;
}

enum Choice {
    LOWER = "Lower",
    HIGHER = "Higher"
}

const generateRandomNumber = function (min: number, max: number, exclude: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomNumber(min, max, exclude);
    } else {
        return rndNum;
    }
}

const GameScreen = ({ userChoise, onGameOver }: IGameScreenProps) => {

    const [curGuess, setCurGuess] = useState(generateRandomNumber(1, 100, userChoise));
    const [rounds, setRounds] = useState(0);

    const curLow = useRef(1);
    const curHigh = useRef(100);

    useEffect(() => {
        if (curGuess === userChoise) {
            onGameOver(rounds);
        }
    }, [curGuess, userChoise, onGameOver]);

    const nextGuessHandler = (dir: Choice) => {
        if (dir === Choice.LOWER && curGuess < userChoise || dir === Choice.HIGHER && curGuess > userChoise) {
            Alert.alert('Don\'t lie!', 'This is misleading and you know it.', [{ text: 'Sorry', style: 'cancel' }]);
            return;
        }
        if (dir === Choice.LOWER) {
            curHigh.current = curGuess;
        }
        if (dir === Choice.HIGHER) {
            curLow.current = curGuess + 1;
        }
        setCurGuess(generateRandomNumber(curLow.current, curHigh.current, curGuess));
        setRounds(rounds => rounds + 1);
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's guess: </Text>
            <NumberContainer>{curGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="Lower" onPress={nextGuessHandler.bind(this, Choice.LOWER)} />
                <Button title="Higher" onPress={nextGuessHandler.bind(this, Choice.HIGHER)} />
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    }
});

export default GameScreen;
