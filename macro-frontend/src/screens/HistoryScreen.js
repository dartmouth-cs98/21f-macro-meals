import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MealCard from '../components/previous-meals/meal-cards';
import styles from '../styles';

const windowWidth = Dimensions.get('window').width;

function HistoryScreen({ navigation, storedUserName }) {
  const [history, setHistory] = useState(null);

  const getHistory = () => {
    axios.post('https://macro-cs98.herokuapp.com/api/user/history', {
      username: storedUserName,
    })
      .then((response) => {
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
    <View style={styles.verticalContainer}>
      <TouchableOpacity
        style={styles.navTertBtnLeft}
        onPress={() => { navigation.navigate('Main'); }}
      >
        <Icon name="camera" color="white" style={{ fontSize: 0.05 * windowWidth }} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>history</Text>
      </View>
      <View style={styles.pageBody}>
        <ScrollView styles={styles.scrollContainer}>
          { history !== null &&
          (
            history.map((element, index) => (
              <MealCard 
                key={element.id} 
                id={element.id}
                mealName={element.customName}
                description={element.description}
                time={element.createdAt} 
                totalCal={element.calories} 
                foodImg={element.imageUrl} 
                classification={element.classification}
                protein={element.protein}
                carb={element.carb}
                fat={element.fat}
                mood={element.mood}
                username={storedUserName}
                historyPage={true}
              />
            ))
          )}
          {history !== null && history.length === 0 && 
          (
            <Text style={styles.secFontBold}>your previous meals will show up here!</Text>
          )}
          { history === null 
          && (
            <Text style={styles.secFontBold}>loading your history...</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  storedUserName: state.user.name,
});

HistoryScreen.propTypes = {
  storedUserName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(HistoryScreen);
