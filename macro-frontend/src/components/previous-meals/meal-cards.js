import React, { useState } from 'react';
import axios from 'axios';
import {
  StyleSheet, Text, Image, View, Dimensions, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles';

const windowWidth = Dimensions.get('window').width;

const positiveMood = require('../../img/positiveMood.png');
const neutralMood = require('../../img/neutralMood.png');
const negativeMood = require('../../img/negativeMood.png');

const MealCard = (props) => {
  const {
    id, mealName, description, time, totalCal, foodImg, classification, protein, fat, carb, mood, username, historyPage
  } = props;
  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let moodImage = null;
  if (mood === 'positive') { moodImage = positiveMood; }
  else if (mood === 'neutral') { moodImage = neutralMood; }
  else { moodImage = negativeMood; }

  const [expand, setExpand] = useState(false);
  const [favorite, setFavorite] = useState(null);
  const [confirmScreen, setConfirmScreen] = useState(false); 
  const [deleted, setDeleted] = useState(false);

  const handleFavoritePress = () => {
    if (favorite) { // if is a favorite, need to delete
      axios.post('https://macro-cs98.herokuapp.com/api/fav/delete', {
        foodId: id, username: username,
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
        foodId: id, username: username,
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
  }

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
      foodId: id, username: username,
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
  }

  if (favorite === null) {
    getFavoriteStatus();
  }

  return (
    <View>
      {!confirmScreen &&
      <TouchableOpacity style={[styles.overallContainer, { height: expand ? 0.8 * windowWidth : 0.4 * windowWidth }]} onPress={() => {setExpand(!expand); }}>
      <Icon name={expand ? 'compress' : 'expand'} color="#54595F" style={{ fontSize: 0.06 * windowWidth, position: 'absolute', top: 8, right: 8 }} />
      <TouchableOpacity 
        style={{ position: 'absolute', bottom: 4, right: 4, padding: 4, zIndex: 2 }}
        onPress={() => { handleFavoritePress(); }}
      >
        <Text style={StyleSheet.absoluteFillObject} />
        <View>
          <Icon name={favorite ? 'heart' : 'heart-o'} color="#f66" style={{ fontSize: 0.06 * windowWidth }} />
        </View>
      </TouchableOpacity>
      { historyPage && 
      <TouchableOpacity 
        style={{ position: 'absolute', bottom: 4, left: 4, padding: 4, zIndex: 2 }}
        onPress={() => { handleDeletePress(); }}
      >
        <Text style={StyleSheet.absoluteFillObject} />
        <View>
          <Icon name={'trash-o'} color="#54595F" style={{ fontSize: 0.06 * windowWidth }} />
        </View>
      </TouchableOpacity>
      }
      <View style={{ width: '30%', height: '80%' }}>
        <Image
          style={styles.foodImage}
          source={{ uri: `${foodImg}` }}
        />
      </View>
      <View style={styles.mealText}>
        <View styles={styles.mealNameContainer}><Text style={styles.mealNameText}>{(mealName || classification)}</Text></View>
        <View style={styles.mealColumn}>
          <Text style={styles.secFont}>{monthArray[parseInt(time.substring(5,7))-1]} {time.substring(8,10)}, {time.substring(0,4)}</Text>
          <Text style={styles.primFontBold}>Classification: </Text><Text style={styles.secFont}>{classification}</Text>
          { expand
          && (
            <View style={[styles.mealColumn, { marginTop: 20 }]}>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.primFontBold}>Calories: </Text><Text style={styles.secFont}>{totalCal}</Text>
                <Text style={styles.primFontBold}>Protein: </Text><Text style={styles.secFont}>{protein}g</Text>
                <Text style={styles.primFontBold}>Carbs: </Text><Text style={styles.secFont}>{carb}g</Text>
                <Text style={styles.primFontBold}>Fats: </Text><Text style={styles.secFont}>{fat}g</Text>
              </View>
              <View style={styles.mealColumn}>
                <Text style={styles.primFontBold}>Description:</Text>
                <Text style={styles.secFont}>{description ? description : 'N/A'}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
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
