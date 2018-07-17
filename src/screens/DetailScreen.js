import React, { Component } from 'react';
import { Button, StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';

class DetailScreen extends Component {

  render(){

    return (
        <View>
            <Text>Detail Screen!</Text>
            <Button 
              onPress={() => this.props.navigation.navigate('Home')}
              title="Home"
             />
        </View>
    );
  }
};

export default DetailScreen;

