import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  StyleSheet, Text, Image, View, Dimensions, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import {
  useFonts,
  Dosis_400Regular,
} from '@expo-google-fonts/dosis';
import { fetchRecipe, fetchRecipeInfo } from '../../redux/actions/spoonacularActions';
import styles from '../../styles';

const windowWidth = Dimensions.get('window').width;

const positiveMood = require('../../img/positiveMood.png');
const neutralMood = require('../../img/neutralMood.png');
const negativeMood = require('../../img/negativeMood.png');

const MealCard = (props) => {
  const [fontsLoaded] = useFonts({
    Dosis_400Regular,
  });

  const allRecipes = useSelector((state) => state.recipe);
  const individRecipe = useSelector((state) => state.recipe);
  const dispatch = useDispatch();

  const {
    id, mealName, description, time, totalCal, foodImg, classification, protein, fat, carb, mood, username, historyPage,
  } = props;
  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  /* need to fix so only dispatches on expansion */

  let moodImage = null;
  if (mood === 'positive') { moodImage = positiveMood; } else if (mood === 'neutral') { moodImage = neutralMood; } else { moodImage = negativeMood; }

  const [expand, setExpand] = useState(false);
  const [favorite, setFavorite] = useState(null);
  const [confirmScreen, setConfirmScreen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [recipeExpand, setRecipeExpand] = useState(false);
  const [didRecipeInfo, setRecipeInfo] = useState(false);

  /* jank wiring, will replace later */
  const [recipe1, setRecipe1] = useState(0);
  const [recipe2, setRecipe2] = useState(false);
  const [recipe3, setRecipe3] = useState(false);
  const [count, setCount] = useState(0);

  const handleFavoritePress = () => {
    if (favorite) { // if is a favorite, need to delete
      axios.post('https://macro-cs98.herokuapp.com/api/fav/delete', {
        foodId: id, username,
      })
        .then((response) => {
          if (response.data) {
            setFavorite(false);
          }
        })
        .catch((error) => {
          console.log('Error in handleFavoritePress:');
          console.log(error.message);
        });
    } else {
      axios.post('https://macro-cs98.herokuapp.com/api/fav/new', {
        foodId: id, username,
      })
        .then((response) => {
          if (response.data) {
            setFavorite(true);
          }
        })
        .catch((error) => {
          console.log('Error in handleFavoritePress:');
          console.log(error.message);
        });
    }
  };

  const handleDeletePress = () => {
    if (!confirmScreen) {
      setConfirmScreen(true);
    } else {
      axios.post('https://macro-cs98.herokuapp.com/api/food/delete', {
        id,
      })
        .then((response) => {
          console.log(`Deleted Food: ${id}`);
          setDeleted(true);
        })
        .catch((error) => {
          console.log('Error in handleDeletePress:');
          console.log(error.message);
        });
    }
  };

  const getFavoriteStatus = () => {
    axios.post('https://macro-cs98.herokuapp.com/api/fav/check', {
      foodId: id, username,
    })
      .then((response) => {
        if (response.data) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  if (favorite === null) {
    getFavoriteStatus();
  }

  const retrieveRecipe = (foodItem) => {
    dispatch(fetchRecipe(foodItem));
    setExpand(!expand);
  };

  // HERE IS THE PROBLEM
  const mapSpoonacular = () => {
    if (allRecipes.all.length === 0) {
      return (
        <View
          style={styles.suggestedRecipeCard}
        >
          <Text style={styles.mealCardRecipeFont}>No items found!</Text>
        </View>
      );
    }
    return (allRecipes.all.map((item) => {
      return (
        <TouchableOpacity key={item.id} style={styles.suggestedRecipeCard} onPress={() => { getRecipeSteps(item.id); }}>
          <Text style={styles.mealCardRecipeFont}>{item.title}</Text>
        </TouchableOpacity>
      );
    }));
  };

  return (
    <View>
      {!confirmScreen
      && (
      <TouchableOpacity style={[styles.overallContainer, { height: expand ? 1 * windowWidth : 0.4 * windowWidth }]} onPress={() => { retrieveRecipe(classification); }}>
        <Icon name={expand ? 'compress' : 'expand'}
          color="#54595F"
          style={{
            fontSize: 0.06 * windowWidth, position: 'absolute', top: 8, right: 8,
          }}
        />
        <TouchableOpacity
          style={{
            position: 'absolute', bottom: 4, right: 4, padding: 4, zIndex: 2,
          }}
          onPress={() => { handleFavoritePress(); }}
        >
          <Text style={StyleSheet.absoluteFillObject} />
          <View>
            <Icon name={favorite ? 'heart' : 'heart-o'} color="#f66" style={{ fontSize: 0.06 * windowWidth }} />
          </View>
        </TouchableOpacity>
        { historyPage
      && (
      <TouchableOpacity
        style={{
          position: 'absolute', bottom: 4, left: 4, padding: 4, zIndex: 2,
        }}
        onPress={() => { handleDeletePress(); }}
      >
        <Text style={StyleSheet.absoluteFillObject} />
        <View>
          <Icon name="trash-o" color="#54595F" style={{ fontSize: 0.06 * windowWidth }} />
        </View>
      </TouchableOpacity>
      )}
        { !expand
          && (
            <View style={styles.mealText}>
              <Image
                style={styles.foodImage}
                source={{ uri: `${foodImg}` }}
              />
              {/* the food information */}
              <View style={styles.allMealInfo}>
                <View styles={styles.mealNameContainer}><Text style={styles.mealNameText}>{(mealName || classification)}</Text></View>
                <View style={styles.mealColumn}>
                  <Text style={styles.secFont}>
                    {monthArray[parseInt(time.substring(5, 7)) - 1]}
                    {' '}
                    {time.substring(8, 10)}
                    ,
                    {' '}
                    {time.substring(0, 4)}
                  </Text>
                  <View style={styles.flexRow}>
                    <Text style={styles.primFontBold}>Food: </Text>
                    <Text style={styles.secFont}>{classification}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

        { expand
          && (
            <View style={styles.mealCardContainerExpand}>

              <Text style={styles.mealNameTextExp}>{classification}</Text>

              <View style={styles.mealCardExpandView}>
                <Image
                  style={styles.foodImageExpand}
                  source={{ uri: `${foodImg}` }}
                />

                <View style={styles.mealCardColumnExpand}>
                  <View style={styles.flexRow}>
                    <Text style={styles.primFontBold}>Calories: </Text>
                    <Text style={styles.secFont}>{totalCal}</Text>
                  </View>
                  <View style={styles.flexRow}>
                    <Text style={styles.primFontBold}>Protein: </Text>
                    <Text style={styles.secFont}>
                      {protein}
                      g
                    </Text>
                  </View>
                  <View style={styles.flexRow}>
                    <Text style={styles.primFontBold}>Carbs: </Text>
                    <Text style={styles.secFont}>
                      {carb}
                      g
                    </Text>
                  </View>
                  <View style={styles.flexRow}>
                    <Text style={styles.primFontBold}>Fats: </Text>
                    <Text style={styles.secFont}>
                      {fat}
                      g
                    </Text>
                  </View>
                  <View style={styles.mealColumn}>
                    <Text style={styles.primFontBold}>Description:</Text>
                    <Text style={styles.secFont}>{description || 'N/A'}</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.subsectionHeader}>related foods</Text>

              <View style={styles.suggestedRecipeContainer}>
                {mapSpoonacular()}
              </View>
            </View>
          )}

      </TouchableOpacity>
      )}
      { confirmScreen
    && (
    <View>
      { !deleted
      && (
      <View style={[styles.overallContainerVertical, { height: 0.4 * windowWidth }]}>
        <Text>delete this item?</Text>
        <View style={styles.centerMe}>
          <TouchableOpacity
            style={[styles.dangerBtn, { marginRight: 10 }]}
            onPress={() => { handleDeletePress(); }}
          >
            <Text style={{ color: 'white' }}>delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.authBtn}
            onPress={() => { setConfirmScreen(false); }}
          >
            <Text style={{ color: 'white' }}>cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
      )}
    </View>
    )}
    </View>
  );
};

export default MealCard;
