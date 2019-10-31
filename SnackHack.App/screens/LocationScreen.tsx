import React from 'react';
import { Component }  from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/styles';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Permissions from 'expo-permissions';

export default class ItemScreen extends Component {

    state = {
        latitude: null,
        longitude: null,
      }

    async componentDidMount() {
        const { status } = await Permissions.getAsync(Permissions.LOCATION)
    
        if(status != 'granted') {
          const response = await Permissions.askAsync(Permissions.LOCATION)
        }
    
        navigator.geolocation.getCurrentPosition(
          ({ coords : {latitude, longitude} }) => this.setState({latitude, longitude}, () => console.log('State:', this.state)),
          (error) => console.log('Error:', error) 
        )
    
    }

    render() {
        const { latitude, longitude} = this.state
        if(latitude){
            return(

                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    showsUserLocation
                >
                </MapView>

            );
        }

        return(
            <View style = {styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
}
