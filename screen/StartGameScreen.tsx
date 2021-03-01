import React from 'react';
import { View, StyleSheet, Text, TextInput, Button } from "react-native";

const StartGameScreen = (props: {}) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Start a bew game!</Text>
            <View style={styles.inputContainer}>
                <Text>Select a number: </Text>
                <TextInput />
                <View style={styles.buttonContainer}>
                    <View style={styles.buttons}>
                        <Button title="Reset" onPress={() => {}}/>
                    </View>
                    <View style={styles.buttons}>
                        <Button title="Confirm" onPress={() => {}} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10, 
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 8,
        padding: 20,
        borderRadius: 10
    },
    buttons: {
        width: '40%'
    }
});

export default StartGameScreen;
