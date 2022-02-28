import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MealCard from '../components/previous-meals/meal-cards';
import styles from '../styles';

const windowWidth = Dimensions.get('window').width;

function CommunityScreen({ navigation, storedUserName }) {
  const [currTab, setCurrTab] = useState('top');
  const [recent, setRecent] = useState(null);
  const [top, setTop] = useState(null);
  const [favorite, setFavorite] = useState(null);

  const getCommunityRecent = () => {
    axios.get('https://macro-cs98.herokuapp.com/api/community/recent')
      .then((response) => {
        setRecent(response.data);
      })
      .catch((error) => {
        console.log('Error in getCommunityRecent:');
        console.log(error.message);
      })
  }

  const getCommunityTop = () => {
    axios.get('https://macro-cs98.herokuapp.com/api/fav/top')
      .then((response) => {
        let idList = [];
        for (let i = 0; i < response.data.length; i++) {
          idList.push(response.data[i]._id);
        }
        axios.post('https://macro-cs98.herokuapp.com/api/community/getFoodList', {
          list: idList, publicFood: 1,
        })
          .then((response1) => {
            setTop(response1.data);
          })
          .catch((error1) => {
            console.log('Error in getCommunityTop:');
            console.log(error1.message);
          })
      })
      .catch((error) => {
        console.log('Error in getCommunityTop:');
        console.log(error.message);
      })
  }
  const getCommunityFavorite = () => {
    axios.post('https://macro-cs98.herokuapp.com/api/fav/user', {
      username: storedUserName,
    })
      .then((response) => {
        let idList = [];
        for (let i = 0; i < response.data.length; i++) {
          idList.push(response.data[i].foodId);
        }
        axios.post('https://macro-cs98.herokuapp.com/api/community/getFoodList', {
          list: idList,
        })
          .then((response1) => {
            setFavorite(response1.data);
          })
          .catch((error1) => {
            console.log('Error in getCommunityFavorite:');
            console.log(error1.message);
          })
      })
      .catch((error) => {
        console.log('Error in getCommunityFavorite:');
        console.log(error.message);
      })
  }
  
  if (recent === null) {
    getCommunityRecent();
  }
  if (top === null) {
    getCommunityTop();
  }
  if (favorite === null) {
    getCommunityFavorite();
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
        <Text style={styles.headerText}>community</Text>
      </View>
      <View style={styles.communityTabs}>
        <TouchableOpacity 
          style={[styles.communityTab, {backgroundColor: currTab == 'recent' ? '#DC95FE' : '#e7b3ff' }]}
          onPress={() => {setCurrTab('recent')}}
        >
          <Text style={styles.cTabText}>recent</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.communityTab, {backgroundColor: currTab == 'top' ? '#DC95FE' : '#e7b3ff'}]}
          onPress={() => {setCurrTab('top')}}
        >
          <Text style={styles.cTabText}>top rated</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.communityTab, {backgroundColor: currTab == 'favorite' ? '#DC95FE' : '#e7b3ff'}]}
          onPress={() => {setCurrTab('favorite')}}
        >
          <Text style={styles.cTabText}>favorite</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pageBody}>
        {currTab === 'recent' &&
          <ScrollView showsVerticalScrollIndicator={false} styles={styles.scrollContainer}>
          { recent !== null &&
          (
            recent.map((element, index) => (
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
                historyPage={false}
              />
            ))
          )}
          {recent !== null && recent.length === 0 && 
          (
            <Text style={styles.secFontBold}>an error occurred...</Text>
          )}
          { recent === null 
          && (
            <Text style={styles.secFontBold}>loading recents...</Text>
          )}
        </ScrollView>
        }
        {currTab === 'top' &&
          <ScrollView showsVerticalScrollIndicator={false} styles={styles.scrollContainer}>
          { top !== null &&
          (
            top.map((element, index) => (
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
              />
            ))
          )}
          {top !== null && top.length === 0 &&
          (
            <Text style={styles.secFontBold}>an error occurred...</Text>
          )}
          { top === null 
          && (
            <Text style={styles.secFontBold}>loading top rated...</Text>
          )}
        </ScrollView>
        }
        {currTab === 'favorite' &&
          <ScrollView showsVerticalScrollIndicator={false} styles={styles.scrollContainer}>
          { favorite !== null &&
          (
            favorite.map((element, index) => (
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
              />
            ))
          )}
          {favorite !== null && favorite.length === 0 && 
          (
            <Text style={styles.secFontBold}>you don't seem to have any favorites!</Text>
          )}
          { favorite === null 
          && (
            <Text style={styles.secFontBold}>loading your favorites...</Text>
          )}
        </ScrollView>
        }
      </View>
        
    </View>
  );
}

const mapStateToProps = (state) => ({
  storedUserName: state.user.name,
});

CommunityScreen.propTypes = {
  storedUserName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(CommunityScreen);
