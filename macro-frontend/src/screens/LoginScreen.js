import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Text, View, Animated, Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, CheckBox, Input } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import Panel from '../components/panel';
import styles from '../styles';

const windowWidth = Dimensions.get('window').width;

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
        <Panel>
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
                  color={usernameStatus === 'okay' ? 'black' : 'red'}
                />
                        )}
            />

            <Input
              placeholder="password"
              onChangeText={(text) => {
                setPassWord(text);
                setPasswordStatus('okay');
              }}
              value={passWord}
              leftIcon={(
                <Icon
                  name="lock"
                  size={24}
                  color={passwordStatus === 'okay' ? 'black' : 'red'}
                />
                        )}
            />
            <CheckBox
              title="keep me signed in"
              name="ALWAYS"
              checked={keepSignedIn}
              onPress={() => { setKeepSignedIn(!keepSignedIn); }}
            />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Button
                title="login"
                onPress={() => { validateLogin(); }}
                style={{ width: 0.25 * windowWidth }}
              />
              <Button
                title="register"
                onPress={() => navigation.navigate('Register')}
                style={{ width: 0.25 * windowWidth }}
              />
            </View>
            <View>
              {messages.map((msg) => <Text key={msg}>{msg}</Text>)}
            </View>
          </View>
        </Panel>
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
