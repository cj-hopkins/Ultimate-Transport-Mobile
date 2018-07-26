import React, { Component } from 'react';
import { Button, ScrollView, StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
          routes: this.props.navigation.state.params.routes,
        }
  }

  render(){
    const DEMO_OPTIONS_1 = [];
    for (var i =0; i < this.state.routes.length; i++){
      DEMO_OPTIONS_1.push(this.state.routes[i].route)
    }
    console.log(this.state.routes);

    return (
        <View style={styles.container}>
            {/* <Button 
              onPress={() => this.props.navigation.navigate('Home')}
              title="Home"
              />*/}
              <Text>Select Bus Route</Text>
              <ModalDropdown options={DEMO_OPTIONS_1}
              />
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
  }
})

export default DetailScreen;

