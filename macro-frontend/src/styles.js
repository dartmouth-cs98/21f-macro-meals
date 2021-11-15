/*
 * Macro Meals
 * central style sheet for elements
 */

import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#339DFF',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  historyContainer: {
    flex: 1,
    backgroundColor: '#339DFF',
    color: 'white',
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight,
    position: 'relative',
  },

  scrollContainer: {
    flex: 1,
    width: 0.8 * windowWidth,
    height: 0.8 * windowHeight,
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

  backBtn: {
    position: 'absolute',
    top: 0.04 * windowWidth,
    left: 0.04 * windowWidth,
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

  mainFormElement: {
    backgroundColor: '#339DFF',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 3,
    width: 0.7 * windowWidth,
    fontSize: 16,
    marginBottom: 20,
  },

  mainFormBtn: {
    backgroundColor: '#339DFF',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 3,
  },

  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },

});

export default styles;
