import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Minigame = ({ navigation, route }) => { 
  const [eggBroken, setEggBroken] = useState(false);
  const [coin, setCoin] = useState(null);
  const { points, setPoints } = route.params;

  
  const coins = [
    { type: 'gold', value:100, image: require('../assets/gold-coin.png') },
    { type: 'silver', value:50, image: require('../assets/silver-coin.png') },
    { type: 'bronze', value:20, image: require('../assets/bronze-coin.png') },
  ];

  const handleEggPress = () => {
    if (!eggBroken) {
      setEggBroken(true);
      const randomCoin = coins[Math.floor(Math.random() * coins.length)];
      setCoin(randomCoin);

      setPoints(currentPoints => {
        const coinValues = {
          'gold': 100,
          'silver': 50,
          'bronze': 20
        };
        return currentPoints + coinValues[randomCoin.type];
      });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image 
            source={require("../assets/arrow.png")}
            style={styles.arrow}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Minigame</Text>
      </View>

      <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
      }}>
        {
          coins.map((coin, index) => (
          <View key={index} style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <Image source={coin.image} style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
          }} />
          <Text style={{
                marginLeft: 5,
                fontSize: 16,
                fontWeight: 'bold',
          }}>{coin.value}</Text>
          </View>
        ))}
      </View>



      <View style={styles.container}>
        <Text style={styles.instructions}>
            {eggBroken && coin ? `Congratulations! You got a ${coin.type} coin!` : "Click on the egg to get your prize!"}
        </Text>
        {eggBroken && coin && (
          <View style={styles.coinContainer}>
            <Image source={coin.image} style={styles.coinImage} />
            
          </View>
        )}
        <TouchableOpacity onPress={!eggBroken ? handleEggPress : null}>
          <Image 
            source={eggBroken ? require('../assets/egg-broken.png') : require('../assets/egg-full.png')}
            style={styles.eggImage}
          />
        </TouchableOpacity>
        <Text style={styles.coinText}>
          {eggBroken && coin ? `${coin.type.charAt(0).toUpperCase() + coin.type.slice(1)} coin worth ${coin.value} has been added to your balance` : ""}  
        </Text>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  arrow: {
    height: 19,
    width: 19,
    marginRight: 10,
    transform: [{ scaleX: -1 }],
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  eggImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  coinContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  coinImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  coinText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },

});

export default Minigame;
