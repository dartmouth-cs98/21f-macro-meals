import React, { useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity, Dimensions, SafeAreaView, ScrollView,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipeInstructions, fetchIngredients } from '../redux/actions/spoonacularActions';
import styles from '../styles';

function RecipeScreen({ navigation }) {
  // check if it is loading

  const singleRecipe = useSelector((state) => state.recipe);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients(navigation.state.params.id));
    dispatch(fetchRecipeInstructions(navigation.state.params.id));
  }, []);

  // loops through and creates containers for the recipes
  const ingredientsDisplay = () => {
    return (singleRecipe.ingredients.extendedIngredients.map((foodItem) => {
      return (
        <View key={foodItem.id} style={styles.ingredientCardContainer}>
          <Text>{foodItem.name}</Text>
          <Text>
            {foodItem.amount}
            {' '}
            {foodItem.unit}
          </Text>
        </View>
      );
    }));
  };

  // loops through and displays the instructions
  const instructionDisplay = () => {
    return (singleRecipe.instructions[0].steps.map((stepItem) => {
      return (
        <View key={stepItem.number}>
          <Text>
            {stepItem.number}
            {' '}
            {stepItem.step}
          </Text>
        </View>
      );
    }));
  };

  const sanityCheck = () => {
    console.log(singleRecipe);
  };

  // while it is not loaded
  const loading = () => {
    if (!singleRecipe.ingredients || !singleRecipe.instructions) {
      return (
        <View>
          <Text>We're fetching the recipe!</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.informationContainer}>
          {/* displaying the title and image */}
          <View style={styles.titleContainer}>
            <Text>{singleRecipe.ingredients.title}</Text>
            <Image
              source={{ uri: `${singleRecipe.ingredients.image}` }}
              style={styles.titleImage}
            />
          </View>

          {/* displaying the ingredients
          <View style={styles.ingredientContainer}>
            {ingredientsDisplay()}
          </View>

          {/* displaying the instructions
          <View>
            {instructionDisplay()}
          </View>
          */}
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.recipeContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View>
          <Text>Go Back</Text>
        </View>
      </TouchableOpacity>
      {loading()}
    </SafeAreaView>
  );
}

export default RecipeScreen;
