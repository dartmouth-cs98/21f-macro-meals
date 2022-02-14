import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Text, View, TouchableOpacity, Dimensions, TextInput, Picker, Image
} from 'react-native';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Camera } from 'expo-camera';
import { uploadImage } from '../../s3';
import { addFood } from '../redux/actions/foodActions';
import styles from '../styles';
import { RNS3 } from 'react-native-aws3';

const options = {
  keyPrefix: "",
  bucket: "macro-meals-images",
  region: "us-east-1",
  accessKey: "AKIAXST3R2TTOITGUBFB",
  secretKey: "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",
  successActionStatus: 201
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const positiveMood = require('../img/positiveMood.png');
const neutralMood = require('../img/neutralMood.png');
const negativeMood = require('../img/negativeMood.png');

function MainScreen({ navigation, storedUserName }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showError, setShowError] = useState(false);
  const [correctError, setCorrectError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('classification failed. would you like to create a manual entry?');
  const [customName, setCustomName] = useState('');
  const [description, setDescription] = useState('');
  const [mealTime, setMealTime] = useState('breakfast');
  const [mood, setMood] = useState('positive');
  const [publicFood, setPublicFood] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [classification, setClassification] = useState('');
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carb, setCarb] = useState(0);
  const [fat, setFat] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [simple, setSimple] = useState(false);

  const dispatch = useDispatch();
  const addItem = (value) => {
    dispatch(addFood(value));
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const uploadImageToS3 = (file) => {
    uploadImage(file).then((url) => {
      setImageUrl(url);
      classifyImage(url);
    }).catch((error) => {
      alert(error);
    });
  };

  const classifyImage = (url) => {
    axios.post('https://macro-cs98.herokuapp.com/api/classifyImage', {
      url,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.classification) {
          setClassification(response.data.classification);
          setCalories(response.data.calories);
          setProtein(response.data.protein);
          setCarb(response.data.carbs);
          setFat(response.data.fats);
          setConfidence(response.data.confidence);
        } else {
          setClassification('failed');
        }
        
      })
      .catch((error) => {
        setClassification('failed');
        console.log(error.message);
      });
  };

  async function onPictureSaved(photo) {
    cameraRef.pausePreview();
    setShowForm(true);
    if (photo.uri.substring(0,4) == 'file') {
      const file = {
        uri: photo.uri,
        name: storedUserName + Date.now().toString(),
        type: 'image/jpeg',
      }
  
      RNS3.put(file, options).then(response => {
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");
        console.log(response.body.postResponse.location);
        setImageUrl(response.body.postResponse.location);
        classifyImage(response.body.postResponse.location);
      });
    } else {
      const response = await fetch(photo.uri);
      const blob = await response.blob();
      uploadImageToS3(blob);
    }
  }

  const takePicture = () => {
    if (cameraRef) {
      cameraRef.takePictureAsync({ onPictureSaved });
    }
  };

  const submitForm = () => {
    console.log('form submit');
    console.log(classification);
    if (classification !== '' && classification !== 'failed') {
      axios.post('https://macro-cs98.herokuapp.com/api/food', {
        username: storedUserName,
        customName,
        description,
        mealTime,
        mood,
        publicFood,
        imageUrl,
        classification,
        calories,
        protein,
        carb,
        fat,
        confidence,
      })
        .then((response) => {
          console.log(response.data);
          addItem(response.data);
          cameraRef.resumePreview();
          setShowForm(false);
          setCustomName('');
          setDescription('');
          navigation.navigate('Breakdown');
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    else if (classification === 'failed') {
      setErrorMessage('classification failed. would you like to create a manual entry?');
      setShowError(true);
      setCorrectError(true);
      setShowForm(false);
    } else if (classification === '') {
      setErrorMessage('still classifying... try again in a moment!');
      setShowError(true);
      setShowForm(false);
      setTimeout(() => {
        setShowError(false);
        setShowForm(true);
      }, 2000);
    }
  }

  const resetForm = () => {
    cameraRef.resumePreview();
    setShowForm(false);
    setShowError(false);
    setCorrectError(false);
    setCustomName('');
    setDescription('');
    setClassification('');
  }

  const updateFieldsSimple = (s) => {
    setSimple(s);
    if (s) {
      setPublicFood(0);
      setMood('neutral');
      setCustomName('');
      setDescription('auto-generated entry');

      var today = new Date()
      var curHr = today.getHours()
      if (curHr < 11) {
        setMealTime('breakfast');
      } else if (curHr < 16) {
        setMealTime('lunch');
      } else if (curHr < 21) {
        setMealTime('dinner');
      } else {
        setMealTime('snack');
      }
    } else {
      setPublicFood(1);
      setMood('positive');
      setMealTime('breakfast');
      setDescription('');
    }
  }

  return (
    <View style={styles.container}>
      {hasPermission
      && (
      <Camera style={{
        width: '100%', height: '100%', display: 'flex', justifyContent: 'center',
      }}
        type={type}
        ref={(ref) => { setCameraRef(ref); }}
      >
        {!showForm && !showError
        && (
        <View style={styles.navBtnsWrapper}>
          <TouchableOpacity
            style={styles.navTertBtn}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          >
            <Text>
              <Icon name="rotate-left" color="white" style={{ fontSize: 0.05 * windowWidth }} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navTertBtnLeft}
            onPress={() => { navigation.navigate('User'); }}
          >
            <Text>
              <Icon name="gears" color="white" style={{ fontSize: 0.05 * windowWidth }} />
            </Text>
          </TouchableOpacity>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
          >
            <TouchableOpacity 
              onPress={() => { navigation.navigate('Community'); }}
              style={styles.navSecBtn}
            >
              <Text>
                <Icon name="users" color="white" style={{ fontSize: 0.08 * windowWidth }} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takePicture}
              style={styles.navPrimBtn}
            >
              <Text>
                <Icon name="camera" color="white" style={{ fontSize: 0.1 * windowWidth }} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { navigation.navigate('History'); }}
              style={styles.navSecBtn}
            >
              <Text>
                <Icon name="pie-chart" color="white" style={{ fontSize: 0.08 * windowWidth }} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
        {showForm
        && (
        <View style={styles.formWrapper}>
          <View style={styles.formToggle}>
            <TouchableOpacity 
              style={{ backgroundColor: simple ? '#DC95FE' : '#e7b3ff' }}
              onPress={() => { updateFieldsSimple(true); }}
            >
              <Text style={{ color: 'white', fontSize: 16, padding: 8 }}>simple</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ backgroundColor: simple ? '#e7b3ff' : '#DC95FE' }}
              onPress={() => { updateFieldsSimple(false); }}
            >
              <Text style={{ color: 'white', fontSize: 16, padding: 8 }}>complex</Text>
            </TouchableOpacity>
          </View>
          { simple &&
          <View style={styles.mainFormElement}>
            <Text style={{ color: 'white', fontSize: 16 }}>simple entries will autofill all fields for you. choose a complex entry to have more control over your food journal!</Text>
          </View>
          }
          { !simple &&
          <View>
            <TextInput
            style={styles.mainFormElement}
            onChangeText={setCustomName}
            value={customName}
            placeholder="[optional] custom name"
            placeholderTextColor="white"
            />
            <TextInput
            style={styles.mainFormElement}
            onChangeText={setDescription}
            value={description}
            placeholder="[optional] description"
            placeholderTextColor="white"
            />
            <Picker
              style={styles.mainFormElement}
              selectedValue={mealTime}
              onValueChange={(itemValue, itemIndex) => setMealTime(itemValue)}
            >
              <Picker.Item label="breakfast" value="breakfast" style={{ color: 'white' }} />
              <Picker.Item label="lunch" value="lunch" />
              <Picker.Item label="dinner" value="dinner" />
              <Picker.Item label="snack" value="snack" />
            </Picker>
            <View style={styles.mainFormElement}>
              <Text style={{ color: 'white', fontSize: 16 }}>current mood</Text>
              <View style={styles.formIconSelect}>
                <TouchableOpacity onPress={() => { setMood('positive'); }} style={{ 
                  borderWidth: mood === 'positive' ? 2 : 0,
                  borderColor: 'white',
                  padding: 3,
                  borderRadius: 999,
                }}>
                  <Image source={positiveMood} style={{ width: 0.1 * windowWidth, height: 0.1 * windowWidth }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setMood('neutral'); }} style={{ 
                  borderWidth: mood === 'neutral' ? 2 : 0,
                  borderColor: 'white',
                  padding: 3,
                  borderRadius: 999,
                }}>
                  <Image source={neutralMood} style={{ width: 0.1 * windowWidth, height: 0.1 * windowWidth }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setMood('negative'); }} style={{ 
                  borderWidth: mood === 'negative' ? 2 : 0,
                  borderColor: 'white',
                  padding: 3,
                  borderRadius: 999,
                }}>
                  <Image source={negativeMood} style={{ width: 0.1 * windowWidth, height: 0.1 * windowWidth }} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.mainFormElement}>
              <Text style={{ color: 'white', fontSize: 16 }}>make public?</Text>
              <View style={styles.formIconSelect}>
                <TouchableOpacity onPress={() => { setPublicFood(1); }} style={{ 
                  borderWidth: publicFood === 1 ? 2 : 0,
                  borderColor: 'white',
                  padding: 3,
                  borderRadius: 999,
                }}>
                  <Text style={{ color: 'white', fontSize: 14 }}>yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setPublicFood(0); }} style={{ 
                  borderWidth: publicFood === 0 ? 2 : 0,
                  borderColor: 'white',
                  padding: 3,
                  borderRadius: 999,
                }}>
                  <Text style={{ color: 'white', fontSize: 14 }}>no</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          }
          <View style={styles.formBtnWrapper}>
            <TouchableOpacity onPress={submitForm} style={styles.mainFormBtn}>
              <Text style={{ color: 'white', fontSize: 16 }}>submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetForm} style={styles.mainFormBtn}>
              <Text style={{ color: 'white', fontSize: 16 }}>cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
        {showError
        && (
        <View style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          justifyContent: 'center',
        }}
        >
           <View style={[ styles.mainFormElement, { textAlign: 'center' } ]}><Text style={styles.boldWhiteText}>{errorMessage}</Text></View>
           {correctError
           && (
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              width: '50%',
              justifyContent: 'space-evenly',
            }}>
              <TouchableOpacity onPress={() => { navigation.navigate('Manual', { imageUrl: imageUrl, foodId: null }); }} style={styles.mainFormBtn}>
                <Text style={{ color: 'white', fontSize: 16 }}>yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={resetForm} style={styles.mainFormBtn}>
                <Text style={{ color: 'white', fontSize: 16 }}>no</Text>
              </TouchableOpacity>
            </View>
           )}
        </View>
        )}
      </Camera>
      )}
      {!hasPermission
      && (
        <View>
          <Text style={styles.secFontBold}>macro needs camera permission!</Text>
        </View>
      )}
    </View>
  );
}

const mapStateToProps = (state) => ({
  storedUserName: state.user.name,
});

MainScreen.propTypes = {
  storedUserName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(MainScreen);
