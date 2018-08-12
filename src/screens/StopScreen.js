import React, { Component } from 'react';
import { Button, StyleSheet, Text, ScrollView, ActivityIndicator, View, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';


class StopScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: this.props.navigation.state.params.chosenRoute,
      stops: this.props.navigation.state.params.stops,
      headsign: this.props.navigation.state.params.headsign,
      error: null,
      loading: false,
      refreshing: false,
      selectedStop: null,
    }
  }
  showStop(stop){
    console.log(stop)
  }
  
  render(){
    const busStops = [];
    for (var i =0; i < this.state.stops.length; i++){
      busStops.push(this.state.stops[i].stop_id + " " + this.state.stops[i].address + " " + this.state.stops[i].location_text)
    }
    const route = "Route: " + this.state.route
    const headSign =" Towards: " + this.state.headsign
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style= {{ fontSize: 25, color: "#000", textAlign: 'center' }}>{route}</Text>
        <Text style= {{ fontSize: 25, color: "#000", textAlign: 'center' }}>{headSign}</Text>
        {this.state.stops ? this.state.stops.map((stop,i) => {
              return <Button
                      key={stop.stop_id + "" + i}
                      value={stop.stop_id}
                      onPress={this.showStop(stop.stop_id)}
                      title={stop.stop_id + " " + stop.address + " " + stop.location_text}
                      />
            }) : null}
      </ScrollView>
    );
  }
};

export default StopScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
})