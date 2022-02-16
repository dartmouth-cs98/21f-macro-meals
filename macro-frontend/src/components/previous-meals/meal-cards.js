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
    /* need to add use state so it is only called once */
    dispatch(fetchRecipe(foodItem));
    setExpand(!expand);
  };

  const getRecipeSteps = (mealId) => {
    if (mealId === recipe1) {
      console.log('found it');
    } else {
      setRecipe1(mealId);
      dispatch(fetchRecipeInfo(mealId));
    }
  };

  const displayRecipe = (mealId) => {
    if (mealId === recipe1 && individRecipe.individ !== undefined && individRecipe.individ.id === mealId) {
      const wordArray = individRecipe.individ.summary.split('It is brought');
      const newWordArray = wordArray[0].replace(/<\/?[^>]+(>|$)/g, '');
      return (
        <Text style={styles.subHeaderText}>
          {newWordArray}
        </Text>
      );
    }
  };

  const mapSpoonacular = () => {
    return (allRecipes.all.map((item) => {
      return (
        <TouchableOpacity key={item.id} style={styles.suggestedRecipeCard} onPress={() => { getRecipeSteps(item.id); }}>

          <Image
            style={styles.recipeImage}
            source={{ uri: `${item.image}` }}
          />
          <Text style={styles.subheaderText}>{item.title}</Text>
          {displayRecipe(item.id)}
        </TouchableOpacity>
      );
    }));
  };

  return (
    <View>
      {!confirmScreen
      && (
      <TouchableOpacity style={[styles.overallContainer, { height: expand ? 0.8 * windowWidth : 0.4 * windowWidth }]} onPress={() => { retrieveRecipe(classification); }}>
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
                style={stylesLocal.foodImage}
                source={{ uri: `${foodImg}` }}
              />
              {/* the food information */}
              <View>
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
                    <Text style={styles.primFontBold}>Classification: </Text>
                    <Text style={styles.secFont}>{classification}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

        { expand
          && (
            <View style={styles.mealCardContainerExpand}>
              <View>
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
              </View>
              <View style={styles.mealColumn}>
                <Text style={styles.primFontBold}>Description:</Text>
                <Text style={styles.secFont}>{description || 'N/A'}</Text>
              </View>
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

const stylesLocal = StyleSheet.create({

  suggestedRecipeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',

    height: '80%',
    width: '100%',
  },

  suggestedRecipeCard: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-around',

    borderStyle: 'solid',
    borderColor: '#DC95FE',
    borderWidth: 3,
    borderRadius: 7,

    width: '40%',
    height: '50%',
  },

  subheaderText: {
    fontSize: 10,
    fontFamily: 'Dosis_400Regular',
    width: '100%',
    textAlign: 'center',
    textTransform: 'lowercase',
  },

  overallContainer: {
    width: 0.9 * windowWidth,
    marginBottom: 20,
    backgroundColor: '#FFFAF0',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#DC95FE',
    padding: 10,
    position: 'relative',

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cardContainer: {
    width: '80%',
    height: '80%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  cardContainerExpand: {
    width: '80%',
    height: '80%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  allMacroStatsContainer: {
    width: '100%',
    height: '30%',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  individMacroStatConatiner: {
    width: '30%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,

    borderColor: '#DC95FE',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 5,
  },

  mealInfo: {
    display: 'flex',

    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '50%',
    height: '80%',

    marginLeft: 10,
    paddingLeft: 10,
  },

  subInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  foodImage: {
    width: '50%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
    overflow: 'hidden',

    marginRight: 10,
  },

  foodImageExpand: {
    width: '50%',
    height: '20%',
    resizeMode: 'cover',
    borderRadius: 20,
    overflow: 'hidden',
  },

  mealHeader: {
    fontSize: 50,
    fontWeight: '500',
  },

  mealSubHeader: {
    fontSize: 25,
    fontWeight: '300',
  },
});
