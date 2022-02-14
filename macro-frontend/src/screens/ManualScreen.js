import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles';

const windowWidth = Dimensions.get('window').width;

function ManualScreen({ navigation, storedUserName }) {
  console.log(navigation.state);
  console.log(navigation.state.params);
  console.log(navigation.state.params.imageUrl);

  const [classification, setClassification] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');

  const submitForm = () => {
    let data = {
      classification,
      protein,
      carbs,
      fats,
    };

    if (foodId) {
      data.id = foodId;
    }
    if (foodUrl) {
      data.imageUrl = imageUrl;
    }
    console.log(data);
  }

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        <TextInput
          style={styles.mainFormElement}
          onChangeText={setClassification}
          value={classification}
          placeholder="food class (ex. apple)"
          placeholderTextColor="white"
        />
        <View style={styles.mainFormElement}>
          <Text style={{ color: 'white', fontSize: 16 }}>macros</Text>
          <View style={styles.centerMeEvenly}>
            <View style={styles.flexCol}>
              <Text style={{ color: 'white', fontSize: 12 }}>protein</Text>
              <TextInput
                onChangeText={setProtein}
                value={protein}
                placeholder="0"
                placeholderTextColor="white"
              />
            </View>
            <View style={styles.flexCol}>
              <Text style={{ color: 'white', fontSize: 12 }}>carbs</Text>
              <TextInput
                onChangeText={setCarbs}
                value={carbs}
                placeholder="0"
                placeholderTextColor="white"
              />
            </View>
            <View style={styles.flexCol}>
              <Text style={{ color: 'white', fontSize: 12 }}>fats</Text>
              <TextInput
                onChangeText={setFats}
                value={fats}
                placeholder="0"
                placeholderTextColor="white"
              />
            </View>
          </View>
        </View>
        <View style={styles.formBtnWrapper}>
            <TouchableOpacity onPress={submitForm} style={styles.mainFormBtn}>
              <Text style={{ color: 'white', fontSize: 16 }}>submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigation.navigate('Main')} style={styles.mainFormBtn}>
              <Text style={{ color: 'white', fontSize: 16 }}>cancel</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  storedUserName: state.user.name,
});

ManualScreen.propTypes = {
  storedUserName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ManualScreen);
