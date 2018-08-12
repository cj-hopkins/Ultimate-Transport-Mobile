import React, { Component } from 'react';
import { Switch, Button, ScrollView, StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { createStackNavigator } from 'react-navigation';

class RoutePlanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenRoute: this.props.navigation.state.params.chosenRoute,
      direction: 'I',
      stops:[],
      startStop:null,
      finishStop:null,
      headsign: null,
      error: null,
      loading: false,
      refreshing: false,
      base_url: "https://csi420-02-vm9.ucd.ie/api/getStopsForRoute?format=json",
    }
  }


  changeDirection = () => {
    console.log(this.state.direction)
    newDirection = (this.state.direction === 'I') ? 'O' : 'I'
    this.setState({
      direction: newDirection,
      startStop:null,
      finishStop:null
    });
    this.fetchStops(this.state.chosenRoute,newDirection);
    this.startSelect.select(-1)
    this.finishSelect.select(-1)
  }
  setStart(stop){
    const numberPattern = /\d+/g;
    start = stop.match(numberPattern)
    this.setState({
      startStop: parseInt(start[0])
      // startStop: stop
    })
  }
  setFinish(stop){
    const numberPattern = /\d+/g;
    finish = stop.match(numberPattern)
    this.setState({
      finishStop:parseInt(finish[0])
    })
  }

  async componentDidMount() {
        this.fetchStops(this.state.chosenRoute,this.state.direction);
      } 

  fetchStops = (route,direction)  => {
    const url = this.state.base_url;
    this.setState({ loading: true });
    fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body : JSON.stringify({
              route: route,
              direction: direction,
            })})
        .then((response) => response.json())
        .then((responseData) => {
        console.log(responseData)
        this.setState({
            stops: responseData,
            headsign: responseData[0].rtpi_destination,
            error: null,
            loading: false,
            refreshing: false
          });
        }).catch(error => {
          this.setState({ error, loading : false });
          console.log(error);
        })
      }
  render(){
    const busStops = [];
    for (var i =0; i < this.state.stops.length; i++){
      busStops.push(this.state.stops[i].stop_id + " " + this.state.stops[i].address + " " + this.state.stops[i].location_text)
    }
    // const busStops = {};
    // for (var i =0; i < this.state.stops.length; i++){
    //   busStops[this.state.stops[i].stop_id]=this.state.stops[i].stop_id + " " + this.state.stops[i].address + " " + this.state.stops[i].location_text
    // }
    console.log(busStops);

    return (
        <View style={styles.container}>
          <Text>Towards {this.state.headsign}</Text>
          <Button 
            disabled ={this.state.headsign===null}
            onPress={this.changeDirection}
            title="Change Direction" 
          />
          <ModalDropdown
              ref={ (ref) => this.startSelect = ref }
              accessible={true}
              defaultValue='Choose Start Stop'
              style={styles.dropdown}
                           textStyle={styles.dropdown_2_text}
                           dropdownStyle={styles.dropdown_2_dropdown}
              renderButtonText={(index) => this.setStart(index)}
              options={busStops}
              />
              <ModalDropdown
              ref={ (ref) => this.finishSelect = ref }
              disabled= {this.state.startStop === null}
              accessible={true}
              defaultValue='Choose Finish Stop'
              style= {this.startStop===null ? styles.dropdown_2 : styles.dropdown}
              textStyle={styles.dropdown_2_text}
              dropdownStyle={styles.dropdown_2_dropdown}
              renderButtonText={(index) => this.setFinish(index)}
              //options={busStops.slice(this.state.startStop)}
              options={busStops}
              />
            <Button 
              disabled={this.state.finishStop===null}
              title="Get Estimated Travel Time"
              />
        </View>
    );
  }
};

export default RoutePlanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    width: 150,
    marginTop: 32,
    right: 8,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: 'cornflowerblue',
  },

  dropdown_2: {
    width: 150,
    marginTop: 32,
    right: 8,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  dropdown_2_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdown_2_dropdown: {
    width: 150,
    height: 300,
    borderColor: 'cornflowerblue',
    borderWidth: 2,
    borderRadius: 3,
  },
})