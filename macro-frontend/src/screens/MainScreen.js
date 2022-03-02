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
  bucket: "macro-meals-food-images",
  region: "us-east-1",
  accessKey: "AKIA2NYKPWHN3VHSQPIE",
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
  const [classificationTwo, setClassificationTwo] = useState('');
  const [classificationThree, setClassificationThree] = useState('');
  const [classificationStatus, setClassificationStatus] = useState('classifying');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carb, setCarb] = useState('');
  const [fat, setFat] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [caloriesTwo, setCaloriesTwo] = useState('');
  const [proteinTwo, setProteinTwo] = useState('');
  const [carbTwo, setCarbTwo] = useState('');
  const [fatTwo, setFatTwo] = useState('');
  const [confidenceTwo, setConfidenceTwo] = useState(0);
  const [caloriesThree, setCaloriesThree] = useState('');
  const [proteinThree, setProteinThree] = useState('');
  const [carbThree, setCarbThree] = useState('');
  const [fatThree, setFatThree] = useState('');
  const [confidenceThree, setConfidenceThree] = useState(0);
  const [simple, setSimple] = useState(false);
  const [manualInput, setManualInput] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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
        if (response.data.one) {
          setClassification(response.data.one.food);
          setClassificationStatus('ready');
          setCalories(response.data.one.calorie);
          setProtein(response.data.one.protein);
          setCarb(response.data.one.carb);
          setFat(response.data.one.fat);
          setConfidence(response.data.one.confidence);
          setClassificationTwo(response.data.two.food);
          setCaloriesTwo(response.data.two.calorie);
          setProteinTwo(response.data.two.protein);
          setCarbTwo(response.data.two.carb);
          setFatTwo(response.data.two.fat);
          setConfidenceTwo(response.data.two.confidence);
          setClassificationThree(response.data.three.food);
          setCaloriesThree(response.data.three.calorie);
          setProteinThree(response.data.three.protein);
          setCarbThree(response.data.three.carb);
          setFatThree(response.data.three.fat);
          setConfidenceThree(response.data.three.confidence);
        } else {
          setClassification('failed');
          setClassificationStatus('failed');
        }
        
      })
      .catch((error) => {
        setClassification('failed');
        setClassificationStatus('failed');
        console.log(error.message);
      });
  };

  async function onPictureSaved(photo) {
    cameraRef.pausePreview();
    setShowForm(true);
    console.log(photo.uri);
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
        calories: parseFloat(calories),
        protein: parseFloat(protein),
        carb: parseFloat(carb),
        fat: parseFloat(fat),
        confidence,
        classificationTwo,
        caloriesTwo: parseFloat(caloriesTwo),
        proteinTwo: parseFloat(proteinTwo),
        carbTwo: parseFloat(carbTwo),
        fatTwo: parseFloat(fatTwo),
        confidenceTwo,
        classificationThree,
        caloriesThree: parseFloat(caloriesThree),
        proteinThree: parseFloat(proteinThree),
        carbThree: parseFloat(carbThree),
        fatThree: parseFloat(fatThree),
        confidenceThree,
        correctClassification: 1,
      })
        .then((response) => {
          console.log(response.data);
          addItem(response.data);
          resetForm();
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
    setManualInput(false);
    setCustomName('');
    setDescription('');
    setClassification('');
    setClassificationStatus('classifying');
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
        {!showForm && !showError && !manualInput && !showInfo
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
            style={styles.navQuadBtnLeft}
            onPress={() => { setShowInfo(true); }}
          >
            <Text style={{ fontSize: 0.05 * windowWidth, fontWeight: 'bold', color: 'white' }}>beta <Icon name="info-circle" color="white" style={{ fontSize: 0.05 * windowWidth }} /></Text>
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
        {showInfo
        && (
        <View style={[ styles.formWrapper, { justifyContent: 'center' }]}>
          <View style={styles.mainFormElement}>
            <Text style={{ color: 'white', fontSize: 16 }}>macro is still in beta and is capable of recognizing the following foods:</Text>
            <Text style={{ color: 'white', fontSize: 16 }}>apple</Text>
            <Text style={{ color: 'white', fontSize: 16 }}>banana</Text>
            <Text style={{ color: 'white', fontSize: 16 }}>onion</Text>
          </View>
          <View style={styles.formBtnWrapper}>
            <TouchableOpacity onPress={() => { setShowInfo(false); }} style={styles.mainFormBtn}>
              <Text style={{ color: 'white', fontSize: 16 }}>close</Text>
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
          <View style={styles.mainFormElement}>
            <Text style={{ color: 'white', fontSize: 12 }}>status: {classificationStatus}</Text>
          </View>
          <View style={styles.formBtnWrapper}>
            <TouchableOpacity 
              onPress={classificationStatus !== 'classifying' ? submitForm : null } 
              disabled={classificationStatus !== 'classifying' ? false : true } 
              style={classificationStatus !== 'classifying' ? styles.mainFormBtn : styles.mainFormBtnDisabled }
            >
              <Text style={{ color: 'white', fontSize: 16 }}>submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetForm} style={styles.mainFormBtn}>
              <Text style={{ color: 'white', fontSize: 16 }}>cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
        {manualInput
        && (
          <View style={styles.formWrapper}>
            <TextInput
            style={styles.mainFormElement}
            onChangeText={setClassification}
            value={classification}
            placeholder="classification [ex. apple]"
            placeholderTextColor="white"
            />
            <View style={[ styles.mainFormElement, styles.flexCol, { width: '90%' } ]}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>calories</Text>
              <TextInput
              onChangeText={setCalories}
              keyboardType='numeric'
              value={calories}
              placeholder="[ex. 150]"
              placeholderTextColor="white"
              style={{ marginBottom: 10 }}
              />
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>macros</Text>
              <View style={styles.centerMeEvenly}>
                <View style={styles.flexCol}>
                  <Text style={{ color: 'white', fontSize: 16 }}>protein</Text>
                  <TextInput
                  onChangeText={setProtein}
                  keyboardType='numeric'
                  value={protein}
                  placeholder="[ex. 20]"
                  placeholderTextColor="white"
                  />
                </View>
                <View style={styles.flexCol}>
                  <Text style={{ color: 'white', fontSize: 16 }}>carbs</Text>
                  <TextInput
                  onChangeText={setCarb}
                  keyboardType='numeric'
                  value={carb}
                  placeholder="[ex. 40]"
                  placeholderTextColor="white"
                  />
                </View>
                <View style={styles.flexCol}>
                  <Text style={{ color: 'white', fontSize: 16 }}>fats</Text>
                  <TextInput
                  onChangeText={setFat}
                  keyboardType='numeric'
                  value={fat}
                  placeholder="[ex. 10]"
                  placeholderTextColor="white"
                  />
                </View>
              </View>
            </View>
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
              <TouchableOpacity onPress={() => { setClassification(''); setClassificationStatus('classifying'); setManualInput(true); setShowError(false); setCorrectError(false); }} style={styles.mainFormBtn}>
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
