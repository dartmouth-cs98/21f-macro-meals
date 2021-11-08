/*
 * Macro Meals
 * central style sheet for elements
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#339DFF',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fullScreen: {

  },

  foodCard: {

  },

  cards: {

  },

  navPrimBtn: {
    backgroundColor: '#339DFF',
    width: '28vw',
    height: '28vw',
    border: '4px solid white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1000px',
    margin: '4vw',
  },

  navSecBtn: {
    backgroundColor: '#339DFF',
    width: '16vw',
    height: '16vw',
    border: '3px solid white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
  },

  navTertBtn: {
    position: 'absolute',
    top: '4vw',
    right: '4vw',
    backgroundColor: '#339DFF',
    width: '10vw',
    height: '10vw',
    border: '3px solid white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1000px',
  },

});

export default styles;
