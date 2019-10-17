import { Image } from 'react-native';


import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StyleSheet, Text, View } from 'react-native';
import ItemScreen from './screens/ItemScreen';
import LocationScreen from './screens/LocationScreen';
import FavoritesScreen from './screens/FavoritesScreen'
import CartScreen from './screens/CartScreen'
import GraphqlScreen from './screens/GraphqlScreen'

const TabNavigator = createBottomTabNavigator({
  Items: ItemScreen,
  Locations: LocationScreen,
  Favorites: FavoritesScreen,
  Cart: CartScreen,
  GraphQL: GraphqlScreen
});

export default createAppContainer(TabNavigator);
