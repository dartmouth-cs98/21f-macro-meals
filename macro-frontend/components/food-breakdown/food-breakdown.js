/* eslint-disable react/destructuring-assignment */
/*
 * Alex Wong
 * Cycles through a given list of foods and creates the food bars for each
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import FoodBar from './food-bar';

class FoodBreakDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // dummy data
      array: [
        {
          key: '1',
          foodType: 'Salmon',
          percent: '50%',
        },
        {
          key: '2',
          foodType: 'Quinoa',
          percent: '25%',
        },
        {
          key: '3',
          foodType: 'Steak',
          percent: '25%',
        },
      ],
    };
  }

  allFoods = () => {
    return this.state.array.map((foodItem) => {
      return (
        <FoodBar key={foodItem.key} percent={foodItem.percent} foodType={foodItem.foodType} />
      );
    });
  }

  render() {
    return <View>{this.allFoods()}</View>;
  }
}

export default FoodBreakDown;
