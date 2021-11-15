import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MealCard from '../components/previous-meals/meal-cards';
import styles from '../styles';

const windowWidth = Dimensions.get('window').width;

function MealOverviewScreen({ navigation, storedUserName }) {
  const [history, setHistory] = useState(null);

  const getHistory = () => {
    console.log(storedUserName);
    axios.post('https://macro-cs98.herokuapp.com/api/user/history', {
      username: storedUserName,
    })
      .then((response) => {
        console.log(response.data);
        setHistory(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  if (history === null) {
    getHistory();
  }

  return (
    <View style={styles.historyContainer}>
      <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.navigate('Main'); }}>
        <Icon name="arrow-left" color="white" style={{ fontSize: 0.05 * windowWidth }} />
      </TouchableOpacity>
      <Text style={styles.headerText}>history</Text>
      <ScrollView styles={styles.scrollContainer}>
        { history !== null &&
        (
          history.map((element, index) => (
            <MealCard key={element.id} mealName={element.customName} time={element.createdAt} totalCal={element.calories} foodImg={element.imageUrl} classification={element.classification} />
          ))
        )}
        {history !== null && history.length === 0 && 
        (
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 0.04 * windowWidth }}>your previous meals will show up here!</Text>
        )}
        { history === null 
        && (
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 0.04 * windowWidth }}>loading your history...</Text>
        )}
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => ({
  storedUserName: state.user.name,
});

MealOverviewScreen.propTypes = {
  storedUserName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(MealOverviewScreen);
