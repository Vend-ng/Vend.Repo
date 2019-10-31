import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import { styles } from '../styles/styles';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Permissions from 'expo-permissions';
import * as Animatable from 'react-native-animatable';

export default class ItemScreen extends Component {

    state = {
        latitude: null,
        longitude: null,
    }

    //Ask user permission for location.
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

    markerOnPress(){
        console.log("Evan")
        // <Animatable.View animation = "slideInBottom" duration = {500} style = {{height: 50, backgroundColor: 'white', flexDirection: 'row', padding:5}}>
            
        // </Animatable.View> 

    }

    render() {
        const { latitude, longitude} = this.state
        var vendingMachine = {
            latitude: 37.955389,
            longitude: -91.772266,
        }

        if(latitude){
            return(
                <View style = {styles.map}>
                    {/* search bar */}
                    <View style = {{height: 80, backgroundColor: '#eaeaea', justifyContent: 'center', paddingHorizontal: 5, marginTop: 20, borderColor: "transparent",
                                    shadowColor: "#000", shadowOffset: { width: 0, height: 1,} , shadowOpacity: 0.20, shadowRadius: 1.41, elevation: 2}}>
                        <View style = {{height: 50, backgroundColor: 'white', flexDirection: 'row', padding: 5, alignItems: 'center', borderRadius: 10}}>
                            <Icon name = "ios-search" style = {{padding: 5, fontSize: 24}} />
                            <TextInput placeholder = "Search" style = {{fontSize: 16}} />
                        </View>

                        {/* <Animatable.View style = {{height: 50, backgroundColor: 'white', flexDirection: 'row', padding: 5, alignItems: 'center', borderRadius: 10}}>
                            <Icon name = "ios-search" style = {{padding: 5, fontSize: 24}} />
                            <TextInput placeholder = "Search" style = {{fontSize: 16}} />
                        </View> */}

                    </View>

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
                        showsCompass
                        showsMyLocationButton
                    >
                        <Marker 
                            title = "MST BCH 01"
                            // pinColor = "#ffffff"
                            coordinate = {vendingMachine}
                            // onPress = {this.markerOnPress}
                        />
                    </MapView>

                </View>

            );
        }

        return(
            <View style = {styles.container}>
                <Text>Loading....</Text>
            </View>
        );
    }
}
