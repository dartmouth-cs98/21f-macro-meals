import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import styles from '../styles';
import { fetchRecipe } from '../redux/actions/spoonacularActions';

function TestingScreen({ navigation }) {
  const allRecipes = useSelector((state) => state.recipe);
  const dispatch = useDispatch();

  const getRecipe = () => {
    console.log(allRecipes);
  };

  return (
    <View style={styles.container}>
      <Text>Hello: Here is the result</Text>
      <TouchableOpacity style={styles.mainFormBtn} onPress={getRecipe}>
        <Text style={{ color: 'white', fontSize: 16 }}>see what it is</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.mainFormBtn} onPress={() => dispatch(fetchRecipe('pasta', 'chicken'))}>
        <Text style={{ color: 'white', fontSize: 16 }}>getting the recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TestingScreen;
