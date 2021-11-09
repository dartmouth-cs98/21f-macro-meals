/*
 * Macro Meals
 * central style sheet for elements
 */

import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#339DFF',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerMe: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  pt1: {
    paddingTop: 10,
  },

  fullScreen: {

  },

  foodCard: {

  },

  cards: {

  },

  navPrimBtn: {
    backgroundColor: '#339DFF',
    width: 0.28 * windowWidth,
    height: 0.28 * windowWidth,
    borderColor: 'white',
    borderWidth: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    margin: 0.04 * windowWidth,
  },

  navSecBtn: {
    backgroundColor: '#339DFF',
    width: 0.16 * windowWidth,
    height: 0.16 * windowWidth,
    borderColor: 'white',
    borderWidth: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },

  navTertBtn: {
    position: 'absolute',
    top: 0.08 * windowWidth,
    right: 0.04 * windowWidth,
    backgroundColor: '#339DFF',
    width: 0.1 * windowWidth,
    height: 0.1 * windowWidth,
    borderColor: 'white',
    borderWidth: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
  },

  authSecBtn: {
    backgroundColor: '#339DFF',
    color: 'white',
    padding: 4,
    borderRadius: 2,
  },

});

export default styles;
