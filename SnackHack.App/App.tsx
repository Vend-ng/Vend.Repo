import React from 'react';
import { Image } from 'react-native';
import { styles } from './styles/styles'


import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StyleSheet, Text, View } from 'react-native';
import ItemScreen from './screens/ItemScreen';
import LocationScreen from './screens/LocationScreen';
import FavoritesScreen from './screens/FavoritesScreen'
import CartScreen from './screens/CartScreen'
import GraphqlScreen from './screens/GraphqlScreen'
console.disableYellowBox = true;
const StackNavigation = createStackNavigator({
  Locations: { 
    screen: LocationScreen,
    navigationOptions: {
      header: null
    } 
  },
  Items: { screen: ItemScreen }
});
const TabNavigator = createBottomTabNavigator({
  Locations: {
    screen: StackNavigation,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/location-icon.png')} style={{width: 52/3, height: 73/3}} />
      )
    }
  },
  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/favorites-icon.png')} style={{width: 73/3, height: 67/3}} />
      )
    }
  },
  Settings: {
    screen: CartScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/cart-icon.png')} style={{width: 69/3, height: 68/3}} />
      )
    }
  }
  //GraphQL: GraphqlScreen
});

export default createAppContainer(TabNavigator);
