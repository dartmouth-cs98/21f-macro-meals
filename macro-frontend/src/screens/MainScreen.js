import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Camera } from 'expo-camera';
import { uploadImage } from '../../s3';
import { userLogout } from '../redux/actions/userActions';

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

  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonStyle: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      width: '100%',
      marginTop: 16,
    },
  };

  async function onPictureSaved(photo) {
    console.log(photo);
    const response = await fetch(photo.uri);
    const blob = await response.blob();
    uploadImageToS3(blob);
    // uploadImageToS3(asset);
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
            style={{
              position: 'absolute',
              top: '4vw',
              right: '4vw',
              backgroundColor: '#339DFF',
              width: '10vw',
              height: '10vw',
              border: '3px solid white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '1000px',
            }}
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
            <TouchableOpacity
              style={{
                backgroundColor: '#339DFF',
                width: '16vw',
                height: '16vw',
                border: '3px solid white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '12px',
              }}
            >
              <Text>
                <Icon name="user" color="white" style={{ fontSize: '8vw' }} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takePicture}
              style={{
                backgroundColor: '#339DFF',
                width: '28vw',
                height: '28vw',
                border: '4px solid white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '1000px',
                margin: '4vw',
              }}
            >
              <Text>
                <Icon name="camera" color="white" style={{ fontSize: '10vw' }} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { navigation.navigate('Breakdown'); }}
              style={{
                backgroundColor: '#339DFF',
                width: '16vw',
                height: '16vw',
                border: '3px solid white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '12px',
              }}
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
