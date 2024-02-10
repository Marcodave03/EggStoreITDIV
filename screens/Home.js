import React,{useState,useEffect} from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator, Pressable } from 'react-native';
import axios from 'axios';
import ListViewIcon from '../components/ListViewIcon';
import GridViewIcon from '../components/GridViewIcon';

const Home = ({navigation}) =>{
  const [isGridView, setIsGridView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [points, setPoints] = useState(5000);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = text => {
    setSearchQuery(text);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ProductItem = ({ item, isGridView }) => {
    //Shadow styles for iOS
    const shadowIOS = {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
    };
  
    
  
    const gridStyle = isGridView ? {
      width: '100%', 
      flexDirection: 'column', 
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      alignItems: 'center', 
      marginBottom: 10, 
      ...shadowIOS,
      elevation: 3,
    } : listStyle;
  
    const listStyle = {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      ...shadowIOS, 
      elevation: 3, 
      padding: 10,
    };
    
    const gridsStyles = {
      width:120,
      flex:1,
      padding:20,
    }

    const listsStyles = {
      width:120,
      flex:1,
      flexDirection:'row',
      alignItems:'center',
    }
        
    return (
      <TouchableOpacity style={isGridView ? gridStyle : listStyle} onPress={() => navigation.navigate("DetailPage", { product: item, points, setPoints })}>
        <View style={isGridView ? gridsStyles : listsStyles}>
        <Image
          source={{ uri: item.image }}
          style={isGridView ? {
            resizeMode:"contain",
            
            borderRadius: 10,
            alignItems:'center',
          } : {
            width: 50,
            height: 50,
            borderRadius: 10,
          }}
        />
        <View style={{
          flex: 1,
          justifyContent: 'center',
          padding: 10,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 4,
          }}>
            {item.title}
          </Text>
          <Text style={{
            fontSize: 16,
            color: '#666',
          }}>
            ${item.price}
          </Text>
        </View> 
        </View>

      </TouchableOpacity>
    );
  };

  

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  

  return (
    <View style={{ flex:1, backgroundColor:'#fff' }}>
      <View style={{ backgroundColor:'#8775A9', padding:20 }}>
        <View style={{
          flexDirection:'row',
          alignItems:'center',
          padding:5,
          backgroundColor:'#f2f2f2',
          borderRadius:10,
        }}>
          <Image 
            source={require("../assets/search.png")}
            style={{ height:19, width:19, marginRight:5, marginLeft:10 }}
          />
        <TextInput
          placeholder="Search Product.."
          style={{ flex:1, alignItems:'center', borderRadius:20, padding:10 }}
          onChangeText={handleSearch} 
          value={searchQuery} 
        />
        </View>
        <View style={{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between',
          marginTop: 5,
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Product')} >
          <View style={{
            flexDirection:"row",
            backgroundColor:'#fff',
            padding:15,
            marginTop:5,
            borderRadius:8,
            width:140,
          }}>
            <Text>My Products</Text>
            <Image 
              source={require("../assets/arrow.png")}
              style={{ height:19, width:19, marginLeft:8 }}
            />
          </View>
          </TouchableOpacity>


        </View>
      </View>

      <Text style={{
            position: 'absolute',
            backgroundColor: '#fff',
            width: 120,
            borderRadius: 20,
            paddingVertical: 10,
            paddingBottom:20,
            paddingHorizontal: 20,
            top: 80, 
            right: 20, 
            zIndex: 1, 
            elevation: 5, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            flexDirection: 'row',
            justifyContent: 'center', 
            alignItems: 'center', 
      }}>
        <Text style={{
              color: '#7A44CF', 
              fontWeight: 'bold',
              fontSize: 18, 
        }}>{points}</Text>
        <Text style={{
              color: '#7A44CF', 
              fontSize: 14, 
              marginLeft: 30, 
        }}> My coins</Text>
      </Text>

      <View style={{ padding:20 }}>
        <View style={{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between'
        }}>
          <Text style={{ fontSize:25, fontWeight:'bold' }}>Available Products</Text>
          <TouchableOpacity onPress={() => setIsGridView(!isGridView)}>
            {isGridView ? <ListViewIcon style={{height:30, width:30}}/> : <GridViewIcon style={{height:30, width:30}}/>}
          </TouchableOpacity>
        </View>
        {isGridView ? (
          <FlatList
            data={filteredProducts}
            renderItem={ProductItem}
            keyExtractor={(item) => item.id}
            key={isGridView ? 1 : 0}
            numColumns={isGridView ? 2 : 1}
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        ) : (
          <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
            {filteredProducts.map((item) => (
              <ProductItem key={item.id} item={item} />
            ))}
          </ScrollView>
        )}
      </View>
      <TouchableOpacity style={{
            position: 'absolute', 
            right: 20, 
            bottom: 20, 
            backgroundColor: '#fff',
            width: 60, 
            height: 60, 
            borderRadius: 30, 
            justifyContent: 'center', 
            alignItems: 'center', 
            elevation: 5, 
            shadowColor: '#000', 
            shadowOffset: { width: 3, height: 3 },
            shadowOpacity: 0.3, 
            shadowRadius: 6, 
      }} onPress={() => navigation.navigate('Minigame', { points, setPoints })}>
        <Image 
            source={require("../assets/egg-full.png")}
            style={{ height:25, width:25, marginRight:5, marginLeft:10 }}
        />
      </TouchableOpacity>

    </View>
  );
}
    
    export default Home;

