import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

function BreakdownScreen() {
  const foodItems = useSelector((state) => state.itemList);
  return (
    <View style={styles.container}>
      <Text>Breakdown Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default BreakdownScreen;
