import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import {LinearGradient} from 'expo-linear-gradient';
import COLORS from '../constants/color';
import Button from '../components/Button';



const Welcome = ({navigation}) => {
  return (
    <LinearGradient 
        style={{
            flex:1
        }}
        colors={[COLORS.secondary,'purple']}
    >
        <View style = {{flex:1}}>
            <View>
                <Image 
                    source={require("../assets/egg-broken.png")}
                    style={{
                        height:120,
                        width:100,
                        borderRadius:20,
                        position:"absolute",
                        transform:[
                            {translateX:20},
                            {translateY:50},
                            {rotate:"-15deg"}
                        ]
                    }}
                />
                <Image
                    source={require("../assets/silver-coin.png")}
                    style={{
                        height:120,
                        width:100,
                        borderRadius:20,
                        position:"absolute",
                        top:-30,
                        left:100,
                        transform:[
                            {translateX:50},
                            {translateY:50},
                            {rotate:"-5deg"}
                        ]
                    }}
                >
                </Image>

                <Image
                    source={require("../assets/gold-coin.png")}
                    style={{
                        height:100,
                        width:100,
                        borderRadius:20,
                        position:"absolute",
                        top:130,
                        left:-50,
                        transform:[
                            {translateX:50},
                            {translateY:50},
                            {rotate:"15deg"}
                        ]
                    }}
                >
                </Image>

                <Image
                    source={require("../assets/logo-storegg.png")}
                    style={{
                        height:200,
                        width:200,
                        borderRadius:20,
                        position:"absolute",
                        top:110,
                        left:100,
                        transform:[
                            {translateX:50},
                            {translateY:50},
                            {rotate:"-15deg"}
                        ]
                    }}
                >
                </Image>
            </View>

            {/* context */}

            <View style={{
                paddingHorizontal:22,
                position:"absolute",
                top:300,
                width:"100%"
            }}>
                <Text style={{
                    fontSize:50,
                    fontWeight:800,
                    color:COLORS.white
                }}>
                    Let's Get
                </Text>
                <Text style={{
                    fontSize:46,
                    fontWeight:800,
                    color:COLORS.white
                }}>
                    Started
                </Text>
                
                <View style={{marginVertical:22}}>
                    <Text style={{
                        fontSize:16,
                        color:COLORS.white,
                        marginVertical:4,
                    }}>
                        Collect your coins and start to shop!
                    </Text>

                    <Text style={{
                        fontSize:16,
                        color:COLORS.white,
                        marginVertical:4,
                    }}>
                        Enjoy our best products
                    </Text>
                </View>
                <Button
                title ="Join Now"
                onPress={()=>navigation.navigate("Signup")}
                style={{
                    marginTop:22,
                    width:"100%"
                }}
                />
                <View style={{
                    flexDirection:"row",
                    marginTop:12,
                    justifyContent:"center"

                }}>
                    <Text style={{
                        fontSize:16,
                        color:COLORS.white
                    }}>
                        Already have an account?
                    </Text>
                    <Pressable onPress={()=>navigation.navigate("Login")}>
                    <Text style={{
                            fontSize:16,
                            color:COLORS.white,
                            fontWeight:"bold",
                            marginLeft:4
                        }}>
                            Login
                        </Text>
                    </Pressable>
                </View>



            </View>
        </View>
    </LinearGradient>
  )
}

export default Welcome