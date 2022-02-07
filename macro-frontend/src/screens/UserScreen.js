import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableOpacity, Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { userLogout } from '../redux/actions/userActions';
import styles from '../styles';

const windowWidth = Dimensions.get('window').width;

function UserScreen({ navigation, storedUserName, recipe }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
    navigation.navigate('Logout');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navTertBtnLeft} onPress={() => { navigation.navigate('Main'); }}>
        <Icon name="camera" color="white" style={{ fontSize: 0.05 * windowWidth }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.authBtn} onPress={handleLogout}>
        <Text style={styles.authBtnFont}>logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.mainFormBtn} onPress={() => { navigation.navigate('Testing'); }}>
        <Text style={{ color: 'white', fontSize: 16 }}>testing page</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = (state) => ({
  storedUserName: state.user.name,
});

UserScreen.propTypes = {
  storedUserName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(UserScreen);
