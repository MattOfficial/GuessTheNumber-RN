import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Card from '../components/Card';

export interface IGameOverScreenProps {
    userNumber: number;
    guessNumber: number;
    onRestart: Function;
}

export default function GameOverScreen({ userNumber, guessNumber, onRestart }: IGameOverScreenProps) {
    return (
        <View style={styles.screen}>
            <Card style={styles.card}>
                <Text>Game Over!</Text>
                <Text>Total no. of guesses: {guessNumber}</Text>
                <Text>The number was: {userNumber}</Text>
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
        justifyContent: 'center',
        alignItems: 'center'
    }
});
