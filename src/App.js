import React from 'react';
import { MapView } from 'expo';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';
import { List, ListItem, SearchBar, Avatar } from "react-native-elements";
import { createStackNavigator } from 'react-navigation';
import { constants } from 'expo';
import HomeScreen from './components/HomeScreen';
import DetailScreen from './components/DetailScreen';

export default StackNavigator({
  Home: { screen: HomeScreen,
          navigationOptions: {
              title: 'Home',
              headerBackTitle: 'Back',
          },
        },
  Detail: { screen: DetailScreen,
          navigationOptions: {
            title: 'Detail',
        },
      }
});