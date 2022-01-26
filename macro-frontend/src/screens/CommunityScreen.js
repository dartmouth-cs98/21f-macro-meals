import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles';

const windowWidth = Dimensions.get('window').width;
const macroLogo = require('../../assets/macroLogo.png');

function CommunityScreen({ navigation, storedUserName }) {
  const [currTab, setCurrTab] = useState('top');
  return (
    <View style={styles.verticalContainer}>
      <TouchableOpacity
        style={styles.navTertBtn}
        onPress={() => { navigation.navigate('Main'); }}
      >
        <Text>
          <Icon name="camera" color="white" style={{ fontSize: 0.05 * windowWidth }} />
        </Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>Community</Text>
      </View>
      <View style={styles.communityTabs}>
        <TouchableOpacity 
          style={[styles.communityTab, {backgroundColor: currTab == 'recent' ? '#339DFF' : '#8bc6fd'}]}
          onPress={() => {setCurrTab('recent')}}
        >
          <Text style={styles.cTabText}>Recent</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.communityTab, {backgroundColor: currTab == 'top' ? '#339DFF' : '#8bc6fd'}]}
          onPress={() => {setCurrTab('top')}}
        >
          <Text style={styles.cTabText}>Top Rated</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.communityTab, {backgroundColor: currTab == 'favorite' ? '#339DFF' : '#8bc6fd'}]}
          onPress={() => {setCurrTab('favorite')}}
        >
          <Text style={styles.cTabText}>Favorite</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.communityBody}>
        <Text>This should be the body!</Text>
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
