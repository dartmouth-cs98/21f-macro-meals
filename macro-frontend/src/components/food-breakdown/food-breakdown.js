/* eslint-disable react/destructuring-assignment */
/*
 * Alex Wong
 * Cycles through a given list of foods and creates the food bars for each
 * Takes in an array of all foods and creates cards
 */

import React, { Component } from 'react';
import { TouchableHighlightBase, StyleSheet, View } from 'react-native';
import FoodBar from './food-bar';

class FoodBreakDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      selected: 'protein',
      totalCal: 0,
    };
  }

  componentDidMount = () => {
    this.calcPercent();
  }

  calcPercent = () => {
    let count = 0;
    this.props.allFoods.map((foodItem) => {
      count += foodItem.calories;
      return count;
    });

    this.setState({ totalCal: count });
  }

  allFoods = () => {
    return this.props.allFoods.map((foodItem) => {
      const foodPercent = (foodItem.calories / this.state.totalCal) * 100;
      return (
        <FoodBar key={foodItem.id} foodType={foodItem.name} percent={foodPercent} />
      );
    });
  }

  render() {
    return <View style={styles.barContainer}>{this.allFoods()}</View>;
  }
}

export default FoodBreakDown;

const styles = StyleSheet.create({
  barContainer: {
    flex: 1,
    flexDirection: 'column',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
