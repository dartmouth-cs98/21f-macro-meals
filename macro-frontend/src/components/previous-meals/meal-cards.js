import React, { useState } from 'react';
import {
  StyleSheet, Text, Image, View, Dimensions, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;

const positiveMood = require('../../img/positiveMood.png');
const neutralMood = require('../../img/neutralMood.png');
const negativeMood = require('../../img/negativeMood.png');

const MealCard = (props) => {
  const {
    mealName, time, totalCal, foodImg, classification, protein, fat, carb, mood
  } = props;

  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  console.log(mood);
  let moodImage = null;
  if (mood === 'positive') { moodImage = positiveMood; }
  else if (mood === 'neutral') { moodImage = neutralMood; }
  else { moodImage = negativeMood; }

  const [expand, setExpand] = useState(false);
  // const dateString = moment(new Date(time.substring(0,4),time.substring(5,7),time.substring(8,10))).format('MMMM D, Y');
  
  return (
    <TouchableOpacity style={[styles.overallContainer, { height: expand ? 0.6 * windowWidth : 0.3 * windowWidth }]} onPress={() => {setExpand(!expand); }}>
      <Icon name={expand ? 'compress' : 'expand'} color="white" style={{ fontSize: 0.04 * windowWidth, position: 'absolute', top: 8, right: 8 }} />
      { expand
      && (
        <Image source={moodImage} style={{ width: 0.1 * windowWidth, height: 0.1 * windowWidth, position: 'absolute', bottom: 8, right: 8 }} />
      )}
      <View style={styles.container}>
        <Image
          style={styles.foodImage}
          source={{ uri: `${foodImg}` }}
        />
      </View>
      <View style={styles.mealText}>
        <View styles={styles.mealNameContainer}><Text style={styles.mealNameText}>{(mealName || classification)}</Text></View>
        <View style={styles.mealColumn}>
          <Text style={{ color: 'white' }}>{monthArray[parseInt(time.substring(5,7))-1]} {time.substring(8,10)}, {time.substring(0,4)}</Text>
          <Text style={{ color: 'white' }}><b>Classification:</b> {classification}</Text>
          { expand
          && (
            <View style={[styles.mealColumn, { marginTop: 20 }]}>
              <Text style={{ color: 'white' }}><b>Calories:</b> {totalCal}</Text>
              <Text style={{ color: 'white' }}><b>Protein:</b> {protein}g</Text>
              <Text style={{ color: 'white' }}><b>Carbs:</b> {carb}g</Text>
              <Text style={{ color: 'white' }}><b>Fats:</b> {fat}g</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MealCard;

const styles = StyleSheet.create({

  overallContainer: {
    width: 0.85 * windowWidth,
    height: 0.3 * windowWidth,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#DC95FE',
    padding: 10,
    position: 'relative',

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  container: {
    width: '30%',
    height: '80%',
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
    overflow: 'hidden',
  },
  mealText: {
    width: '50%',
    height: '100%',

    justifyContent: 'center',

  },
  mealNameContainer: {
    paddingBottom: 10,

  },
  mealNameText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',

  },
  mealInformation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealColumn: {
    display: 'flex',
    flexDirection: 'column',
  }
});
