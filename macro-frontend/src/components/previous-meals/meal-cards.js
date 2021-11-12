import React from 'react';
import {
  StyleSheet, Text, Image, View,
} from 'react-native';

const MealCard = (props) => {
  const {
    mealName, time, totalCal, foodImg,
  } = props;

  return (
    <View style={styles.overallContainer}>
      <View style={styles.container}>
        <Image
          style={styles.foodImage}
          source={{ uri: `${foodImg}` }}
        />
      </View>
      <View style={styles.mealText}>
        <View styles={styles.mealNameContainer}><Text style={styles.mealNameText}>{mealName}</Text></View>
        <View style={styles.mealInformation}>
          <Text>{time}</Text>
          <Text>
            {totalCal}
            cal
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MealCard;

const styles = StyleSheet.create({

  overallContainer: {
    width: '75%',
    height: '15%',
    backgroundColor: '#FFFAF0s',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DC95FE',
    padding: 10,

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
    fontWeight: 400,

  },
  mealInformation: {

    flexDirection: 'row',
    justifyContent: 'space-between',

  },
});
