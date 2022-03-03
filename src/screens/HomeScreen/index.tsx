import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import product from '../../data/product';
import products from '../../data/products';
import ProductItem from './../../components/ProductItem/index';

const HomeScreen = ({searchValue}: {searchValue: string}) => {
  console.log(searchValue);
  return (
    <View style={style.page}>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const style = StyleSheet.create({
  page: {padding: 10},
});

export default HomeScreen;
