import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';
import { List, ListItem, SearchBar, Avatar } from "react-native-elements";
import { createStackNavigator } from 'react-navigation';
import { Button } from '../components/ButtonWithMargin';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
          showRoutes: false,
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

  showRoutes = () => {
    const newVal = !this.state.showRoutes
    this.setState({
      showRoutes: newVal
    });
  }

  handleClick = () => {
    this.props.navigation.navigate('Detail',{
              routes: this.state.data,
            })
  }
  showTimeTable = () => {
    this.props.navigation.navigate('Tables',{
              routes: this.state.data,
            })
  }
  
  async componentDidMount() {
    // await Font.loadAsync({
    //   awesome:
    //     'https://github.com/FortAwesome/Font-Awesome/raw/master/fonts/fontawesome-webfont.ttf',
    // });
    // this.setState({
    //   fontLoaded: true
    // });
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

    return (
        <View style={styles.container}>
            {this.state.showRoutes ? this.state.data.map((item) => {
              return <Text key={item.route}>{item.route}</Text>
            }) : null}
            {this.state.status ? <Text style= {{ fontSize: 25, color: "#000", textAlign: 'center' }}>Surprise!</Text> : null}
            <Button 
              onPress={this.handleClick}
              title="Plan Journey"
            />
            
            <View>
            <Button
              onPress={this.showRoutes}
              title="Show Bus Routes"
            /></View>
            <View>
            <Button
              onPress={this.showTimeTable}
              title="Timetables"
            /></View>
            <View>
            {/* <FlatList
              data={this.state.data}
              renderItem={({item}) => <ListItem title={item.route} />}
            /> */}
              <Button
                onPress={() => this.props.navigation.navigate('Map')}
                title="Visit Map"
               />
            </View>
            <Button
              onPress={() => this.props.navigation.navigate('Drawer')}
              title="Drawer Example"
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