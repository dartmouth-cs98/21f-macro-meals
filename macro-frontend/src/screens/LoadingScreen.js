import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const handleClick = (isUserLoggedIn, navigation) => (
  isUserLoggedIn
    ? navigation.navigate('App')
    : navigation.navigate('Login')
);

const AppLoadingScreen = ({ navigation, isUserLoggedIn }) => (
  <TouchableWithoutFeedback onPress={() => handleClick(isUserLoggedIn, navigation)}>
    <View>
      <View>
        <Text>macro</Text>
        <Text>loading screen</Text>
      </View>
      <View>
        <Text>touch anywhere to begin</Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

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
