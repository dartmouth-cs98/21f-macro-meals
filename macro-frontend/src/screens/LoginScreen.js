import React, { useState, useEffect } from 'react';
import { Text, View, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, CheckBox, Input } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import Panel from '../components/panel';
import styles from '../styles';

const fadeAnimation = new Animated.Value(0);
const SceneLogin = ({
  login,
  storedUserName,
  isUserLoggedIn,
  navigation,
}) => {
  const [userName, setUserName] = useState('');
  const [status, setStatus] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  useEffect(() => {
    setStatus(isUserLoggedIn
      ? `Welcome, ${storedUserName}!`
      : '');
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
    }).start();
  };

  fadeIn();

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
              onChangeText={(text) => setUserName(text)}
              value={userName}
              leftIcon={(
                <Icon
                  name="user"
                  size={24}
                  color="black"
                />
                        )}
            />

            <Input
              placeholder="password"
              leftIcon={(
                <Icon
                  name="lock"
                  size={24}
                  color="black"
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
                onPress={() => login(userName || 'Anon')}
                style={{ width: '25vw' }}
              />
              <Button
                title="register"
                onPress={() => navigation.navigate('Register')}
                style={{ width: '25vw' }}
              />
            </View>
            <Text>{status}</Text>
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
