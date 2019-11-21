import React, { Component } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { styles } from '../styles/styles';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Permissions from 'expo-permissions';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import App from '../App';

class LocationScreen extends Component<NavigationInjectedProps> {

    state = {
        latitude: null,
        longitude: null,
        activeMarker: false,
        deactiveMarker: true,
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

    markerOnPress = () => {
        console.log("WHO PRESSED ME?!")
        if(this.state.deactiveMarker)
        {
            this.setState({
                ...this.state,
                activeMarker: true,
                deactiveMarker: false
            })
        }else if(this.state.activeMarker)
        {
            this.setState({
                ...this.state,
                activeMarker: false,
                deactiveMarker: true
            })
        }

    }

    render() {
        const { latitude, longitude} = this.state
        var vendingMachine = {
            latitude: 37.955389,
            longitude: -91.772266,
        }
        const {navigate} = this.props.navigation;
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
                            coordinate = {vendingMachine}
                            onPress = {this.markerOnPress}
                        />
                    </MapView>
                    
                    {(this.state.activeMarker) &&
                        <View style = {{ marginBottom: 0, height: 75, backgroundColor: 'blue', flexDirection: 'row', padding: 5, alignItems: 'center', justifyContent: 'center',borderRadius: 10}}>
                            <Button
                                title = "Order Here"
                                onPress = {() => navigate('Items')}
                            />
                        </View>
                    }

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

export default withNavigation(LocationScreen);
