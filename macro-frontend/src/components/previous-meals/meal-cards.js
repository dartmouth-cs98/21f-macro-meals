/* TODO:
 * flesh out the expanded view
 * add linear gradient border
 */

import React, { useState } from 'react';
import axios from 'axios';
import {
  StyleSheet, Text, Image, View, Dimensions, TouchableOpacity, styles,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipe } from '../../redux/actions/spoonacularActions';
import stylesGlobal from '../../styles';

const windowWidth = Dimensions.get('window').width;

const positiveMood = require('../../img/positiveMood.png');
const neutralMood = require('../../img/neutralMood.png');
const negativeMood = require('../../img/negativeMood.png');

const MealCard = (props) => {
  const allRecipes = useSelector((state) => state.recipe);
  const dispatch = useDispatch();

  const {
    id, mealName, description, time, totalCal, foodImg, classification, protein, fat, carb, mood, username,
  } = props;
  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let moodImage = null;
  if (mood === 'positive') { moodImage = positiveMood; } else if (mood === 'neutral') { moodImage = neutralMood; } else { moodImage = negativeMood; }

  const [expand, setExpand] = useState(false);
  const [favorite, setFavorite] = useState(null);
  const [confirmScreen, setConfirmScreen] = useState(false); 
  const [deleted, setDeleted] = useState(false);

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
      axios.post(`https://macro-cs98.herokuapp.com/api/food/delete`, {
        id: id,
      })
        .then((response) => {
          console.log('Deleted Food: ' + id);
          setDeleted(true);
        })
        .catch((error) => {
          console.log('Error in handleDeletePress:');
          console.log(error.message);
        });
    }
  }

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

  const mapSpoonacular = () => {
    dispatch(fetchRecipe('pasta', 'chicken'));
    console.log(allRecipes);

    return (
      <Text>hello</Text>
    );
  };

  if (favorite === null) {
    getFavoriteStatus();
  }

  return (
    <TouchableOpacity style={[stylesLocal.overallContainer, { height: expand ? 0.8 * windowWidth : 0.4 * windowWidth }]} onPress={() => { setExpand(!expand); }}>
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

      {/* summary view */}
      { !expand
          && (
            <View style={stylesLocal.cardContainer}>
              <Image
                style={stylesLocal.foodImage}
                source={{ uri: `${foodImg}` }}
              />

              {/* the food information */}
              <View style={stylesLocal.mealInfo}>

                <Text style={stylesLocal.mealHeader}>{(mealName || classification)}</Text>

                <View style={stylesLocal.subInfo}>
                  <Text style={stylesLocal.mealSubHeader}>
                    {monthArray[parseInt(time.substring(5, 7)) - 1]}
                    {' '}
                    {time.substring(8, 10)}
                  </Text>
                  <Text style={stylesLocal.mealSubHeader}>
                    {totalCal}
                    {' '}
                    Cal
                  </Text>
                </View>
              </View>
            </View>
          )}

      {/* expanded view */}
      { expand
          && (
          <View>
            {/* title */}
            <Text>{mealName}</Text>
            <Image
              style={stylesLocal.foodImage}
              source={{ uri: `${foodImg}` }}
            />
            <View>
              {/* protein */}
              <View>
                <Text>
                  {protein}
                  {' '}
                  g
                </Text>
                <Text>protein</Text>
              </View>

              {/* fats */}
              <View>
                <Text>
                  {fat}
                  {' '}
                  g
                </Text>
                <Text>fat</Text>
              </View>

              {/* carbs */}
              <View>
                <Text>
                  {carb}
                  {' '}
                  g
                </Text>
                <Text>carbs</Text>
              </View>
            </View>

            <View>
              {mapSpoonacular()}
            </View>
          </View>

      /* image of food */

      /* display of macro amounts */

      /* spoonacular displays */

      /* <View style={[stylesLocal.mealColumn, { marginTop: 20 }]}>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ color: '#F956F2' }}>
                  <b>Calories: </b>
                  <Text style={{ color: '#54595F' }}>{totalCal}</Text>
                </Text>
                <Text style={{ color: '#F956F2' }}>
                  <b>Protein: </b>
                  <Text style={{ color: '#54595F' }}>
                    {protein}
                    g
                  </Text>
                </Text>
                <Text style={{ color: '#F956F2' }}>
                  <b>Carbs: </b>
                  <Text style={{ color: '#54595F' }}>
                    {carb}
                    g
                  </Text>
                </Text>
                <Text style={{ color: '#F956F2' }}>
                  <b>Fats: </b>
                  <Text style={{ color: '#54595F' }}>
                    {fat}
                    g
                  </Text>
                </Text>
              </View>
              <View style={stylesLocal.mealColumn}>
                <Text style={{ color: '#F956F2' }}><b>Description:</b></Text>
                <Text style={{ color: '#54595F' }}>{description || 'N/A'}</Text>
              </View>
            </View> */
          )}

      {/*
      <View style={styles.container}>
        <Image
          style={styles.foodImage}
          source={{ uri: `${foodImg}` }}
        />
      </View>
      <View style={styles.mealText}>
        <View styles={styles.mealNameContainer}>
          <Text style={styles.mealNameText}>{(mealName || classification)}</Text>
        </View>
        <View style={styles.mealColumn}>
          <Text style={{ color: '#54595F' }}>
            {monthArray[parseInt(time.substring(5, 7)) - 1]}
            {' '}
            {time.substring(8, 10)}
            ,
            {' '}
            {time.substring(0, 4)}
          </Text>
          <Text style={{ color: '#F956F2' }}>
            <b>Classification: </b>
            <Text style={{ color: '#54595F' }}>{classification}</Text>
          </Text>
          { expand
          && (
            <View style={[styles.mealColumn, { marginTop: 20 }]}>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ color: '#F956F2' }}>
                  <b>Calories: </b>
                  <Text style={{ color: '#54595F' }}>{totalCal}</Text>
                </Text>
                <Text style={{ color: '#F956F2' }}>
                  <b>Protein: </b>
                  <Text style={{ color: '#54595F' }}>
                    {protein}
                    g
                  </Text>
                </Text>
                <Text style={{ color: '#F956F2' }}>
                  <b>Carbs: </b>
                  <Text style={{ color: '#54595F' }}>
                    {carb}
                    g
                  </Text>
                </Text>
                <Text style={{ color: '#F956F2' }}>
                  <b>Fats: </b>
                  <Text style={{ color: '#54595F' }}>
                    {fat}
                    g
                  </Text>
                </Text>
              </View>
              <View style={styles.mealColumn}>
                <Text style={{ color: '#F956F2' }}><b>Description:</b></Text>
                <Text style={{ color: '#54595F' }}>{description || 'N/A'}</Text>
              </View>
            </View>
          )}
        </View>
      </View> */}
    </TouchableOpacity>
    }
    { confirmScreen &&
    <View>
      { !deleted &&
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
      }
    </View>
    }
    </View>
  );
};

export default MealCard;

const stylesLocal = StyleSheet.create({

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
    alignItems: 'flex-start',
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

  mealHeader: {
    fontSize: 50,
    fontWeight: '500',
  },

  mealSubHeader: {
    fontSize: 25,
    fontWeight: '300',
  },

  /*
  mealText: {
    width: '60%',
    height: '100%',

    justifyContent: 'center',

  },
  mealNameContainer: {
    paddingBottom: 10,

  },
  mealNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F956F2',

  },
  mealInformation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealColumn: {
    display: 'flex',
    flexDirection: 'row',
  },
  */
});
