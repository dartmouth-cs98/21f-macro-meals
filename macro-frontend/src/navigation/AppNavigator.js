import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from '../screens/MainScreen';
import BreakdownScreen from '../screens/BreakdownScreen';
import NewUserScreen from '../screens/NewUserScreen';
import LoginScreen from '../screens/LoginScreen';
import LogoutScreen from '../screens/LogoutScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoadingScreen from '../screens/LoadingScreen';

const AuthStack = createStackNavigator(
  {
    NewUser: NewUserScreen,
    Login: LoginScreen,
    Logout: LogoutScreen,
    Register: RegisterScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'NewUser',
  },
);

const AppStack = createStackNavigator(
  {
    Main: MainScreen,
    Breakdown: BreakdownScreen,
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
