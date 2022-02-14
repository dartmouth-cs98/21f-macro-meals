/*
 * Macro Meals
 * central style sheet for elements
 */

import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const primColor = '#FFC757';
const secColor = '#DC95FE';
const neutralColor = '#FFFAF0';
const gradientPrimColor = '#F956F2';
const gradientSecColor = '#FECF56';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: neutralColor,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  verticalContainer: {
    display: 'flex',
    flexDirection: 'column',
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
    textAlign: 'center',
    color: 'white',
    padding: 10,
  },

  headerText: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    color: primColor,
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
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    borderRadius: 8,
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },

  cTabText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
  },

  pageBody: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: neutralColor,
    color: '#54595F',
    padding: 10,
    flex: 1,
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
    textAlign: 'center',
  },

  centerMeColumn: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
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
    backgroundColor: secColor,
    width: 0.28 * windowWidth,
    height: 0.28 * windowWidth,
    borderColor: 'white',
    borderWidth: 4,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    margin: 0.04 * windowWidth,
  },

  navSecBtn: {
    backgroundColor: secColor,
    width: 0.16 * windowWidth,
    height: 0.16 * windowWidth,
    borderColor: 'white',
    borderWidth: 3,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },

  navTertBtn: {
    position: 'absolute',
    top: 0.08 * windowWidth,
    right: 0.04 * windowWidth,
    backgroundColor: secColor,
    width: 0.1 * windowWidth,
    height: 0.1 * windowWidth,
    borderColor: 'white',
    borderWidth: 3,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    zIndex: 2,
  },
  navTertBtnLeft: {
    position: 'absolute',
    top: 0.08 * windowWidth,
    left: 0.04 * windowWidth,
    backgroundColor: secColor,
    width: 0.1 * windowWidth,
    height: 0.1 * windowWidth,
    borderColor: 'white',
    borderWidth: 3,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    zIndex:2,
  },

  backBtn: {
    position: 'absolute',
    top: 0.04 * windowWidth,
    left: 0.04 * windowWidth,
    backgroundColor: secColor,
    width: 0.1 * windowWidth,
    height: 0.1 * windowWidth,
    borderColor: 'white',
    borderWidth: 3,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 1000,
  },

  dangerBtn: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 2,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },

  authBtn: {
    backgroundColor: secColor,
    padding: 8,
    borderRadius: 2,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },

  authBtnFont: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },

  formToggle: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 3,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
    marginBottom: 12,
  },


  mainFormElement: {
    backgroundColor: secColor,
    color: 'white',
    padding: 5,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 3,
    width: 0.7 * windowWidth,
    fontSize: 16,
    marginBottom: 12,
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
    color: secColor,
  },

  primFontBold: {
    color: secColor,
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
    borderColor: secColor,
    padding: 10,
    position: 'relative',

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  overallContainerVertical: {
    width: 0.9 * windowWidth,
    marginBottom: 20,
    backgroundColor: neutralColor,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: secColor,
    padding: 10,
    position: 'relative',

    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
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
    textAlign: 'center',

  },
  mealNameContainer: {
    paddingBottom: 10,

  },
  mealNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: secColor,

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
