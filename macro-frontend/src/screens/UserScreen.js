import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { userLogout } from '../redux/actions/userActions';
import styles from '../styles';

import {fetchRecipe} from '../redux/actions/spoonacularActions';


const windowWidth = Dimensions.get('window').width;

function UserScreen({ navigation, storedUserName, recipe }) {
  const dispatch = useDispatch();

  // Spoonacular API
  const recipeHandler = () => {
    dispatch(fetchRecipe("pasta", "chicken"));
  };

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
      <TouchableOpacity style={styles.mainFormBtn} onPress={recipeHandler}>
        <Text style={{ color: 'white', fontSize: 16 }}>logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = (state) => ({
  storedUserName: state.user.name,
  recipe: state.all,
});

UserScreen.propTypes = {
  storedUserName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(UserScreen);
