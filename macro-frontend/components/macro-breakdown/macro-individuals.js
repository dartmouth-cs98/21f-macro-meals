// Adapted from https://dev.to/franciscomendes10866/how-to-create-a-donut-pie-chart-using-react-native-svg-3om3
// Also from https://dev.to/franciscomendes10866/how-to-create-a-dynamic-donut-pie-chart-using-react-native-svg-1j70

/*
 * Alex Wong
 * CS 98
 * renders pie chart to show break down of items from meal
 * accepts an array of objects with a label and amount values
 * based on two tutorials from devto
 *
 * BUGS
 * need to use previous item's angle to calc new positiion
 */

import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

class MacroPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      selected: null,
      // eslint-disable-next-line react/no-unused-state
      renderAll: true,
      macroDisplay: [],
      cirCircumference: 2 * Math.PI * 70,
      prevAngle: 0,

      // dummy data
      allMacros: [
        {
          label: 'protein',
          amount: 10,
          color: '#A3F4D7',
        },
        {
          label: 'carbs',
          amount: 10,
          color: '#EAED1C',
        },
        {
          label: 'carbs',
          amount: 10,
          color: '#D37260',
        },
      ],
    };

    this.componentDidMount = () => {
      this.calcCircle();
    };
  }

    // making the calculations to render the circle
    calcCircle = () => {
      // settiing up basic figures
      let total = 0;
      // eslint-disable-next-line no-unused-vars
      let itemNum = 0;
      const { allMacros } = this.state;
      allMacros.map((element) => {
        if (element.amount > 0) {
          itemNum++;
          total += element.amount;
        } return allMacros;
      });

      console.log(total);

      // going through Macros and processing needed calc for angles
      // eslint-disable-next-line array-callback-return
      allMacros.map((element, index) => {
        const { cirCircumference } = this.state;
        const percent = (element.amount / total) * 100;
        const strokeDashoffset = cirCircumference - (cirCircumference * percent) / 100;
        const angle = (element.amount / total) * 360;

        this.setState((prevState) => ({
          macroDisplay: [...prevState.macroDisplay, {
            key: index,
            label: element.label,
            percent,
            strokeDashoffset,
            angle,
            prevAngle: prevState.prevAngle,
            sliceSpacing: itemNum,
            color: element.color,
          }],
        }));
        this.setState({ prevAngle: angle });
        console.log(element.key);
      });
    }

    render() {
      return (
        <View style={styles.graphWrapper}>
          <Svg height="160" width="160" viewBox="0 0 180 180">
            <G rotation={-90} originX="90" originY="90">
              {
              // eslint-disable-next-line react/destructuring-assignment
              this.state.macroDisplay.map((element, index) => (
                <Circle
                // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  cx="50%"
                  cy="50%"
                  r="70"
                  stroke={element.color}
                  fill="transparent"
                  strokeWidth="40"
                  // eslint-disable-next-line react/destructuring-assignment
                  strokeDasharray={this.state.cirCircumference}
                  strokeDashoffset={element.strokeDashoffset}
                  rotation={element.prevAngle * element.key}
                  originX="90"
                  originY="90"
                />
              ))
                }
            </G>
          </Svg>
          <Text style={styles.label}>hello</Text>
        </View>
      );
    }
}

export default MacroPieChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  graphWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    position: 'absolute',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 24,
    color: '#082032',
  },
});
