import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Image, View, Animated, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import styles from '../styles';

const macroLogo = require('../../assets/macroLogo.png');
const macroTagline = require('../../assets/macroTagline.png');
const windowWidth = Dimensions.get('window').width;

const AppLoadingScreen = ({ navigation, isUserLoggedIn, login }) => {
  const fadeAnimation = new Animated.Value(0);

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, [])

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  setTimeout(() => {
    fadeIn();
  }, 500);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storedUsername')
      if(value !== null) {
        console.log(value);
        login(value);
        fadeOut();
        setTimeout(() => {
          navigation.navigate('Main');
        }, 500)
      } else {
        fadeOut();
        navigation.navigate('Login');
      }
    } catch(e) {
      console.log('Error fetching username: ' + e);
    }
  }
  return (
    <View style={styles.container}>
      <Animated.View style={[ styles.centerMeColumn, { opacity: fadeAnimation } ]}>
        <Image source={macroLogo} style={{ height: 0.1 * windowWidth, width: 0.49 * windowWidth, }} />
        <Image source={macroTagline} style={{ height: 0.05 * windowWidth, width: 0.45 * windowWidth, }} />
      </Animated.View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  login: (name) => dispatch(userLogin({ name })),
});

AppLoadingScreen.propTypes = {
  login: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLoadingScreen);
