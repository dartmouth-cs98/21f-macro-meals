import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { userLogout } from '../redux/actions/userActions';
import styles from '../styles';

const windowWidth = Dimensions.get('window').width;

function UserScreen({ navigation, storedUserName }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
    navigation.navigate('Logout');
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.navigate('Main'); }}>
        <Icon name="arrow-left" color="white" style={{ fontSize: 0.05 * windowWidth }} />
      </TouchableOpacity>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>Hi, {storedUserName}!</Text>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>This screen is coming soon!</Text>
      <TouchableOpacity style={styles.mainFormBtn} onPress={handleLogout}>
        <Text style={{ color: 'white', fontSize: 16 }}>logout</Text>
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
