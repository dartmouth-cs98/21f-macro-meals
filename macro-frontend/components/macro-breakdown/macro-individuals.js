// Adapted from https://dev.to/franciscomendes10866/how-to-create-a-donut-pie-chart-using-react-native-svg-3om3

import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Svg, {G, Circle} from "react-native-svg";


const MacroPieChart = () => {
    const radius = 70;
    const circleCircumference = 2 * Math.PI * radius;

    const grocerires = 241;
    const bills = 372;
    const regular = 188;
    const total = grocerires + bills + regular;

    const groceriesPercentage = (grocerires / total) * 100;
    const billPerceentage = (bills / total) * 100;
    const regularPercentage = (regular / total) * 100;

    const groceriesStrokeDashoffset = circleCircumference - (circleCircumference * groceriesPercentage) / 100;
    const billsStrokeDashoffset = circleCircumference - (circleCircumference * billPerceentage) / 100;
    const regularStrokeDashoffset = circleCircumference - (circleCircumference * regularPercentage) / 100;

    const groceriesAngle = (grocerires / total) * 360;
    const billsAngle = (bills / total) * 360;
    const regularAngle = groceriesAngle + billsAngle;

    return (
        <View style={styles.container}>
            <View style={styles.graphWrapper}>
                <Svg height="160" width="160" viewBox="0 0 180 180">
                    <G rotation={-90} originX="90" originY="90">
                    <>
                    <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#F05454"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={groceriesStrokeDashoffset}
                  rotation={0}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                 />
                 <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#30475E"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={billsStrokeDashoffset}
                  rotation={groceriesAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                 />
                 <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#222831"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={regularStrokeDashoffset}
                  rotation={regularAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
                 </>
                    </G>
                </Svg>
                <Text style={styles.label}>{total}</Text>
            </View>
        </View>
    )
}

export default MacroPieChart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    graphWrapper: {
        alignItems: "center",
        justifyContent: "center"
    },

    label: {
        position: "absolute",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 24,
      },
})