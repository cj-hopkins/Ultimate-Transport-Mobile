import React, { Component } from 'react';
import { Button, StyleSheet, Text, ScrollView, ActivityIndicator, View, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { createStackNavigator } from 'react-navigation';


class StopInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stopNum: this.props.navigation.state.params.stop.stop_id,
      stopAdd: this.props.navigation.state.params.stop.address,
      stopLoc: this.props.navigation.state.params.stop.location_text,
      lat: this.props.navigation.state.params.stop.stop_lat,
      long: this.props.navigation.state.params.stop.stop_lon,
      times: null,
      error: null,
      loading: false,
      refreshing: false,
    }
  }
  async componentDidMount() {
        this.fetchRTPI();
      } 

  fetchRTPI = ()  => {
    const url = `https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=${this.state.stopNum}&format=json`
    this.setState({ loading: true });
    fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
        console.log(responseData)
        this.setState({
          times: responseData,
        })
        }).catch(error => {
          this.setState({ error, loading : false });
          console.log(error);
        })
      }

  showMap = () => {
   this.props.navigation.navigate('Map', {
      lat: this.state.lat,
      long: this.state.long,
      stop: this.state.stopNum,
      add: this.state.stopAdd,
      loc: this.state.stopLoc
    })
  }
  
  render(){
    const number = "Stop " + this.state.stopNum
    const name = this.state.stopAdd + " " + this.state.stopLoc
    return (
      <View style={styles.container}>
        <Text style= {{ fontSize: 25, color: "#000", textAlign: 'center' }}>{number}</Text>
        <Text style= {{ fontSize: 25, color: "#000", textAlign: 'center' }}>{name}</Text>
        <Text></Text>
        <Text style= {{ fontSize: 20, color: "#0082cd", textAlign: 'center' }}>Real Time Information</Text>
        {this.state.times===null ? <Text>No real-time information available</Text> :
          this.state.times.results.map((item) => {
            return <Text>{item.route +  " " + item.destination + " " + item.duetime + " mins"}</Text>
          })
        }
        <Text></Text>
        <Button
          onPress={this.showMap}
          title="View Stop on Map"
          />
      </View>
    );
  }
};

export default StopInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})