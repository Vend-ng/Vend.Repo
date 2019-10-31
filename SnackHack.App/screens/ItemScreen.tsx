import React from 'react';
import { Component }  from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/styles';
import Item from '../components/Item'

export default class ItemScreen extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>Item screen</Text>
                <Item id={1}
                      description="Coca-Cola" 
                      volume={20} 
                      price={1.50} /> 
            </View>
        );
    }
}
