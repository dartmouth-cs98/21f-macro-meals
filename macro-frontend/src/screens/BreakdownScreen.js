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
  const baseFood = foodList[foodList.length - 1];
  const [letUsKnow, setLetUsKnow] = useState(false);
  const [classificationNumber, setClassificationNumber] = useState(1);
  const [food, setFood] = useState({
    customName: baseFood.customName,
    classification: baseFood.classification,
    calories: baseFood.calories,
    protein: baseFood.protein,
    carb: baseFood.carb,
    fat: baseFood.fat,
    confidence: baseFood.confidence,
  });
  console.log(baseFood);

  const updateClassification = (num) => {
    setClassificationNumber(num);
    if (num == 2) {
      setFood({
        customName: baseFood.customName,
        classification: baseFood.classificationTwo,
        calories: baseFood.caloriesTwo,
        protein: baseFood.proteinTwo,
        carb: baseFood.carbTwo,
        fat: baseFood.fatTwo,
        confidence: baseFood.confidenceTwo,
      })
    } else if (num == 3) {
      setFood({
        customName: baseFood.customName,
        classification: baseFood.classificationThree,
        calories: baseFood.caloriesThree,
        protein: baseFood.proteinThree,
        carb: baseFood.carbThree,
        fat: baseFood.fatThree,
        confidence: baseFood.confidenceThree,
      })
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.navigate('Main'); }}>
        <Icon name="camera" color="white" style={{ fontSize: 0.05 * windowWidth }} />
      </TouchableOpacity>
      <Text style={[ styles.secFontBold, { fontSize: 24 }]}>breakdown</Text>
      <MacroPieChart allMacros={food} />
      <Text style={[ styles.secFontBold, { marginBottom: 10, fontSize: 18 } ]}>{food.customName}</Text>
      <View style={styles.centerMeEvenly}>
        <View style={styles.flexCol}><Text style={styles.secFontBold}>Protein: </Text><Text style={styles.secFont}>{food.protein}g</Text></View>
        <View style={styles.flexCol}><Text style={styles.secFontBold}>Carbs: </Text><Text style={styles.secFont}>{food.carb}g</Text></View>
        <View style={styles.flexCol}><Text style={styles.secFontBold}>Fats: </Text><Text style={styles.secFont}>{food.fat}g</Text></View>
      </View>
      <View style={styles.flexCol}><Text style={[ styles.secFontBold, { marginTop: 10} ]}>Classification: </Text><Text style={styles.secFont}>{food.classification}</Text></View>
      <View style={[ styles.flexCol, { marginBottom: 10 } ]}><Text style={styles.secFontBold}>Confidence: </Text><Text style={styles.secFont}>{(food.confidence*100).toFixed(1)}%</Text></View>
      <View>
        <Text style={styles.secFont}>incorrect classification?</Text>
        <View>
          <TouchableOpacity style={styles.authBtn} onPress={() => { updateClassification(classificationNumber + 1); }}><Text style={styles.authBtnFont}>next option</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  foodList: state.food.foodList,
});

export default connect(mapStateToProps)(BreakdownScreen);
