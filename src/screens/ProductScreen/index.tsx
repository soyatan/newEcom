import {Picker} from '@react-native-picker/picker';
import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import product from '../../data/product';
import styles from './styles';

const ProductScreen = () => {
  const [selectedOption, setselectedOption] = useState(
    product.options ? product.options[0] : null,
  );
  const [quantity, setQuantity] = useState(1);
  const route = useRoute();
  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

export default ProductScreen;
