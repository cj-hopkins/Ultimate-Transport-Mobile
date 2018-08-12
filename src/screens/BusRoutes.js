import React, { Component } from 'react';
import { Button, StyleSheet, Text, ScrollView, ActivityIndicator, View, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { createStackNavigator } from 'react-navigation';

class BusRoutes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: this.props.navigation.state.params.routes,
      selectedRoute: null,
      stopsI: null,
      headI: null,
      stopsO: null,
      headO: null,
      error: null,
      loading: false,
      refreshing: false,
    }
  }
  getStops(route){
    this.setState({
      selectedRoute: route,
    });
    this.fetchStopsI(route);
    this.fetchStopsO(route);
  }

  showStopsI = () =>{
    this.props.navigation.navigate('Stops',{
              chosenRoute: this.state.selectedRoute,
              stops: this.state.stopsI,
              headsign: this.state.headI
            })
  }
  showStopsO = () =>{
    this.props.navigation.navigate('Stops',{
              chosenRoute: this.state.selectedRoute,
              stops: this.state.stopsO,
              headsign: this.state.headO
            })
  }

  fetchStopsI = (route)  => {
    const url = "https://csi420-02-vm9.ucd.ie/api/getStopsForRoute?format=json";
    this.setState({ loading: true });
    fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body : JSON.stringify({
              route: route,
              direction: 'I',
            })})
        .then((response) => response.json())
        .then((responseData) => {
        console.log(responseData)
        console.log("stops fetched")
        this.setState({
            stopsI: responseData,
            headI: responseData[0].rtpi_destination,
            error: null,
            loading: false,
            refreshing: false
          });
        }).catch(error => {
          this.setState({ error, loading : false });
          console.log(error);
        })
      }
    fetchStopsO = (route)  => {
    const url = "https://csi420-02-vm9.ucd.ie/api/getStopsForRoute?format=json";
    this.setState({ loading: true });
    fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body : JSON.stringify({
              route: route,
              direction: 'O',
            })})
        .then((response) => response.json())
        .then((responseData) => {
        console.log(responseData)
        console.log("stops fetched")
        this.setState({
            stopsO: responseData,
            headO: responseData[0].rtpi_destination,
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
    const busRoutes = [];
    for (var i =0; i < this.state.routes.length; i++){
      busRoutes.push(this.state.routes[i].route)
    }
    const headsignI = "View Stops Towards "+ this.state.headI
    const headsignO = "View Stops Towards "+ this.state.headO
    return (
      <View style={styles.container}>
        <Text style= {{ fontSize: 25, color: "#000", textAlign: 'center' }}>Select a Route</Text>
        <ModalDropdown
          style={styles.dropdown_2}
          textStyle={styles.dropdown_2_text}
          dropdownStyle={styles.dropdown_2_dropdown}
          options={busRoutes}
          renderButtonText={(index) => this.getStops(index)}
          />
          {(this.state.stopsI!==null)?   
        <Button
          onPress={this.showStopsI}
          title={headsignI}
        />
        : null}
        {(this.state.stopsO!==null)? 
        <Button
          onPress={this.showStopsO}
          title={headsignO}
        />  
        : null}
        
      </View>
    );
  }
};

export default BusRoutes;

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