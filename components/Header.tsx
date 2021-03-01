import React from 'react';
import { View, Text, StyleSheet, ProgressViewIOSComponent } from "react-native";

const Header = (props: {title: string}) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>
                {props.title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop:36,
        backgroundColor: '#f7287b',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        color: 'black',
        fontSize: 18
    }
});

export default Header;