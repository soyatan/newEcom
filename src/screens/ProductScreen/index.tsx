import {Picker} from '@react-native-picker/picker';
import {useRoute, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import {Auth, DataStore} from 'aws-amplify';
import {CartProduct, Product} from '../../models';

import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';
import QuantitySelector from '../../components/QuantitySelector';
import styles from './styles';

const ProductScreen = () => {
  const [selectedOption, setselectedOption] = useState<string | null>(null);
  const [product, setproduct] = useState<Product | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (!route.params?.id) {
      return;
    }
    DataStore.query(Product, route.params.id).then(setproduct);
  }, [route.params?.id]);

  useEffect(() => {
    if (product?.options) {
      setselectedOption(product.options[0]);
    }
  }, [product]);

  const onAddToCart = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    if (!product || !userData) {
      return;
    }

    const newCartProduct = new CartProduct({
      userSub: userData.attributes.sub,
      quantity,
      option: selectedOption,
      productID: product.id,
    });

    await DataStore.save(newCartProduct);
    navigation.navigate('shoppingCart');
  };

  if (!product) {
    return <ActivityIndicator />;
  }
  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>
      <ImageCarousel images={product.images} />
      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setselectedOption(itemValue)}>
        {product.options.map(option => (
          <Picker.Item label={option} value={option} />
        ))}
      </Picker>
      <Text style={styles.price}>
        from ${product.price.toFixed(2)}
        {product.oldPrice && (
          <Text style={styles.oldPrice}>${product.oldPrice.toFixed(2)}</Text>
        )}
      </Text>
      <Text style={styles.description}>{product.description}</Text>
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      <Button
        text={'Add to Cart'}
        onPress={onAddToCart}
        containerStyles={{backgroundColor: '#e3c905'}}
      />
      <Button
        text={'Buy Now'}
        onPress={() => {
          console.warn('Buy now');
        }}
      />
    </ScrollView>
  );
};

export default ProductScreen;
