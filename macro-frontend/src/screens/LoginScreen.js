import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  Text, View, Animated, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox, Input } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import styles from '../styles';

const fadeAnimation = new Animated.Value(0);
const SceneLogin = ({
  login,
  storedUserName,
  isUserLoggedIn,
  navigation,
}) => {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [usernameStatus, setUsernameStatus] = useState('okay');
  const [passwordStatus, setPasswordStatus] = useState('okay');
  const [messages, setMessages] = useState([]);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [currDisplay, setCurrDisplay] = useState('login');

  useEffect(() => {
    if (isUserLoggedIn) {
      setTimeout(() => {
        navigation.navigate('Main');
      }, 1500);
    }
  }, [isUserLoggedIn, storedUserName]);

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  fadeIn();

  const storeData = async (value) => {
    console.log('storing data!');
    try {
      await AsyncStorage.setItem('@storedUsername', value);
    } catch (e) {
      console.log(`Error saving data:${e}`);
    }
  };

  const toggleRememberMe = (value) => {
    setKeepSignedIn(value);
  };

  const validateLogin = () => {
    let formStatus = 'valid';
    const intMessages = [];

    if (userName === '') {
      setUsernameStatus('error');
      formStatus = 'failed';
      intMessages.push('Please enter a username.');
    }
    if (passWord === '') {
      setPasswordStatus('error');
      formStatus = 'failed';
      intMessages.push('Please enter a password.');
    }
    if (formStatus === 'valid') {
      // signing in the account
      axios
        .post('https://macro-cs98.herokuapp.com/api/user/login', {
          username: userName,
          password: passWord,
        })
        .then((result) => {
          if (result.data.length > 0) { // login success
            intMessages.push(`Welcome, ${userName}!`);
            setMessages(intMessages);
            setCurrDisplay('message');
            if (keepSignedIn) {
              storeData(userName);
            }
            login(userName);
          } else { // login failed
            setUsernameStatus('error');
            setPasswordStatus('error');
            intMessages.push('Username or password is incorrect.');
            setMessages(intMessages);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      setMessages(intMessages);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnimation,
          },
        ]}
      >
        <View>
          { currDisplay === 'login'
          && (
          <View>
            <Input
              placeholder="username"
              onChangeText={(text) => {
                setUserName(text);
                setUsernameStatus('okay');
              }}
              value={userName}
              leftIcon={(
                <Icon
                  name="user"
                  size={24}
                  color={usernameStatus === 'okay' ? '#54595F' : 'red'}
                />
                        )}
            />

            <Input
              placeholder="password"
              secureTextEntry
              onChangeText={(text) => {
                setPassWord(text);
                setPasswordStatus('okay');
              }}
              value={passWord}
              leftIcon={(
                <Icon
                  name="lock"
                  size={24}
                  color={passwordStatus === 'okay' ? '#54595F' : 'red'}
                />
                        )}
            />
            <CheckBox
              containerStyle={{ backgroundColor: 'transparent', border: 'none' }}
              checked={keepSignedIn}
              center
              title="remember me"
              checkedColor="#DC95FE"
              onPress={() => { toggleRememberMe(!keepSignedIn); }}
            />
            <View style={styles.centerMe}>
              <TouchableOpacity onPress={() => { validateLogin(); }} style={styles.authBtn}>
                <Text style={styles.authBtnFont}>login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Register')} style={[styles.authBtn, { marginLeft: 10 }]}>
                <Text style={styles.authBtnFont}>register here</Text>
              </TouchableOpacity>
            </View>
          </View>
          )}
          { currDisplay === 'message'
          && (
          <View>
            {messages.map((msg) => <Text key={msg} style={styles.secFontBold}>{msg}</Text>)}
          </View>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  storedUserName: state.user.name,
  isUserLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  login: (name) => dispatch(userLogin({ name })),
});

SceneLogin.defaultProps = {
  storedUserName: '',
};

SceneLogin.propTypes = {
  login: PropTypes.func.isRequired,
  storedUserName: PropTypes.string,
  isUserLoggedIn: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SceneLogin);
