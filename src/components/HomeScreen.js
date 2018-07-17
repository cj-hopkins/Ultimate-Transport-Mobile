import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';
import { List, ListItem, SearchBar, Avatar, Button } from "react-native-elements";
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
          status: false,
          loading: false,
          data: [],
          testData: [{'route': '31'}, {'route': '11'}, {'route': '16'}],
          error: null,
          refreshing: false,
          // If you are using an emulator use 10.0.2.2 instead of 127.0.0.1
          // using the expo app on your phone use 127.0.0.1
          // base_url: "http://10.0.2.2:8000/api/getAllRoutes"
          // base_url: "http://127.0.0.1:8000/api/getAllRoutes"
          // Connection to the cs server works via expo app
          base_url: "https://csi420-02-vm9.ucd.ie/api/getAllRoutes?format=json"
          // base_url: "https://facebook.github.io/react-native/movies.json"
      }
    }

  handleClick = () => {
    if(this.state.status == true)
    {
      this.setState({status: false})
    }
    else
    {
      this.setState({status: true})
    }
    this.fetchDataFromApi();
    console.log(this.state.data)
  }
  
  componentDidMount() {
    this.fetchDataFromApi();
  }

  fetchDataFromApi = ()  => {
    const url = this.state.base_url;

    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res)

        this.setState({
          data: res,
          error: null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading : false });
        console.log(error)
      })
    }


  render(){
    console.log(this.state.testData)
    console.log(this.state.data)

    return (
        <View style={styles.container}>
            <Text>Get Data!</Text>
            {this.state.data.map((item) => {
              return <Text key={item.route}>{item.route}</Text>
            })}
            {this.state.status ? <Text style= {{ fontSize: 25, color: "#000", textAlign: 'center' }}>Surprise!</Text> : null}
            <Button 
              onPress={this.handleClick}
              title="press"
            />
        </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default HomeScreen;