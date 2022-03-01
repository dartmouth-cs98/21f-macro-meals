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
          {/* displaying the title */}
          <Text>{singleRecipe.ingredients.title}</Text>

          {/* displaying the ingredients */}
          <View />

          {/* displaying the instructions */}
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
