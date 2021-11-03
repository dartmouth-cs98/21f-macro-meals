import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Camera } from 'expo-camera';
// import { uploadImage } from '../../s3';
import MacroPieChart from '../../components/macro-breakdown/macro-individuals';
import { addFood } from '../redux/actions/foodActions';
import { userLogout } from '../redux/actions/userActions';

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

/*
const onImageUpload = (event) => {
  const file = event.target.files[0];
  uploadImage(file).then((url) => {
    console.log(url);
  }).catch((error) => {
    console.log(error);
  });
};
*/

function MainScreen({ navigation, storedUserName }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const dispatch = useDispatch();
  const addItem = (value) => {
    dispatch(addFood(value));
  };

  const getChicken = () => {
    axios
      .get('https://macro-cs98.herokuapp.com/api/food/617ee2b5ebd992f144f45fa6')
      .then((response) => {
        alert(JSON.stringify(response.data));
        addItem(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const getRice = () => {
    axios
      .get('https://macro-cs98.herokuapp.com/api/food/61770d63cfcdd246b56af251')
      .then((response) => {
        alert(JSON.stringify(response.data));
        addItem(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

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

  return (
    <View style={styles.container}>

      <MacroPieChart />
      <Text style={{ fontSize: 30, textAlign: 'center' }}>
        {`Hey, ${storedUserName}!`}
      </Text>
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
        onPress={getChicken}
      >
        <Text>Add Chicken To Breakdown</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={getRice}
      >
        <Text>Add Rice To Breakdown</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Breakdown')}
        style={styles.buttonStyle}
      >
        <Text>Go To Breakdown Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.buttonStyle}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
      {hasPermission
      && (
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
