import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import FoodBreakDown from './food-breakdown/food-breakdown';
import MacroPieChart from './macro-breakdown/macro-individuals';

class FoodOverview extends Component {
  render() {
    return (
      <View>
        <MacroPieChart />
        <FoodBreakDown />
      </View>
    );
  }
}

export default FoodOverview;
