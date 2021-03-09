import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

export interface IGameScreenProps {
    userChoise: number;
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

const GameScreen = (props: IGameScreenProps) => {

    const [curGuess, setCurGuess] = useState(generateRandomNumber(1, 100, props.userChoise));

    return (
        <View style={styles.screen}>
            <Text>Opponent's guess: </Text>
            <NumberContainer>{curGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="Lower" onPress={() => { }} />
                <Button title="Higher" onPress={() => { }} />
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
