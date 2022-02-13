import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MacroPieChart from '../components/macro-breakdown/macro-individuals';
import styles from '../styles';

const windowWidth = Dimensions.get('window').width;

function BreakdownScreen({ navigation, foodList }) {
  const food = foodList[foodList.length - 1]; // get the most recent food off of the list
  console.log(food);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.navigate('Main'); }}>
        <Icon name="camera" color="white" style={{ fontSize: 0.05 * windowWidth }} />
      </TouchableOpacity>
      <Text style={[ styles.secFontBold, { fontSize: 24 }]}>breakdown</Text>
      <MacroPieChart allMacros={foodList} />
      <Text style={styles.secFont}>{food.customName}</Text>
      <View style={styles.centerMeEvenly}>
        <Text style={styles.secFont}>
          <b>Protein:</b>
          {' '}
          {food.protein}
          g
        </Text>
        <Text style={styles.secFont}>
          <b>Carbs:</b>
          {' '}
          {food.carb}
          g
        </Text>
        <Text style={styles.secFont}>
          <b>Fats:</b>
          {' '}
          {food.fat}
          g
        </Text>
      </View>
      <Text style={[ styles.secFont, { marginTop: 10} ]}>
        <b>Classification:</b>
        {' '}
        {food.classification}
      </Text>
      <Text style={[ styles.secFont, { marginBottom: 10} ]}>
        <b>Confidence:</b>
        {' '}
        {food.confidence*100}%
      </Text>
      <View>
        <Text style={styles.secFont}>Incorrect classification?</Text>
        <TouchableOpacity style={styles.authBtn}><Text style={styles.authBtnFont}>Let Us Know!</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  foodList: state.food.foodList,
});

export default connect(mapStateToProps)(BreakdownScreen);
