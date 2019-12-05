import React from 'react';
import { Component }  from 'react';
import { Text, View, Image, TouchableHighlight, Alert } from 'react-native';
import NumberFormat  from 'react-number-format';
import PropTypes from 'prop-types';
import { styles } from '../styles/styles';

var images = [];

images["Coca-Cola Classic 20 fl oz."] = require('../assets/coke.png');
images["Diet Coke 20 fl oz."] = require('../assets/dietcoke.png');
images["Dr Pepper 20 fl oz."] = require('../assets/drpepper.png');
images["Sprite 20 fl oz."] = require('../assets/sprite.png');
/*images["2897"] = require('../assets/2897.png');
images["2158"] = require('../assets/2158.png');
images["9513"] = require('../assets/9513.png');
images["8298"] = require('../assets/8298.png');*/

export default class Item extends Component<
    { id: number, 
      description:string, 
      volume:number, 
      price:number}> {
    render() {
        return(
        <TouchableHighlight onPress={() => setTimeout(() => (Alert.alert("Remption Code", "Please enter this code into the machine\n\n" + this.props.id)), 3000)}>
            <View style={styles.item}>
                <Image style={{width: 53, height: 166, alignContent: "center"}} source={images[this.props.description.toString()]} />
                <Text style={styles.item_text}>{this.props.description}</Text>
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