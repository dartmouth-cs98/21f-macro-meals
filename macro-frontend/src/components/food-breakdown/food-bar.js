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
        <Text>
          {foodType}
        </Text>
      </View>
    </View>

  );
};

const styles = (props) => StyleSheet.create({
  progressBar: {
    width: props.percent,
    backgroundColor: '#C2E1FF',
  },
  backgroundBar: {
    width: '100%',
    backgroundColor: '#339DFF',
    padding: 10,
  },
});

export default FoodBar;
