import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from '../screens/MainScreen';
import BreakdownScreen from '../screens/BreakdownScreen';
import LoginScreen from '../screens/LoginScreen';
import LogoutScreen from '../screens/LogoutScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoadingScreen from '../screens/LoadingScreen';
import MealOverviewScreen from '../screens/MealOverviewScreen';
import CommunityScreen from '../screens/CommunityScreen';
import UserScreen from '../screens/UserScreen';
import TestingScreen from '../screens/TestingScreen';

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Logout: LogoutScreen,
    Register: RegisterScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
  },
);

const AppStack = createStackNavigator(
  {
    Main: MainScreen,
    Breakdown: BreakdownScreen,
    Overview: MealOverviewScreen,
    Community: CommunityScreen,
    User: UserScreen,
    Testing: TestingScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Main',
  },
);

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      AppLoading: LoadingScreen,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'AppLoading',
    },
  ),
);

export default createAppContainer(AppNavigator);
