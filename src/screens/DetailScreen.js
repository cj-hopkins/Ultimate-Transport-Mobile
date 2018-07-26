import React, { Component } from 'react';
import { Button, ScrollView, StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
          routes: this.props.navigation.state.params.routes,
          selectedRoute: null,
        }
  }

  showOptions(value) {
    this.setState({
      selectedRoute: value
    });
  }

  render(){
    const busRoutes = [];
    for (var i =0; i < this.state.routes.length; i++){
      busRoutes.push(this.state.routes[i].route)
    }
    console.log(this.state.routes);

    return (
        <View style={styles.container}>
            {/* <Button 
              onPress={() => this.props.navigation.navigate('Home')}
              title="Home"
              />*/}
              <ModalDropdown
              defaultValue='Choose Route'
              style={styles.dropdown_2}
                           textStyle={styles.dropdown_2_text}
                           dropdownStyle={styles.dropdown_2_dropdown}
              onSelect={(value) => this.showOptions(value)}
              options={busRoutes}
              />
              <Button 
              disabled ={this.state.selectedRoute===null}
              title="Choose Direction"/>
              <Button 
              disabled ={this.state.selectedRoute===null}
              onPress={() => this.props.navigation.navigate('Map')}
              title="Show Route on Map"/>
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

export default DetailScreen;

