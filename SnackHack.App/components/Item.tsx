import React from 'react';
import { Component }  from 'react';
import { Text, View, Image, TouchableHighlight, Alert } from 'react-native';
import NumberFormat  from 'react-number-format';
import PropTypes from 'prop-types';
import { styles } from '../styles/styles';

var images = [];

images["3389"] = require('../assets/3389.png');
images["6351"] = require('../assets/6351.png');
images["1548"] = require('../assets/1548.png');
images["4986"] = require('../assets/4986.png');
images["2897"] = require('../assets/2897.png');
images["2158"] = require('../assets/2158.png');
images["9513"] = require('../assets/9513.png');
images["8298"] = require('../assets/8298.png');

export default class Item extends Component<
    { id: number, 
      description:string, 
      volume:number, 
      price:number}> {
    render() {
        return(
        <TouchableHighlight onPress={() => setTimeout(() => (Alert.alert("Remption Code", "Please enter this code into the machine\n\n" + this.props.id)), 3000)}>
            <View style={styles.item}>
                <Image style={{width: 53, height: 166, alignContent: "center"}} source={images[this.props.id.toString()]} />
                <Text style={styles.item_text}>{this.props.description + " " + this.props.volume} oz.</Text>
                <NumberFormat value={this.props.price} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'$'}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    renderText={value => <Text style={styles.item_text}>{value}</Text>} />
            </View>
        </TouchableHighlight>)
    }
}