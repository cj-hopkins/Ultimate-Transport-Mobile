import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MapView } from 'expo';

export default class App extends Component {
  state = {
    stopLong: this.props.navigation.state.params.long,
    stopLat: this.props.navigation.state.params.lat,
    num: this.props.navigation.state.params.stop,
    add: this.props.navigation.state.params.add,
    loc: this.props.navigation.state.params.loc,
  };


  render() {
    const title = "Stop " + this.state.num
    const address = this.state.add + " " + this.state.loc
    return (
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: Number(this.props.navigation.state.params.lat),
                longitude: Number(this.props.navigation.state.params.long),
                latitudeDelta: .1,
                longitudeDelta: .1,
              }}
            >
            <MapView.Marker
                  coordinate={{latitude: Number(this.props.navigation.state.params.lat), longitude:Number(this.props.navigation.state.params.long)}}
                />
            </MapView>
    )
  }
}


              // initialRegion={{
              //    latitude: 53.3498,
              //    longitude: -6.2603,
              //    latitudeDelta: 0.0922,
              //    longitudeDelta: 0.0421,
              //  }}