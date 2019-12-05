import React from 'react';
import { Component }  from 'react';
import { Text, View, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import Item from '../components/Item'
import { NavigationInjectedProps } from 'react-navigation';
import SHClient from '../libraries/SHClient';

export default class ItemScreen extends Component<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'Items',
    };
    state = {
        items: []
    };
    render() {
        var client = new SHClient();
        if (this.state.items.length == 0)
        {
            client.products().then(t => {
                //console.log("latitude " + latitude + " longitude " + longitude);
                t.forEach(element => {
                    //console.log("element: " + element)
                    this.setState({
                        items: [...this.state.items, element]
                    });
                });
            });
        }
        return(
            <View style={styles.items_container}>
                <Text style={styles.items_text}>{this.props.navigation.state.params.MachineShort}</Text>
                <ScrollView>
                    <View style={styles.items_scroll}>
                        {this.state.items}
                    </View>
                </ScrollView>
            </View>
        );
    }
}
