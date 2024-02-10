import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProductsPage = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getSavedProducts = async () => {
      try {
        const products = await AsyncStorage.getItem('purchasedProducts');
        setSavedProducts(products ? JSON.parse(products) : []);
      } catch (error) {
        console.error('Failed to load products', error);
      }
    };

    getSavedProducts();
  }, []);

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>
          {item.title}
        </Text> 
      </View>
    </View>
  );


  
  return (

    <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image 
            source={require("../assets/arrow.png")}
            style={styles.arrow}
            />
        </TouchableOpacity>
        <Text style={styles.header}>My Products</Text>
        </View>
        <FlatList
            data={savedProducts}
            renderItem={renderProduct}
            keyExtractor={item => item.id.toString()}
        />
    </View>




  );
};

const styles = StyleSheet.create({
    textContainer: {
        flex: 1, 
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        flexShrink: 1, 
    },

    arrow: {
        height: 19,
        width: 19,
        marginRight: 10,
        transform: [{ scaleX: -1 }],
        
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10, 
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#fff',
    },

    productContainer: {
      flexDirection: 'row',
      padding: 10,
      margin: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    productImage: {
      width: 50,
      height: 50,
      borderRadius: 25, 
      marginRight: 10,
    },
    textContainer: {
      justifyContent: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default ProductsPage;
