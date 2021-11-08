import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Camera } from 'expo-camera';
import { uploadImage } from '../../s3';
import { userLogout } from '../redux/actions/userActions';
import styles from '../styles';

const uploadImageToS3 = (file) => {
  console.log(file);
  uploadImage(file).then((url) => {
    alert(url);
  }).catch((error) => {
    alert(error);
  });
};

function MainScreen({ navigation, storedUserName }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const handleLogout = () => {
    console.log('logout');
    dispatch(userLogout());
    navigation.navigate('Logout');
  };

  async function onPictureSaved(photo) {
    console.log(photo);
    const response = await fetch(photo.uri);
    const blob = await response.blob();
    uploadImageToS3(blob);
  }

  const takePicture = () => {
    console.log('taking picture');
    console.log(cameraRef);
    if (cameraRef) {
      cameraRef.takePictureAsync({ onPictureSaved });
    }
  };

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
        <View style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          position: 'relative',
          paddingBottom: '5vw',
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
              <Icon name="rotate-left" color="white" style={{ fontSize: '5vw' }} />
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
                <Icon name="user" color="white" style={{ fontSize: '8vw' }} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takePicture}
              style={styles.navPrimBtn}
            >
              <Text>
                <Icon name="camera" color="white" style={{ fontSize: '10vw' }} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { navigation.navigate('Breakdown'); }}
              style={styles.navSecBtn}
            >
              <Text>
                <Icon name="pie-chart" color="white" style={{ fontSize: '8vw' }} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
      )}
      {!hasPermission
      && (
        <View>
          <Text>No Camera Permission</Text>
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
