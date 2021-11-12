/*
 * Alex Wong
 * the component to show individual food bars
 */

// adapted from https://dev.to/ramonak/react-how-to-create-a-custom-progress-bar-component-in-5-minutes-2lcl

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FoodBar = (props) => {
  const { foodType } = props;
  return (

    <View style={styles(props).backgroundBar}>
      <View style={styles(props).progressBar}>
        <View style={styles(props).foodLabel}>
          <Text style={styles(props).foodText}>
            {foodType}
          </Text>
        </View>
      </View>
    </View>

  );
};

const styles = (props) => StyleSheet.create({
  progressBar: {
    width: `${props.percent}%`,
    backgroundColor: '#C2E1FF',
    borderRadius: 10,
  },
  backgroundBar: {
    width: '75%',
    backgroundColor: '#339DFF',
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
  },
  foodLabel: {
    width: '100%',
    margin: 10,
    color: '#ffffff',
  },
  foodText: {
    color: '#339DFF',
    fontWeight: '500',
  },
});

export default FoodBar;
