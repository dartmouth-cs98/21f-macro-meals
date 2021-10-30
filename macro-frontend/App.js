// React Native Axios – To Make HTTP API call in React Native
// https://aboutreact.com/react-native-axios/

import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import axios from 'axios';
import { Camera } from 'expo-camera';
import { uploadImage } from './s3';

import MacroPieChart from './components/macro-breakdown/macro-individuals'

export default function App() {
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

  const getFlask = () => {
    axios
      .get('https://macro-cs98.herokuapp.com/api/flask')
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

  const onImageUpload = (event) => {
    const file = event.target.files[0];
    uploadImage(file).then((url) => {
      console.log(url);
    }).catch((error) => {
      console.log(error);
    });
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>

      <MacroPieChart/>
      <Text style={{ fontSize: 30, textAlign: 'center' }}>
        Connections
      </Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={getApi}
      >
        <Text>Get API</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={getFlask}
      >
        <Text>Get Flask Server</Text>
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
      {/*
      <input type="file" name="uploadFoodImage" onChange={onImageUpload} />
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
          </Camera> */}
    </View>
  );
}

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
  },
});
