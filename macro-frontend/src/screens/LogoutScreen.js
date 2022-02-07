import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogout } from '../redux/actions/userActions';
import Panel from '../components/panel';
import styles from '../styles';

const SceneLogOut = ({ navigation, logout }) => {
  useEffect(() => { logout(); }, [logout]);

  return (
    <View style={styles.container}>
      <Panel>
        <View>
          <Text style={{ marginBottom: 10 }}>logged out!</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.authBtn}>
            <Text style={styles.authBtnFont}>sign in</Text>
          </TouchableOpacity>
        </View>
      </Panel>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logout: (name) => dispatch(userLogout({ name })),
});

SceneLogOut.propTypes = {
  logout: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(SceneLogOut);
