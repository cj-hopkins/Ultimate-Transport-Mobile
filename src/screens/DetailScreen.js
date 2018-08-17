import React, { Component } from 'react';
import { Button, ScrollView, StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { createStackNavigator } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

class DetailScreen extends Component {
  constructor(props) {
    super(props);
    const newTime = moment();
    const newTimeMidnight = newTime.clone().startOf("day");
    const diffInSeconds = newTime.diff(newTimeMidnight, "seconds");
    this.state = { 
          currentDate: newTime,
          currentTime: diffInSeconds,
          travelDate:newTime,
          travelTime:diffInSeconds,
          routes: this.props.navigation.state.params.routes,
          selectedRoute: null,
          direction: 'I',
          stops:null,
          startStop:null,
          finishStop:null,
          headsign: null,
          error: null,
          loading: false,
          refreshing: false,
          prediction: null,
          base_url: "https://csi420-02-vm9.ucd.ie/api/getStopsForRoute?format=json",
        }
        //this.setDate = this.setDate.bind(this);
  }

  setDateTime(newDate) {
    const convertDate = moment(newDate)
    const newTimeMidnight = convertDate.clone().startOf("day");
    const diffInSeconds = convertDate.diff(newTimeMidnight, "seconds");
    this.setState({
      travelTime: diffInSeconds,
      travelDate:convertDate
    })
  }
  
  showOptions(value) {
    this.setState({
      selectedRoute: value
    });
    this.fetchStops(value, this.state.direction)
  }
  changeDirection = () => {
    newDirection = (this.state.direction === 'I') ? 'O' : 'I'
    this.setState({
      direction: newDirection,
      startStop:null,
      finishStop:null
    });
    this.fetchStops(this.state.selectedRoute,newDirection);
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
  fetchPrediction = () => {
    const url = "https://csi420-02-vm9.ucd.ie/api/getModelPrediction?format=json"
    const time = (this.state.currentTime === this.state.travelTime) ? this.state.currentTime : this.state.travelTime
    const date = (this.state.currentDate === this.state.travelDate) ? this.state.currentDate : this.state.travelDate
    const isDefault = (this.state.currentDate === this.state.travelDate)
    fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body : JSON.stringify({
              route: this.state.selectedRoute,
              direction: this.state.direction,
              selectedTime : time,
              selectedDate : (date.unix()).toString(),
              start: this.state.startStop,
              finish: this.state.finishStop,
              isDefaultTime: isDefault
            })})
      .then((response) => response.json())
      .then((responseData) => {
      console.log(responseData)
        const prediction = responseData.prediction
        this.setState({
            prediction: prediction,
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
    const busStops = [];
    if (this.state.stops !== null) {
    for (var i =0; i < this.state.stops.length; i++){
      busStops.push(this.state.stops[i].stop_id + " " + this.state.stops[i].address + " " + this.state.stops[i].location_text)
      }
    }
    return (
        <View style={styles.container}>
              <ModalDropdown
              accessible={true}
              defaultValue='Choose Route'
              style={styles.dropdown}
                           textStyle={styles.dropdown_2_text}
                           dropdownStyle={styles.dropdown_2_dropdown}
              renderButtonText={(index) => this.showOptions(index)}
              options={busRoutes}
              />
          { this.state.stops === null ? null :
            <View style={{alignItems: 'center'}}>
          <Text>Towards {this.state.headsign}</Text>
          <Button
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
              options={[...busStops].reverse()}
              /><Text>Select a Time of Travel</Text>
              <DatePicker
                  mode="datetime"
                  style={{width: 200}}
                  date={this.state.date}
                  minuteInterval={15}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(date) => {this.setDateTime(date)}}
                />
                <Text>{this.state.prediction===null? null : this.state.prediction}</Text>
            <Button 
              disabled={this.state.finishStop===null}
              title="Get Estimated Travel Time"
              onPress={this.fetchPrediction}
              />
              </View>
            } 
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    width: 150,
    marginTop: 15,
    marginBottom:10,
    right: 8,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: 'cornflowerblue',
  },
  dropdown_2: {
    width: 150,
    marginTop: 15,
    marginBottom:10,
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

export default DetailScreen;

