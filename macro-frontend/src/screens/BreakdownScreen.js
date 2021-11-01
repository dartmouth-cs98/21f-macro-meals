import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFood } from '../redux/actions/foodActions';

function BreakdownView() {
  const foodItems = useSelector((state) => state.foodList);
  console.log({ foodItems });
  const dispatch = useDispatch();
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      {foodItems.length !== 0 ? (
        <FlatList
          data={foodItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.calories}
              </Text>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.protein}
              </Text>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.carb}
              </Text>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.fat}
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFood(item.id))}
                style={styles.button}
              >
                <Text>Delete Food</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={{ fontSize: 30 }}>No Food</Text>
      )}
    </View>
  );
}
function BreakdownScreen({ navigation }) {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <BreakdownView />
        <View style={styles.fabContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Main')}
            style={styles.fabButton}
          >
            <Text>Go To Main Screen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  fabContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    bottom: 20,
  },
  fabButton: {
    backgroundColor: 'blue',
    borderRadius: 35,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 5,
    paddingRight: 5,
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 0.25,
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '400',
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#ff333390',
    padding: 5,
  },
});
export default BreakdownScreen;
