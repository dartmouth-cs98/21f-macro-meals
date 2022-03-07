import React, { useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity, Dimensions, SafeAreaView, ScrollView,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchRecipeInstructions, fetchIngredients } from '../redux/actions/spoonacularActions';
import styles from '../styles';

function RecipeScreen({ navigation }) {
  // check if it is loading
  const windowWidth = Dimensions.get('window').width;
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

  // while it is not loaded
  const loading = () => {
    if (!singleRecipe.ingredients || singleRecipe.instructions) {
      return (
        <View style={styles.loadingScreenContainer}>
          <View style={styles.loadingScreenCard}>
            <Text style={styles.titleText}>Hey – we're fetching here!</Text>
          </View>
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

          <ScrollView style={styles.ingredientScroll}>
            {/* displaying the ingredients */}
            <Text style={styles.sectionTitles}>Ingredients</Text>
            <View style={styles.ingredientContainer}>
              {ingredientsDisplay()}
            </View>

            <Text style={styles.sectionTitles}>Recipe Instructions</Text>
            <View style={styles.instructionConatiner}>
              {instructionDisplay()}
            </View>
          </ScrollView>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.recipeContainer}>
      <TouchableOpacity style={styles.navTertBtnLeft} onPress={() => navigation.goBack()}>
        <Text>
          <Icon name="arrow-left" color="white" style={{ fontSize: 0.05 * windowWidth }} />
        </Text>
      </TouchableOpacity>
      {loading()}
    </SafeAreaView>
  );
}

export default RecipeScreen;
