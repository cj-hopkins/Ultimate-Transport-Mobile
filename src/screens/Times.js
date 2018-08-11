import React, { Component } from 'react';
import { Button, StyleSheet, Text, ScrollView, ActivityIndicator, View, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { createStackNavigator } from 'react-navigation';

class Times extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times:null,
      chosenRoute: this.props.navigation.state.params.chosenRoute,
      direction: this.props.navigation.state.params.direction,
      startStop: this.props.navigation.state.params.stop,
      error: null,
      loading: false,
      refreshing: false,
      weekday: this.props.navigation.state.params.weekday,
      saturday: this.props.navigation.state.params.saturday,
      sunday: this.props.navigation.state.params.sunday,
      base_url: "https://csi420-02-vm9.ucd.ie/api/getTimeTable?format=json"
    }
  }
  async componentDidMount() {
        this.fetchTimes();
      } 
  fetchTimes = ()  => {
    const url = this.state.base_url;
    this.setState({ loading: true });
    fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body : JSON.stringify({
              lineid: this.state.chosenRoute,
	          direction: (this.state.direction === 'I') ? 1 : 0,
	          stop_id: this.state.startStop,
	          weekday: this.state.weekday,
	          saturday: this.state.saturday,
	          sunday: this.state.sunday,
            })})
        .then((response) => response.json())
        .then((responseData) => {
        console.log(responseData)
        console.log("times fetched")
        this.setState({
            times: responseData.sort(),
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
	    return (
	    	<ScrollView contentContainerStyle={styles.container}>
	    	{this.state.times===null ? null: 
				this.state.times.map(function(time,index){
					return <Text>{time}</Text>;
				})}
	      		/>}
	      </ScrollView>
	    );
	  }
	};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  }
 })

export default Times;