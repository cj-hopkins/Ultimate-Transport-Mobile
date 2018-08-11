import React, { Component } from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import { createStackNavigator } from 'react-navigation';
import { Button, ScrollView, StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';

class TimeTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: this.props.navigation.state.params.routes,
      chosenRoute: null,
      direction: 'I',
      stops:[],
      startStop:null,
      headsign: null,
      error: null,
      loading: false,
      refreshing: false,
      chosenDay: null,
      weekday: 0,
      saturday: 0,
      sunday: 0,
      base_url: "https://csi420-02-vm9.ucd.ie/api/getStopsForRoute?format=json"
    }
  }
  showOptions(value) {
    this.setState({
      chosenRoute: value
    });
    this.fetchStops(value);
  }
  setStart(stop){
    const numberPattern = /\d+/g;
    start = stop.match(numberPattern)
    this.setState({
      startStop: parseInt(start[0])
      // startStop: stop
    })
  }
  setDay(day){
    this.setState({
      chosenDay:day,
    });
    if (day==="Monday to Friday"){
      this.setState({
        weekday:1,
        saturday:0,
        sunday:0
    })
    }
    else if(day==="Saturday"){
      this.setState({
        weekday:0,
        saturday:1,
        sunday:0
    })
    }
    else if (day==="Sunday"){
      this.setState({
        weekday:0,
        saturday:0,
        sunday:1
    })
    }
  }
  changeDirection = () => {
    console.log(this.state.direction)
    newDirection = (this.state.direction === 'I') ? 'O' : 'I'
    this.setState({
      direction: newDirection,
      startStop:null,
    });
    this.fetchStops(this.state.chosenRoute);
    this.stopSelect.select(-1)
    this.daySelect.select(-1)
  }

  fetchStops = (value)  => {
    const url = this.state.base_url;
    this.setState({ loading: true });
    fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body : JSON.stringify({
              route: value,
              direction: this.state.direction,
            })})
        .then((response) => response.json())
        .then((responseData) => {
        console.log(responseData)
        console.log("stops fetched")
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
  getTable = () => {
    this.props.navigation.navigate('Times',{
              chosenRoute: this.state.chosenRoute,
              stop: this.state.startStop,
              weekday: this.state.weekday,
              saturday: this.state.saturday,
              sunday: this.state.sunday,
              direction: this.state.direction
            })
  }


  render(){
    const busRoutes = [];
    for (var i =0; i < this.state.routes.length; i++){
      busRoutes.push(this.state.routes[i].route)
    }

    const busStops = [];
    for (var i =0; i < this.state.stops.length; i++){
      busStops.push(this.state.stops[i].stop_id + " " + this.state.stops[i].address + " " + this.state.stops[i].location_text)
    }
    console.log(busStops);
    const days = ["Monday to Friday", "Saturday", "Sunday"]

    return (
      <View style={styles.container}>
            {/* <Button 
              onPress={() => this.props.navigation.navigate('Home')}
              title="Home"
              />*/}
              <ModalDropdown
              accessible={true}
              defaultValue='Choose Route'
              style={styles.dropdown_2}
              textStyle={styles.dropdown_2_text}
              dropdownStyle={styles.dropdown_2_dropdown}
              renderButtonText={(index) => this.showOptions(index)}
              options={busRoutes}
              />
              {this.state.headsign===null? null: 
              <Text>Towards {this.state.headsign}</Text>}
              <Button 
                disabled ={this.state.chosenRoute===null}
                onPress={this.changeDirection}
                title="Change Direction" 
              />
              <ModalDropdown
              accessible={true}
              disabled= {this.state.chosenRoute === null}
              ref={ (ref) => this.stopSelect = ref }
              defaultValue='Select Stop'
              style={styles.dropdown_2}
              textStyle={styles.dropdown_2_text}
              dropdownStyle={styles.dropdown_2_dropdown}
              renderButtonText={(index) => this.setStart(index)}
              options={busStops}
              />
              <ModalDropdown
              ref={ (ref) => this.daySelect = ref }
              defaultValue='Select Day of Travel'
              style={styles.dropdown_2}
              textStyle={styles.dropdown_2_text}
              dropdownStyle={styles.dropdown_2_dropdown}
              renderButtonText={(index) => this.setDay(index)}
              options={days}
              />
              <Button
                disabled ={this.state.chosenDay===null}
                onPress={this.getTable}
                title="Get TimeTable" 
              />
              </View>
    );
  }
};

export default TimeTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dropdown_2: {
    width: 150,
    marginTop: 32,
    right: 8,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: 'cornflowerblue',
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