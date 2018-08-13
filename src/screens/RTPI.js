import React, { Component } from 'react';
import { TouchableOpacity, Button, StyleSheet, Text, ScrollView, ActivityIndicator, View, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { createStackNavigator } from 'react-navigation';
import ModalFilterPicker from 'react-native-modal-filter-picker'

class RTPI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stops: this.props.navigation.state.params.stops,
      visible: true,
      stopNum: null,
      stopAdd: null,
      stopLoc: null,
      times: null,
      error: null,
      loading: false,
      refreshing: false,
    }
  }

  fetchRTPI = ()  => {
    const url = `https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=${this.state.stopNum}&format=json`
    this.setState({ loading: true });
    fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
        // console.log(responseData)
        this.setState({
          times: responseData,
        })
        }).catch(error => {
          this.setState({ error, loading : false });
          console.log(error);
        })
      }
  getTimes(stop){
    this.setState({
      stopNum:stop
    })
    this.fetchRTPI()
  }
  showSearch(){
    const show = this.state.visible ? false : true;
    this.setState({
      visible: show
    })
  }
  onCancel = () => {
    this.setState({
      visible: false
    })
  }
  onSelect = (picked) => {
    this.setState({
      stopNum: picked,
      visible: false
    })
    console.log("picked")
    console.log(picked)
    this.getTimes(picked)
  }
  render(){
    const stops = [];
    for (var i =0; i < this.state.stops.length; i++){
      stops.push({key:this.state.stops[i].stop_id, label:this.state.stops[i].stop_id + " " + this.state.stops[i].address + " " + this.state.stops[i].location_text})
    }
    console.log("Stops")
    console.log(stops)

    const { visible } = this.state;
    return (
      <View style={styles.container}>
        {/*<ModalDropdown
          defaultValue='Select a Stop'
              style={styles.dropdown_2}
              textStyle={styles.dropdown_2_text}
              dropdownStyle={styles.dropdown_2_dropdown}
              renderButtonText={(index) => this.getTimes(index)}
              options={stops}
        /> */}
        <ModalFilterPicker
          visible={visible}
          options={stops}
          onSelect={this.onSelect}
          onCancel={this.onCancel}
        />
        <Button 
          title="Search Stops"
          onPress={this.showSearch.bind(this)}
          />
          <Text style= {{ fontSize: 20, color: "#0082cd", textAlign: 'center' }}>Real Time Information</Text>
        {this.state.times===null ? null :
          this.state.times.errorcode!=='0' ? <Text>No real-time information available</Text> :
          this.state.times.results.map((item) => {
            return <Text>{item.route +  " " + item.destination + " " + item.duetime + " mins"}</Text>
          })
        }
        <Text></Text>
      </View>
    );
  }
};

export default RTPI;

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