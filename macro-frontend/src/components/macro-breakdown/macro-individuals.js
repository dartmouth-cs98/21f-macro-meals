// Adapted from https://dev.to/franciscomendes10866/how-to-create-a-donut-pie-chart-using-react-native-svg-3om3
// Also from https://dev.to/franciscomendes10866/how-to-create-a-dynamic-donut-pie-chart-using-react-native-svg-1j70

/*
 * Alex Wong
 * CS 98
 * renders pie chart to show break down of items from meal
 * accepts an array of objects with a label and amount values
 * based on two tutorials from devto
 *
 * Used the following sources:
 */

import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Button,
} from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import TouchableOpacityG from './touchableOpacityG';

class MacroPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      selected: null,
      // eslint-disable-next-line react/no-unused-state
      renderAll: true,
      macroDisplay: [],
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      totalMacroAmount: 0,
      cirCircumference: 2 * Math.PI * 140,
      prevAngles: 0,
      totalCals: 0,
    };

    this.componentDidMount = () => {
      this.calcCircle();
    };
  }

    /* function from https://reactnativeforyou.com/how-to-generate-random-colors-in-react-native/ */
    /* adjusted to only create shades of purple/blue */
    addColor = (i) => {
      let color = '';
      if (i == 0) { color = '#ffff00'; }
      if (i == 1) { color = '#F956F2'; }
      if (i == 2) { color = '#0000ff'; }
      return color;
    }

    // making the calculations to render the circle
    calcCircle = () => {
      // settiing up basic figures
      let total = 0;
      let tFat = 0;
      let tProtein = 0;
      let tCarbs = 0;

      // eslint-disable-next-line no-unused-vars
      let itemNum = 0;
      this.props.allMacros.map((element) => {
        if (element.calories > 0) {
          itemNum++;
          total += element.calories;
          tFat += element.fat;
          tCarbs += element.carb;
          tProtein += element.protein;
        } return total;
      });

      const totalMacro = tFat + tProtein + tCarbs;

      this.setState({
        totalCals: total,
        totalMacroAmount: totalMacro,
      });

      for (let i = 0; i < 3; i++) {
        const allMacroCount = [tFat, tProtein, tCarbs];
        const { cirCircumference } = this.state;
        const percent = (allMacroCount[i] / totalMacro) * 100;
        const strokeDashoffset = cirCircumference - (cirCircumference * percent) / 100;
        const angle = (allMacroCount[i] / totalMacro) * 360;

        this.setState((prevState) => ({
          macroDisplay: [...prevState.macroDisplay, {
            key: i,
            percent,
            strokeDashoffset,
            angle,
            prevAngle: prevState.prevAngles,
            sliceSpacing: 3,
            color: this.addColor(i),
          }],
        }));

        this.setState((prevState) => ({ prevAngles: prevState.prevAngles + angle }));
      }
    }

    render() {
      return (
        <View style={styles.graphWrapper}>
          <Svg height="300" width="300" viewBox="0 0 360 360">
            <G rotation={-90} originX="180" originY="180">

              {
              // eslint-disable-next-line react/destructuring-assignment
              this.state.macroDisplay.map((element, index) => (
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
                  strokeDasharray={this.state.cirCircumference}
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
            {this.state.totalCals}
            {' '}
            calories
          </Text>
        </View>
      );
    }
}

export default MacroPieChart;

const styles = StyleSheet.create({

  graphWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },

  label: {
    position: 'absolute',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 24,
    color: '#54595F',
  },
});
