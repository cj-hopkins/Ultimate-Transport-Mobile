import React from 'react';
import { MapView } from 'expo';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';


export default class MapContainer extends React.Component{

  render() {
    return(
      <MapView
       style={{ flex: 1 }}
       initialRegion={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       }}
    />
    )
}
}