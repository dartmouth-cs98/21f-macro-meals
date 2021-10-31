import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import BreakdownScreen from '../screens/BreakdownScreen';

const Stack = createStackNavigator();
function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Breakdown" component={BreakdownScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainStackNavigator;
