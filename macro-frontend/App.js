// React Native Axios – To Make HTTP API call in React Native
// https://aboutreact.com/react-native-axios/

import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import axios from 'axios';
import FoodBar from './components/food-breakdown/food-bar';
import FoodBreakDown from './components/food-breakdown/food-breakdown';

const App = () => {
  const getApi = () => {
    axios
      .get('https://macro-cs98.herokuapp.com/api')
      .then((response) => {
        alert(JSON.stringify(response.data));
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const getFood = () => {
    axios
      .get('https://macro-cs98.herokuapp.com/api/food')
      .then((response) => {
        alert(JSON.stringify(response.data));
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const addRice = () => {
    axios
      .post('https://macro-cs98.herokuapp.com/api/food', {
        name: 'Sticky Rice',
        servingSize: 1,
        servingUnit: 'cup',
        calories: 169,
        protein: 4,
        carb: 37,
        fat: 0,
      })
      .then((response) => {
        alert(JSON.stringify(response.data));
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // dummy test for adding image
  const addImage = () => {
    // const file = event.target.files[0];
    // // Handle null file
    // // Get url of the file and set it to the src of preview
    // if (file) {
    //   this.setState({ preview: window.URL.createObjectURL(file), file });
    // }
  };

  return (
    <View style={styles.container}>

      <FoodBreakDown />

      <Text style={{ fontSize: 30, textAlign: 'center' }}>
        Example of Axios Networking in React Native
      </Text>
      {/* Running GET Request */}
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={getApi}
      >
        <Text>Get API</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={getFood}
      >
        <Text>Get Food</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={addRice}
      >
        <Text>Add Rice</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={addImage}>
        <Text>Add Image</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 16,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '100%',
    marginTop: 16,
    fontSize: 50,
  },
});

export default App;
