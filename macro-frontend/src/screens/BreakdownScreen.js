import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, { G, Circle } from 'react-native-svg';
import styles from '../styles';

const windowWidth = Dimensions.get('window').width;

function BreakdownScreen({ navigation, foodList }) {
  const baseFood = foodList[foodList.length - 1];
  const [classificationNumber, setClassificationNumber] = useState(1);
  const [cirCircumference, setCirCircumference] = useState(2 * Math.PI * 140);
  const [macroDisplay, setMacroDisplay] = useState(null);
  const [food, setFood] = useState({
    customName: baseFood.customName,
    classification: baseFood.classification,
    calories: baseFood.calories,
    protein: baseFood.protein,
    carb: baseFood.carb,
    fat: baseFood.fat,
    confidence: baseFood.confidence,
  });

  const updateClassification = (num) => {
    setClassificationNumber(num);
    if (num == 2) {
      let f = {
        customName: baseFood.customName,
        classification: baseFood.classificationTwo,
        calories: baseFood.caloriesTwo,
        protein: baseFood.proteinTwo,
        carb: baseFood.carbTwo,
        fat: baseFood.fatTwo,
        confidence: baseFood.confidenceTwo,
      };
      setFood(f);
      calcCircle(f);
    } else if (num == 3) {
      let f = {
        customName: baseFood.customName,
        classification: baseFood.classificationThree,
        calories: baseFood.caloriesThree,
        protein: baseFood.proteinThree,
        carb: baseFood.carbThree,
        fat: baseFood.fatThree,
        confidence: baseFood.confidenceThree,
      };
      setFood(f);
      calcCircle(f);
    }
  };
  // making the calculations to render the circle
  const calcCircle = (f) => {
    // settiing up basic figures
    let total = f.calories;
    let tFat = f.fat;
    let tProtein = f.protein;
    let tCarbs = f.carb;
    const totalMacro = tFat + tProtein + tCarbs;

    let macroDisplay = [];
    let prevMacroAngle = 0;

    console.log(totalMacro);

    for (let i = 0; i < 3; i++) {
      const allMacroCount = [f.fat, f.protein, f.carb];
      const percent = (allMacroCount[i] / totalMacro) * 100;
      const strokeDashoffset = cirCircumference - (cirCircumference * percent) / 100;
      const angle = (allMacroCount[i] / totalMacro) * 360;
      let color = '';
      if (i == 0) { color = '#ffff00'; }
      if (i == 1) { color = '#F956F2'; }
      if (i == 2) { color = '#0000ff'; }
      macroDisplay.push({
          key: i,
          percent,
          strokeDashoffset,
          angle,
          prevAngle: prevMacroAngle,
          sliceSpacing: 3,
          color,
      });
      prevMacroAngle += angle;
    }
    setMacroDisplay(macroDisplay);
  }

  if (macroDisplay === null) {
    calcCircle(baseFood);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.navigate('Main'); }}>
        <Icon name="camera" color="white" style={{ fontSize: 0.05 * windowWidth }} />
      </TouchableOpacity>
      <Text style={[ styles.secFontBold, { fontSize: 24 }]}>breakdown</Text>
      {macroDisplay !== null
      && (
      <View style={styles.graphWrapper}>
        <Svg height="300" width="300" viewBox="0 0 360 360">
          <G rotation={-90} originX="180" originY="180">
            {
            // eslint-disable-next-line react/destructuring-assignment
            macroDisplay.map((element, index) => (
              <Circle
                  // eslint-disable-next-line react/no-array-index-key
                key={element.key}
                cx="50%"
                cy="50%"
                r="140"
                stroke={element.color}
                fill="transparent"
                strokeWidth="40"
                    // eslint-disable-next-line react/destructuring-assignment
                strokeDasharray={cirCircumference}
                strokeDashoffset={element.strokeDashoffset}
                rotation={element.prevAngle}
                originX="180"
                originY="180"
              />

            ))
              }
          </G>
        </Svg>
        <Text style={styles.label}>
          {food.calories}
          {' '}
          calories
        </Text>
      </View>
      )}
      <Text style={[ styles.secFontBold, { marginBottom: 10, fontSize: 18 } ]}>{food.customName}</Text>
      <View style={styles.centerMeEvenly}>
        <View style={styles.flexCol}><Text style={styles.secFontBold}>Protein: </Text><Text style={styles.secFont}>{(food.protein).toFixed(1)}g</Text></View>
        <View style={styles.flexCol}><Text style={styles.secFontBold}>Carbs: </Text><Text style={styles.secFont}>{(food.carb).toFixed(1)}g</Text></View>
        <View style={styles.flexCol}><Text style={styles.secFontBold}>Fats: </Text><Text style={styles.secFont}>{(food.fat).toFixed(1)}g</Text></View>
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
