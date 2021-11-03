/* eslint-disable react/destructuring-assignment */
/*
 * Alex Wong
 * Cycles through a given list of foods and creates the food bars for each
 * Takes in an array of all foods and creates cards
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import FoodBar from './food-bar';

class FoodBreakDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      selected: 'protein',
    };
  }

  allFoods = () => {
    return this.props.allFoods.map((foodItem) => {
      return (
        <FoodBar key={foodItem.id} allMacros={foodItem} />
      );
    });
  }

  render() {
    return <View>{this.allFoods()}</View>;
  }
}

export default FoodBreakDown;
