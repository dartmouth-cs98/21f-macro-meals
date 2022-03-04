import React, { useState } from 'react';
import axios from 'axios';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, { G, Circle } from 'react-native-svg';
import styles from '../styles';

const windowWidth = Dimensions.get('window').width;

function BreakdownScreen({ navigation, foodList, storedUserName }) {
  const baseFood = foodList[foodList.length - 1];
  const [classificationNumber, setClassificationNumber] = useState(1);
  const [cirCircumference, setCirCircumference] = useState(2 * Math.PI * 140);
  const [macroDisplay, setMacroDisplay] = useState(null);
  const [manualInput, setManualInput] = useState(false);
  const [btnText, setBtnText] = useState('next option');
  const [classification, setClassification] = useState('');
  const [protein, setProtein] = useState(0);
  const [carb, setCarb] = useState(0);
  const [fat, setFat] = useState(0);
  const [calories, setCalories] = useState(0);
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
    if (num == 1) {
      let f = {
        customName: baseFood.customName,
        classification: baseFood.classification,
        calories: baseFood.calories,
        protein: baseFood.protein,
        carb: baseFood.carb,
        fat: baseFood.fat,
        confidence: baseFood.confidence,
      };
      setFood(f);
      calcCircle(f);
      axios.post('https://macro-cs98.herokuapp.com/api/food/updateClassification', {
        id: baseFood.id,
        correctClassification: 1,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else if (num == 2) {
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
      axios.post('https://macro-cs98.herokuapp.com/api/food/updateClassification', {
        id: baseFood.id,
        correctClassification: 2,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
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
      setBtnText('let us know!');
      axios.post('https://macro-cs98.herokuapp.com/api/food/updateClassification', {
        id: baseFood.id,
        correctClassification: 3,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
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

  const submitForm = () => {
    console.log('form submit');
    console.log(classification);
    if (classification !== '' && classification !== 'failed') {
      axios.post('https://macro-cs98.herokuapp.com/api/food', {
        username: storedUserName,
        customName: baseFood.customName,
        description: baseFood.description,
        mealTime: baseFood.mealTime,
        mood: baseFood.mood,
        publicFood: baseFood.publicFood,
        imageUrl: baseFood.imageUrl,
        classification,
        calories: parseFloat(calories),
        protein: parseFloat(protein),
        carb: parseFloat(carb),
        fat: parseFloat(fat),
        confidence: 0,
        classificationTwo: '',
        caloriesTwo: 0,
        proteinTwo: 0,
        carbTwo: 0,
        fatTwo: 0,
        confidenceTwo: 0,
        classificationThree: '',
        caloriesThree: 0,
        proteinThree: 0,
        carbThree: 0,
        fatThree: 0,
        confidenceThree: 0,
        correctClassification: 1,
      })
        .then((response) => {
          console.log(response.data);
          axios.post('https://macro-cs98.herokuapp.com/api/food/delete', {
            id: baseFood.id,
          })
            .then((response) => {
              console.log(response);
              navigation.navigate('Main');
            })
            .catch((error) => {
              console.log('Error in handleDeletePress:');
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.navigate('Main'); }}>
        <Icon name="camera" color="white" style={{ fontSize: 0.05 * windowWidth }} />
      </TouchableOpacity>
      {!manualInput && (
        <View style={styles.container}>
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
            <Text style={[styles.secFont, {marginBottom: 5}]}>top classifications:</Text>
            <View style={{ display: 'flex', justifyContent: 'center' }}>
              <TouchableOpacity style={[styles.numBtn, { backgroundColor: classificationNumber == 1 ? '#DC95FE' : '#e7b3ff' }]} onPress={() => { updateClassification(1); }}><Text style={styles.authBtnFont}>1</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.numBtn, { backgroundColor: classificationNumber == 2 ? '#DC95FE' : '#e7b3ff' }]} onPress={() => { updateClassification(2); }}><Text style={styles.authBtnFont}>2</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.numBtn, { backgroundColor: classificationNumber == 3 ? '#DC95FE' : '#e7b3ff' }]} onPress={() => { updateClassification(3); }}><Text style={styles.authBtnFont}>3</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.authBtn, {marginBottom: 10, marginTop: 10}]} onPress={() => { setManualInput(true) }}><Text style={styles.authBtnFont}>create manual entry</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Main'); }} style={styles.authBtn}>
                <Text style={styles.authBtnFont}>cancel</Text>
              </TouchableOpacity>
          </View>
        </View>
      )}
      {manualInput
        && (
          <View style={[ styles.formWrapper, { marginTop: 100 } ]}>
            <Text style={styles.secFont}>this is embarrassing...</Text>
            <Text style={styles.secFont}>please create a manual input (or try again)!</Text>
            <TextInput
            style={styles.mainFormElement}
            onChangeText={setClassification}
            value={classification}
            placeholder="classification [ex. apple]"
            placeholderTextColor="white"
            />
            <View style={[ styles.mainFormElement, styles.flexCol, { width: '90%' } ]}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>calories</Text>
              <TextInput
              onChangeText={setCalories}
              keyboardType='numeric'
              value={calories}
              placeholder="[ex. 150]"
              placeholderTextColor="white"
              style={{ marginBottom: 10 }}
              />
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>macros</Text>
              <View style={styles.centerMeEvenly}>
                <View style={styles.flexCol}>
                  <Text style={{ color: 'white', fontSize: 16 }}>protein</Text>
                  <TextInput
                  onChangeText={setProtein}
                  keyboardType='numeric'
                  value={protein}
                  placeholder="[ex. 20]"
                  placeholderTextColor="white"
                  />
                </View>
                <View style={styles.flexCol}>
                  <Text style={{ color: 'white', fontSize: 16 }}>carbs</Text>
                  <TextInput
                  onChangeText={setCarb}
                  keyboardType='numeric'
                  value={carb}
                  placeholder="[ex. 40]"
                  placeholderTextColor="white"
                  />
                </View>
                <View style={styles.flexCol}>
                  <Text style={{ color: 'white', fontSize: 16 }}>fats</Text>
                  <TextInput
                  onChangeText={setFat}
                  keyboardType='numeric'
                  value={fat}
                  placeholder="[ex. 10]"
                  placeholderTextColor="white"
                  />
                </View>
              </View>
            </View>
            <View style={styles.formBtnWrapper}>
              <TouchableOpacity onPress={submitForm} style={styles.mainFormBtn}>
                <Text style={{ color: 'white', fontSize: 16 }}>submit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setManualInput(false); }} style={styles.mainFormBtn}>
                <Text style={{ color: 'white', fontSize: 16 }}>cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
    </View>
  );
}

const mapStateToProps = (state) => ({
  foodList: state.food.foodList,
  storedUserName: state.user.name,
});

BreakdownScreen.propTypes = {
  storedUserName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(BreakdownScreen);
