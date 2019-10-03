import React from 'react';
import { Component }  from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/styles';

export default class ItemScreen extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>Location screen</Text>
            </View>
        );
    }
}
