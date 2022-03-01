import React, { useEffect } from 'react';
import {
  View, Text, TouchableOpacity, Dimensions,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipeInstructions, fetchIngredients } from '../redux/actions/spoonacularActions';

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
        <View key={foodItem.id}>
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
        <View key={stepItem.id}>
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
        <View>
          {/* displaying the title and image */}
          <View>
            <Text>{singleRecipe.ingredients.title}</Text>
          </View>

          {/* displaying the ingredients */}
          <View>
            {ingredientsDisplay()}
          </View>

          {/* displaying the instructions */}
          <View>
            {instructionDisplay()}
          </View>
        </View>
      );
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View>
          <Text>Press Me</Text>
        </View>
      </TouchableOpacity>
      {loading()}
    </View>
  );
}

export default RecipeScreen;
