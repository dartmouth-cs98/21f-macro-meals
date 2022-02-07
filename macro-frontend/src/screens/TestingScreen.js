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

  return (
    <View style={styles.container}>
      <Text>Hello: Here is the result</Text>
      {/* mapping through each of the items in allRecipes */}

      <TouchableOpacity style={styles.mainFormBtn} onPress={() => dispatch(fetchRecipe('pasta', 'chicken'))}>
        <Text style={{ color: 'white', fontSize: 16 }}>getting the recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TestingScreen;
