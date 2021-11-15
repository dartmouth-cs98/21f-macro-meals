import React from 'react';
import {
  StyleSheet, Text, Image, View, Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const MealCard = (props) => {
  const {
    mealName, time, totalCal, foodImg, classification,
  } = props;

  // const dateString = moment(new Date(time.substring(0,4),time.substring(5,7),time.substring(8,10))).format('MMMM D, Y');

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
        <View style={styles.mealColumn}>
          <Text style={{ color: 'white' }}>{time.substring(0,10)}</Text>
          <View style={styles.mealInformation}>
            <Text style={{ color: 'white' }}>{classification}</Text>
            <Text style={{ color: 'white' }}>
              {totalCal}
              cal
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MealCard;

const styles = StyleSheet.create({

  overallContainer: {
    width: 0.8 * windowWidth,
    height: 0.3 * windowWidth,
    marginBottom: 20,
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
