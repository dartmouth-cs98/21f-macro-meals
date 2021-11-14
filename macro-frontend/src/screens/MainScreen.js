import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Text, View, TouchableOpacity, Dimensions, TextInput, Picker
} from 'react-native';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Camera } from 'expo-camera';
import { uploadImage } from '../../s3';
import { userLogout } from '../redux/actions/userActions';
import styles from '../styles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MainScreen({ navigation, storedUserName }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [mealTime, setMealTime] = useState('breakfast');
  const [mood, setMood] = useState('positive');
  const [imageUrl, setImageUrl] = useState('');
  const [classification, setClassification] = useState('');
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carb, setCarb] = useState(0);
  const [fat, setFat] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const handleLogout = () => {
    dispatch(userLogout());
    navigation.navigate('Logout');
  };

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
        setClassification(response.data.classification);
        setCalories(response.data.calories);
        setProtein(response.data.protein);
        setCarb(response.data.carb);
        setFat(response.data.fat);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  async function onPictureSaved(photo) {
    cameraRef.pausePreview();
    const response = await fetch(photo.uri);
    const blob = await response.blob();
    setShowForm(true);
    uploadImageToS3(blob);
  }

  const takePicture = () => {
    if (cameraRef) {
      cameraRef.takePictureAsync({ onPictureSaved });
    }
  };

  const submitForm = () => {
    console.log('form submit');
    axios.post('https://macro-cs98.herokuapp.com/api/saveFood', {
      username: storedUserName,
      customName,
      mealTime,
      mood,
      imageUrl,
      classification,
      calories,
      protein,
      carb,
      fat,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
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
        {!showForm
        && (
        <View style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          position: 'relative',
          paddingBottom: 0.05 * windowWidth,
        }}
        >
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
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
          >
            <TouchableOpacity style={styles.navSecBtn}>
              <Text>
                <Icon name="user" color="white" style={{ fontSize: 0.08 * windowWidth }} />
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
              onPress={() => { navigation.navigate('Breakdown'); }}
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
        <View style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          paddingTop: 0.25 * windowHeight,
          paddingBottom: 0.25 * windowHeight,
        }}
        >
          <TextInput
          style={styles.textInput}
          onChangeText={setCustomName}
          value={customName}
          placeholder="custom name (ie. chicken breast)"
          />
          <Picker
            selectedValue={mealTime}
            onValueChange={(itemValue, itemIndex) => setMealTime(itemValue)}
          >
            <Picker.Item label="breakfast" value="breakfast" />
            <Picker.Item label="lunch" value="lunch" />
            <Picker.Item label="dinner" value="dinner" />
            <Picker.Item label="snack" value="snack" />
          </Picker>
          <View>
            <Text>current mood</Text>
            <View>
              <TouchableOpacity onPress={() => { setMood('positive'); }}>
                <Text style={{ color: mood === 'positive' ? 'black' : 'red' }}>positive</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setMood('neutral') }}>
                <Text style={{ color: mood === 'neutral' ? 'black' : 'red' }}>neutral</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setMood('negative') }}>
                <Text style={{ color: mood === 'negative' ? 'black' : 'red' }}>negative</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={submitForm}>
            <Text>submit</Text>
          </TouchableOpacity>
        </View>
        )}
      </Camera>
      )}
      {!hasPermission
      && (
        <View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 0.04 * windowWidth }}>macro needs camera permission!</Text>
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
