import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles';

const windowWidth = Dimensions.get('window').width;

function ManualScreen({ navigation, foodList }) {
  const food = foodList[foodList.length - 1]; // get the most recent food off of the list
  console.log(food);

  return (
    <View style={styles.container}>
    </View>
  );
}

const mapStateToProps = (state) => ({
  foodList: state.food.foodList,
});

export default connect(mapStateToProps)(ManualScreen);
