import React from 'react';
import { MapView } from 'expo';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';
import { List, ListItem, SearchBar, Avatar } from "react-native-elements";
import { createStackNavigator } from 'react-navigation';
import { constants } from 'expo';

import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import MapContainer from './components/MapContainer';

export default class App extends React.Component {

  render() {
    return(
        <AppStackNavigator />
    );
  }
};

const AppStackNavigator = createStackNavigator({
  Home: HomeScreen,
  Detail: DetailScreen,
  Map: MapContainer,
})
// const AppStackNavigator =  createStackNavigator({
//   Home: { screen: HomeScreen,
//           navigationOptions: {
//               title: 'Home',
//               headerBackTitle: 'Back',
//           },
//         },
//   Detail: { screen: DetailScreen,
//           navigationOptions: {
//             title: 'Detail',
//         },
//       }
// });