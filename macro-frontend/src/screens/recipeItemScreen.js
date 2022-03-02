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
          <Text style={styles.ingredientAmount}>
            {foodItem.amount}
            {' '}
            {foodItem.unit }
          </Text>
          <Text style={styles.ingredientTitle}>{foodItem.name}</Text>
        </View>
      );
    }));
  };

  // loops through and displays the instructions
  const instructionDisplay = () => {
    return (singleRecipe.instructions[0].steps.map((stepItem) => {
      return (
        <View key={stepItem.number} style={styles.instructionCardContainer}>
          <Text style={styles.instructionText}>
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
            <Image
              source={{ uri: `${singleRecipe.ingredients.image}` }}
              style={styles.titleImage}
            />
            <Text style={styles.titleText}>{singleRecipe.ingredients.title}</Text>
          </View>

          {/* displaying the ingredients */}
          <View style={styles.ingredientContainer}>
            <ScrollView style={styles.ingredientScroll} horizontal>
              {ingredientsDisplay()}
            </ScrollView>
          </View>

          <View style={styles.instructionConatiner}>
            <ScrollView style={styles.instructionScroll}>
              {instructionDisplay()}
            </ScrollView>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.recipeContainer}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <View>
          <Text>Back</Text>
        </View>
      </TouchableOpacity>
      {loading()}
    </SafeAreaView>
  );
}

export default RecipeScreen;
