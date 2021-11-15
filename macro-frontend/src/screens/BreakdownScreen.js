import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { useDispatch, connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { removeFood } from '../redux/actions/foodActions';
// import FoodBreakDown from '../components/food-breakdown/food-breakdown';
import MacroPieChart from '../components/macro-breakdown/macro-individuals';
import styles from '../styles';

const windowWidth = Dimensions.get('window').width;

function BreakdownScreen({ navigation, foodList }) {
  // const dispatch = useDispatch();
  console.log({ foodList });
  const food = foodList[0];
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.navigate('Main'); }}>
          <Icon name="arrow-left" color="white" style={{ fontSize: 0.05 * windowWidth }} />
        </TouchableOpacity>
        <Text style={styles.headerText}>breakdown</Text>
        <MacroPieChart allMacros={foodList} />
        <Text style={styles.subHeaderText}>{food.customName}</Text>
        <Text style={styles.subSubHeaderText}><b>Classification:</b> {food.classification}</Text>
        <View style={styles.centerMeEvenly}>
          <Text style={styles.boldWhiteText}>Protein: {food.protein}g</Text>
          <Text style={styles.boldWhiteText}>Carbs: {food.carb}g</Text>
          <Text style={styles.boldWhiteText}>Fats: {food.fat}g</Text>
        </View>
      </View>
      
      
      
      {/*<FoodBreakDown allFoods={foodList} />*/}

      {/*
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
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
          {foodList.length !== 0 ? (
            <FlatList
              data={foodList}
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
        <View style={styles.fabContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Main')}
            style={styles.fabButton}
          >
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
          */}
    </>
  );
}

/*
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
*/
const mapStateToProps = (state) => ({
  foodList: state.food.foodList,
});

export default connect(mapStateToProps)(BreakdownScreen);
