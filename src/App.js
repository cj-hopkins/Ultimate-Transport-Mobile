import React from 'react';
import { MapView } from 'expo';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';
import { List, ListItem, SearchBar, Avatar } from "react-native-elements";
import { createStackNavigator } from 'react-navigation';
import { constants } from 'expo';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import MapContainer from './components/MapContainer';
import DrawerExample from './screens/DrawerNav';
import {MaterialIcons} from '@expo/vector-icons';
import TimeTable from './screens/TimeTable';
import Times from './screens/Times';
import BusRoutes from './screens/BusRoutes';
import StopScreen from './screens/StopScreen';
import StopInfo from './screens/StopInfo';
import RTPI from './screens/RTPI';

export default class App extends React.Component {
  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true
  };

  async componentWillMount() {
    await Font.loadAsync({
      'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf')
    })
  }
  render() {
    return(
        <AppStackNavigator />
    );
  }
};

const AppStackNavigator = createStackNavigator({
  Home: HomeScreen,
  Detail: DetailScreen,
  Bus: BusRoutes,
  Map: MapContainer,
  Drawer: DrawerExample,
  Stops: StopScreen,
  StopInfo: StopInfo,
  Tables: TimeTable,
  Times: Times,
  RTPI: RTPI,
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