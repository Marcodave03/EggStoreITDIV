// In ProductDetails.js
import React,{useState} from 'react';
import { View, Text, Image, ScrollView, Button, StyleSheet, TouchableOpacity, Modal  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailPage = ({ route, navigation }) => {
  const { product, points, setPoints } = route.params;
  const [modalVisible, setModalVisible] = useState(false);



  const handleBuyPress = async () => {
    if (points >= product.price) {
      setPoints(prevPoints => prevPoints - product.price); 
  
      try {
        const savedProducts = await AsyncStorage.getItem('purchasedProducts');
        const savedProductsArray = savedProducts ? JSON.parse(savedProducts) : [];
        savedProductsArray.push(product);
        await AsyncStorage.setItem('purchasedProducts', JSON.stringify(savedProductsArray));
      } catch (error) {
        console.error('Failed to save the product', error);
      }
  
      setModalVisible(true); 
    } else {
      alert('Not enough points to buy this product');
    }
  };

  return (
    <View style={{
        backgroundColor:'#fff'
    }}>
        <View style={{
            marginTop:10,
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:'#fff'
        }}>
             <TouchableOpacity onPress={() => navigation.goBack()}> 
                <Image 
                    source={require("../assets/arrow.png")}
                    style={{ height: 19, width: 19, marginRight: 10, transform: [{ scaleX: -1 }] }}
                />
            </TouchableOpacity>
            <Text style={{
                fontSize:20,
                fontWeight:'bold',
            }}>{product.title}</Text>
        </View>
        
        <ScrollView style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>Price</Text>
                <Text style={styles.priceValue}>{product.price} Coins</Text>
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.description}>{product.description}</Text>
            <Button title="Buy" onPress={handleBuyPress} />

       
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}

            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Success!</Text>
                  <Text>Product 1 was bought successfully! Your current balance is {points-product.price}.</Text>
                  <TouchableOpacity
                        style={styles.buttonClose}
                        onPress={() => setModalVisible(false)}
                  >
                        <Text style={styles.textStyle}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            </View>
        </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300, 
    resizeMode: 'contain',
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceValue: {
    fontSize: 14,
    marginBottom: 8,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10, 
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DetailPage;
