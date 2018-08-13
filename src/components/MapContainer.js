import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

export default class App extends Component {
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    stopLong: this.props.navigation.state.params.long,
    stopLat: this.props.navigation.state.params.lat,
    num: this.props.navigation.state.params.stop,
    add: this.props.navigation.state.params.add,
    loc: this.props.navigation.state.params.loc,
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
   // let { status } = await Permissions.askAsync(Permissions.LOCATION);
   let { status } = "not granted"
   if (status !== 'granted') {
     this.setState({
       hasLocationPermissions: true,
       mapRegion: {
          latitude: this.props.navigation.state.params.lat,
          longitude: this.props.navigation.state.params.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
       locationResult: 'Dublin',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location) });
   
   // Center the map on the location we just fetched.
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
    }
  }

  render() {
    const title = "Stop " + this.state.num
    const address = this.state.add + " " + this.state.loc
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Pan, zoom, and tap on the map!
        </Text>
        
        {
          this.state.locationResult === null ?
          <Text>Finding your current location...</Text> :
          this.state.hasLocationPermissions === false ?
            <Text>Location permissions are not granted.</Text> :
            this.state.mapRegion === null ?
            <Text>Map region doesn't exist.</Text> :
            <MapView
              style={{ alignSelf: 'stretch', height: 400 }}
              region={this.state.mapRegion}
              onRegionChange={this._handleMapRegionChange}
            >
            <MapView.Marker
                  coordinate={{latitude: this.state.stopLat, longitude:this.state.stopLong}}
                  title={title}
                  description={address}
                />

            </MapView>
        }
        
        <Text>
          Location: {this.state.locationResult}
        </Text>
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
