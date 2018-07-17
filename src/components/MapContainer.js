import React from 'react';
import { MapView } from 'expo';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';


export default class MapContainer extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      selectedPlace: {},
      showingInfoWindow: false,
      activeMarker: {},
      stops: []
    }

    // this.onMarkerClick = this.onMarkerClick.bind(this)
  }

  componentWillMount() {
    this.getStopsForRoute('31', 'I')
  }

  getStopsForRoute = (routeName, direction) => {
    const endpoint = 'https://csi420-02-vm9.ucd.ie/api/getStopsForRoute' 

    try {
      // const result = fetch(endpoint, {
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({
          route: routeName,
          direction: direction,
        })
      })
        .then((response) => response.json())
        // .then((resp) => this.props.onRouteUpdate(resp, isNewRoute))
        .then((resp) => {
          console.log(resp)
          this.setState({stops: resp})
        });
    } catch(e) {
        console.log(e)
      }
  }

  onMarkerClick = () => {
    console.log("clicked")
  }

  render() {
    return(
      <MapView
       style={{ flex: 1 }}
       initialRegion={{
         latitude: 53.3498,
         longitude: -6.2603,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       }}
    >

    {this.state.stops.map(item => (
      <MapView.Marker
        key={item.identifier}
        onClick={this.onMarkerClick}
        title={item.stop_id.toString()}
        name={item.location_text.concat(" ", item.address)}
        coordinate={{latitude: item.stop_lat, longitude: item.stop_lon}} />
    ))}

    <MapView.Marker
       coordinate={{latitude:53.3498, longitude:-6.2603}}
       title={"A marker"}
    />
    </MapView>
    )
}
}