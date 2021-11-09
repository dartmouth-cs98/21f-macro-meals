import React, { useState } from 'react';
import axios from 'axios';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import Panel from '../components/panel';
import styles from '../styles';

const SceneRegister = () => {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [passWordConfirm, setPassWordConfirm] = useState('');
  const [usernameStatus, setUsernameStatus] = useState('okay');
  const [passwordStatus, setPasswordStatus] = useState('okay');
  const [errorMessages, setErrorMessages] = useState([]);

  const validateRegister = () => {
    let status = 'valid';
    setErrorMessages([]);
    const intErrorMessages = [];

    if (userName === '') {
      setUsernameStatus('error');
      status = 'failed';
      intErrorMessages.push('Please enter a username.');
    }
    if (passWord === '') {
      setPasswordStatus('error');
      status = 'failed';
      intErrorMessages.push('Please enter a password.');
    }
    if (passWord !== passWordConfirm) { // ensure passwords match
      setPasswordStatus('error');
      status = 'failed';
      intErrorMessages.push('Your passwords do not match.');
    }
    if (status === 'valid') {
      // creating the account
      axios
        .post('https://macro-cs98.herokuapp.com/api/user/check', {
          username: userName,
        })
        .then((result) => {
          if (result.data.length === 0) { // username not taken, create account
            axios
              .post('https://macro-cs98.herokuapp.com/api/user/register', {
                username: userName,
                password: passWord,
              })
              .then((registerResult) => {
                console.log(registerResult);
              })
              .catch((error) => {
                alert(error);
              });
          } else { // username is taken, alert user
            setUsernameStatus('error');
            intErrorMessages.push('That username is taken.');
            setErrorMessages(intErrorMessages);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      setErrorMessages(intErrorMessages);
    }
  };

  return (
    <View style={styles.container}>
      <Panel>
        <View>
          <Text>register</Text>
        </View>
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

          <Input
            placeholder="confirm password"
            onChangeText={(text) => {
              setPassWordConfirm(text);
              setPasswordStatus('okay');
            }}
            value={passWordConfirm}
            leftIcon={(
              <Icon
                name="lock"
                size={24}
                color={passwordStatus === 'okay' ? 'black' : 'red'}
              />
                    )}
          />
          <Button
            title="register"
            onPress={() => { validateRegister(); }}
          />
        </View>
        <View>
          {errorMessages.map((msg) => <Text key={msg}>{msg}</Text>)}
        </View>
      </Panel>
    </View>
  );
};

export default SceneRegister;
