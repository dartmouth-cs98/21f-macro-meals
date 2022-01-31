/*
 * Macro Meals
 * central style sheet for elements
 */

import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const primColor = '#F956F2';
const neutralColor = '#FFFAF0'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primColor,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  verticalContainer: {
    display: 'flex',
    fledDirection: 'column',
    backgroundColor: neutralColor,
    color: 'black',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: primColor,
    color: 'white',
    padding: '10px',
  },

  headerText: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },

  communityTabs: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: neutralColor,
  },

  communityTab: {
    width: '30%',
    marginLeft: '5px',
    marginRight: '5px',
    marginBottom: '10px',
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '8px',
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
  },

  cTabText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },

  pageBody: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: neutralColor,
    color: '#54595F',
    padding: '10px',
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

  centerMeEvenly: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  pt1: {
    paddingTop: 10,
  },

  navPrimBtn: {
    backgroundColor: primColor,
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
    backgroundColor: primColor,
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
    backgroundColor: primColor,
    width: 0.1 * windowWidth,
    height: 0.1 * windowWidth,
    borderColor: 'white',
    borderWidth: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    zIndex: 2,
  },
  navTertBtnLeft: {
    position: 'absolute',
    top: 0.08 * windowWidth,
    left: 0.04 * windowWidth,
    backgroundColor: primColor,
    width: 0.1 * windowWidth,
    height: 0.1 * windowWidth,
    borderColor: 'white',
    borderWidth: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    zIndex:2,
  },

  backBtn: {
    position: 'absolute',
    top: 0.04 * windowWidth,
    left: 0.04 * windowWidth,
    backgroundColor: primColor,
    width: 0.1 * windowWidth,
    height: 0.1 * windowWidth,
    borderColor: 'white',
    borderWidth: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
  },

  authBtn: {
    backgroundColor: primColor,
    padding: 8,
    borderRadius: 2,
    display: 'flex',
    justifyContent: 'center',
  },

  authBtnFont: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 0.06 * windowWidth,
    display: 'flex',
    justifyContent: 'center',
  },

  mainFormElement: {
    backgroundColor: primColor,
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
    backgroundColor: primColor,
    color: 'white',
    padding: 5,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 3,
  },


  subHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  
  subSubHeaderText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },

  boldWhiteText: {
    color: 'white',
    fontWeight: 'bold',
  },

  // FONTS

  primFont: {
    color: primColor,
  },

  primFontBold: {
    color: primColor,
    fontWeight: 'bold',
  },

  secFont: {
    color: '#54595F',
  },

  secFontBold: {
    color: '#54595F', 
    fontWeight: 'bold', 
  },

  // OLD MEAL-CARDS STYLES

  overallContainer: {
    width: 0.9 * windowWidth,
    marginBottom: 20,
    backgroundColor: neutralColor,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#DC95FE',
    padding: 10,
    position: 'relative',

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
    overflow: 'hidden',
  },
  mealText: {
    width: '60%',
    height: '100%',

    justifyContent: 'center',

  },
  mealNameContainer: {
    paddingBottom: 10,

  },
  mealNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: primColor,

  },
  mealInformation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealColumn: {
    display: 'flex',
    flexDirection: 'column',
  },

});

export default styles;
