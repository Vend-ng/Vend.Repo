import React from 'react';
import { Component }  from 'react';
import { Text, View, Image } from 'react-native';
import NumberFormat  from 'react-number-format';
import PropTypes from 'prop-types';
import { styles } from '../styles/styles';

export default class Item extends Component<
    { id: number, 
      description:string, 
      volume:number, 
      price:number}> {

    render() {
        return(
        <View style={styles.item}>
            <Image style={{width: 107, height: 332}} source={require('../assets/1.png')} />
            <Text>{this.props.description + " " + this.props.volume} oz.</Text>
            <NumberFormat value={this.props.price} 
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'$'}
                decimalScale={2}
                fixedDecimalScale={true}
                renderText={value => <Text style={{textAlign: "center",}}>{value}</Text>} />
        </View>)
    }
}