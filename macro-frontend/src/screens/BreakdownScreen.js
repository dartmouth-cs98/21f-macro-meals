import React, { useState } from 'react';
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
  const [letUsKnow, setLetUsKnow] = useState(false);
  console.log(food);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.navigate('Main'); }}>
        <Icon name="camera" color="white" style={{ fontSize: 0.05 * windowWidth }} />
      </TouchableOpacity>
      <Text style={[ styles.secFontBold, { fontSize: 24 }]}>breakdown</Text>
      <MacroPieChart allMacros={foodList} />
      <Text style={[ styles.secFontBold, { marginBottom: 10, fontSize: 18 } ]}>{food.customName}</Text>
      <View style={styles.centerMeEvenly}>
        <View style={styles.flexCol}><Text style={styles.secFontBold}>Protein: </Text><Text style={styles.secFont}>{food.protein}g</Text></View>
        <View style={styles.flexCol}><Text style={styles.secFontBold}>Carbs: </Text><Text style={styles.secFont}>{food.carb}g</Text></View>
        <View style={styles.flexCol}><Text style={styles.secFontBold}>Fats: </Text><Text style={styles.secFont}>{food.fat}g</Text></View>
      </View>
      <View style={styles.flexCol}><Text style={[ styles.secFontBold, { marginTop: 10} ]}>Classification: </Text><Text style={styles.secFont}>{food.classification}</Text></View>
      <View style={[ styles.flexCol, { marginBottom: 10 } ]}><Text style={styles.secFontBold}>Confidence: </Text><Text style={styles.secFont}>{(food.confidence*100).toFixed(1)}%</Text></View>
      <View>
        <Text style={styles.secFont}>Incorrect classification?</Text>
        <View>
          {!letUsKnow
          && (
            <TouchableOpacity style={styles.authBtn} onPress={() => { setLetUsKnow(!letUsKnow) }}><Text style={styles.authBtnFont}>Let Us Know!</Text></TouchableOpacity>
          )}
          {letUsKnow
          && (
            <TouchableOpacity style={styles.authBtn} onPress={() => { setLetUsKnow(!letUsKnow) }}><Text style={styles.authBtnFont}>Coming soon...</Text></TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  foodList: state.food.foodList,
});

export default connect(mapStateToProps)(BreakdownScreen);
