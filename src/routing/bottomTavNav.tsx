import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeStack from './HomeStack';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeScreen from './../screens/HomeScreen/index';
import ShoppingCartStack from './ShoppingCartStack';
import MenuScreen from './../screens/MenuScreen/index';
const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarInactiveTintColor: '#ffbd7d',
        tabBarActiveTintColor: '#e47911',
        headerShown: false,
      }}>
      <Tab.Screen
        component={HomeStack}
        name={'home'}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        component={HomeScreen}
        name="profile"
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="user" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        component={ShoppingCartStack}
        name="shoppingCart"
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="shopping-cart" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        component={MenuScreen}
        name="more"
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="menu" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
