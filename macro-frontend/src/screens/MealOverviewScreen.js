import React from 'react';
import { View, StyleSheet } from 'react-native';
import MealCard from '../components/previous-meals/meal-cards';

function MealOverviewScreen({ navigation, storedUserName }) {
  return (
    <View style={styles.allContainer}>
      <MealCard mealName="hamburger" time="yesterday" totalCal={100} foodImg="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1899&q=80" />
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
