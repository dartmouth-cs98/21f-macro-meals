import React from 'react';
import {
  Image, View, Animated, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles';

const macroLogo = require('../../assets/macroLogo.png');

const windowWidth = Dimensions.get('window').width;

const handleLoad = (isUserLoggedIn, navigation) => (
  isUserLoggedIn
    ? navigation.navigate('Main')
    : navigation.navigate('Login')
);

const AppLoadingScreen = ({ navigation, isUserLoggedIn }) => {
  const fadeAnimation = new Animated.Value(0);

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

  setTimeout(() => {
    fadeOut();
  }, 2500);

  setTimeout(() => {
    handleLoad(isUserLoggedIn, navigation);
  }, 3000);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnimation,
          },
        ]}
      >
        <Image source={macroLogo}
          style={{
            width: 0.7 * windowWidth, height: 0.35 * windowWidth,
          }}
        />
      </Animated.View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.user.isLoggedIn,
});

AppLoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(AppLoadingScreen);
