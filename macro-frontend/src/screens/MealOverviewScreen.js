import React from 'react';
import { View, StyleSheet } from 'react-native';
import MealCard from '../components/previous-meals/meal-cards';

function MealOverviewScreen({ navigation, storedUserName, foodList }) {
  return (
    <View style={styles.allContainer}>
      {
        foodList.map((element, index) => (
          <MealCard mealName={element.name} time="yesterday" totalCal={element.calories} foodImg={element.imageUrl} />
        ))
      }
    </View>
  );
}

export default MealOverviewScreen;

const styles = StyleSheet.create({
  allContainer: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFAF0',
  },
});
