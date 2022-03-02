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

  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },

  flexCol: {
    display: 'flex',
    width: '30%',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },

  pt1: {
    paddingTop: 10,
  },

  navBtnsWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'relative',
    paddingBottom: 0.05 * windowWidth,
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
    top: 0.1 * windowWidth,
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
    top: 0.1 * windowWidth,
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
    zIndex: 2,
  },

  navQuadBtnLeft: {
    position: 'absolute',
    top: 0.1 * windowWidth,
    left: 0.16 * windowWidth,
    backgroundColor: secColor,
    width: 0.22 * windowWidth,
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

  backBtn: {
    position: 'absolute',
    top: 0.1 * windowWidth,
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

    zIndex: 1,
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

  formWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    paddingTop: 25,
  },

  formBtnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-evenly',
  },

  formIconSelect: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 10,
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
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
  },

  mainFormBtn: {
    backgroundColor: primColor,
    color: 'white',
    padding: 5,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 3,
  },

  mainFormBtnDisabled: {
    backgroundColor: 'gray',
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

  // RECIPE SCREEN
  recipeContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: neutralColor,
  },

  informationContainer: {
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  titleContainer: {
    width: '60%',
    height: '20%',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    margin: 10,
  },

  titleImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 5,
  },

  titleText: {
    color: secColor,
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 15,
  },

  ingredientContainer: {
    flex: 1,
    width: '100%',
    height: '10%',
    marginBottom: 50,
  },

  ingredientScroll: {
    marginRight: 5,
    marginLeft: 5,
  },

  ingredientCardContainer: {
    display: 'flex',
    height: 100,
    borderRadius: 10,
    padding: 30,

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    margin: 5,

    backgroundColor: '#F956F2',
  },

  ingredientTitle: {
    fontWeight: '300',
    fontSize: 20,
    color: '#ffffff',
  },

  ingredientAmount: {
    fontWeight: '700',
    fontSize: 15,
    color: '#ffffff',
  },

  instructionConatiner: {
    flex: 1,
    width: '100%',
    height: 500,
  },

  allIngredient: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',

    justifyContent: 'center',
  },

  instructionScroll: {
    marginRight: 15,
    marginLeft: 15,
  },

  instructionCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 20,
    marginBottom: 10,

    borderRadius: 8,
    backgroundColor: '#F956F2',
  },

  instructionText: {
    fontWeight: '500',
    fontSize: 15,
    color: '#ffffff',
    textAlign: 'left',

    lineHeight: 25,
  },

  sectionTitles: {
    fontWeight: '500',
    color: secColor,
    fontSize: 20,
    marginBottom: 15,
  },

  // updated meal cards
  mealCardContainerExpand: {
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  mealInformation: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
  },

  suggestedRecipeCard: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',

    borderStyle: 'solid',
    borderColor: '#DC95FE',
    borderWidth: 3,
    borderRadius: 7,

    width: '30%',
    height: '50%',
  },

  recipeImage: {
    height: '40%',
    width: '20%',
    resizeMode: 'contain',
  },

  subheaderText: {
    fontSize: 5,
    width: '80%',
    textAlign: 'center',
    textTransform: 'lowercase',
  },

  suggestedRecipeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',

    height: '30%',
    width: '100%',
  },

  spoonacularRecipe: {
    display: 'flex',
    flexDirection: 'row',
  },

  mealCardRecipeFont: {
    fontSize: 10,
    color: 'black',
    fontWeight: 'normal',

    textAlign: 'center',
    textTransform: 'lowercase',
  },

  foodImageExpand: {
    width: '40%',
    height: '80%',

    resizeMode: 'cover',
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 20,

  },

  mealCardExpandView: {
    width: '80%',
    height: '40%',

    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 50,
    marginTop: 10,

  },

  mealCardColumnExpand: {
    width: '60%',

    padding: 8,

    borderStyle: 'solid',
    borderColor: '#DC95FE',
    borderWidth: 2,
    borderRadius: 7,
  },

  subsectionHeader: {
    width: '100%',
    textTransform: 'uppercase',

    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'left',
    marginLeft: 30,
    marginBottom: 30,
  },

  mealNameTextExp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: secColor,

    marginTop: 25,
    marginBottom: 20,
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
    alignContent: 'center',
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

    marginRight: 10,
  },

  mealText: {
    display: 'flex',
    flexDirection: 'row',

    width: '60%',
    height: '100%',

    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',

  },

  allMealInfo: {
    height: '100%',
    justifyContent: 'center',
  },

  mealNameContainer: {
    paddingBottom: 10,

  },
  mealNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: secColor,

  },

  meal1Information: {
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
