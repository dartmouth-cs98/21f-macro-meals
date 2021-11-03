import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import FoodBreakDown from '../components/food-breakdown/food-breakdown';
import MacroPieChart from '../components/macro-breakdown/macro-individuals';

function FoodOverview({ navigation, foodList }) {
  console.log({ foodList });

  return (
    <View>
      <MacroPieChart allMacros={foodList} />
    </View>
  );
}

const mapStateToProps = (state) => ({
  foodList: state.food.foodList,
});

export default connect(mapStateToProps)(FoodOverview);
