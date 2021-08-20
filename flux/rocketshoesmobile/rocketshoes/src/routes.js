import {createAppContainer} from 'react-navigation';
import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Cart from './pages/Cart/index';
import Home from './pages/Home/index';
import Header from './components/Header/index';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Home,
      Cart,
    },
    {
      headerTitleAlign: 'center',
      defaultNavigationOptions: navigation => ({
        header: () => <Header {...navigation} />,
        cardStyle: {
          backgroundColor: '#191920',
        },
      }),
    },
  ),
);

export default Routes;
