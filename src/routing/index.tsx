import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNav from './bottomTavNav';
import {createStackNavigator} from '@react-navigation/stack';

const Root = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={{headerShown: false}}>
        <Root.Screen component={BottomTabNav} name="HomeTabs" />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default Router;
