import {Auth} from 'aws-amplify';
import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  Pressable,
} from 'react-native';
import Button from './../../components/Button/index';

const MenuScreen = () => {
  const onLogout = () => {
    Auth.signOut();
  };
  return (
    <SafeAreaView>
      <Button onPress={onLogout} text={'Sign Out'} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  page: {padding: 10},
});

export default MenuScreen;
