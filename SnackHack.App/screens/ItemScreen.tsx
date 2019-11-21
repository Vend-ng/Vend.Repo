import React from 'react';
import { Component }  from 'react';
import { Text, View, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import Item from '../components/Item'

export default class ItemScreen extends Component {
    render() {
        return(
            <View style={styles.items_container}>
                <Text style={styles.items_text}>MST BCH 01</Text>
                <ScrollView>
                    <View style={styles.items_scroll}>
                    <Item id={3389}
                        description="Coca-Cola" 
                        volume={20} 
                        price={1.50} /> 
                    <Item id={6351}
                        description="Diet Coke" 
                        volume={20} 
                        price={1.50} /> 
                    <Item id={1548}
                        description="Dr. Pepper" 
                        volume={20} 
                        price={1.50} /> 
                    <Item id={4986}
                        description="Sprite" 
                        volume={20} 
                        price={1.50} /> 
                    <Item id={2897}
                        description="Gold Peak Sweet Tea" 
                        volume={20} 
                        price={1.75} /> 
                    <Item id={2158}
                        description="Gold Peak Unsweet Tea" 
                        volume={20} 
                        price={1.75} /> 
                    <Item id={9513}
                        description="Barq's" 
                        volume={20} 
                        price={1.50} /> 
                    <Item id={8298}
                        description="Fanta" 
                        volume={20} 
                        price={1.50} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}
