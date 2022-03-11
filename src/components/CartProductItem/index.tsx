import React, {useState} from 'react';
import {Image, View, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import QuantitySelector from './../QuantitySelector/index';
import {DataStore} from 'aws-amplify';
import {CartProduct} from '../../models';

interface CartProductItemProps {
  cartItem: {
    id: string;
    quantity: number;
    option?: string;
    item: {
      id: string;
      title: string;
      image: string;
      avgRating: number;
      ratings: number;
      price: number;
      oldPrice?: number;
    };
  };
}

const CartProductItem = ({cartItem}: CartProductItemProps) => {
  console.log(cartItem);
  const {product, ...cartProduct} = cartItem;

  const updateQuantity = async (newQuantity: number) => {
    const original = await DataStore.query(CartProduct, cartProduct.id);

    await DataStore.save(
      CartProduct.copyOf(original, updated => {
        updated.quantity = newQuantity;
      }),
    );
  };
  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image style={styles.image} source={{uri: product.image}} />
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {product.title}
          </Text>
          <View style={styles.ratingsContainer}>
            {[0, 0, 0, 0, 0].map((el, i) => (
              <FontAwesome
                key={`${product.id}-${i}`}
                style={styles.star}
                name={i < Math.floor(product.avgRating) ? 'star' : 'star-o'}
                size={18}
                color={'#e47911'}
              />
            ))}
            <Text>{product.ratings}</Text>
          </View>
          <Text style={styles.price}>
            from ${product.price}
            {product.oldPrice && (
              <Text style={styles.oldPrice}> ${product.oldPrice}</Text>
            )}
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <QuantitySelector
          quantity={cartProduct.quantity}
          setQuantity={updateQuantity}
        />
      </View>
    </View>
  );
};
export default CartProductItem;
