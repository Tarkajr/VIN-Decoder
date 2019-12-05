import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, Button, Alert } from 'react-native';

export default class App extends Component {

  constructor(props) {
     super(props);
     this.state = {
       text: '',
       loading: false,
       data:[],
       error: null,
       make: '',
       model: '',
       year: ''
     };
   }

   _submitVin = async (params) => {
     this.setState({ loading: true });
     try {
       let resp = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/' + this.state.text + '?format=json');
       let response = await resp.json();
     } catch (error) {
       this.setState({error: error});
     }
     console.log('VIN Submitted Successfully');
     this.setState({
       make: this.state.data[6].Value,
       model: this.state.data[8].Value,
       year: this.state.data[9].Value,
       loading: false
     });

     }



  render() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <Text>Enter a VIN</Text>
      <TextInput
          style={styles.input}
          placeholder="Enter VIN"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          title="Submit VIN"
          onPress={ this._submitVin }
        />
        <Text>{this.state.year}</Text>
        <Text>{this.state.make}</Text>
        <Text>{this.state.model}</Text>
    </View>
    </TouchableWithoutFeedback>
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
  input: {
    height: 40,
    width: 100,
    margin: 50,
    borderColor: 'gray',
    borderWidth: 1
  }
});
