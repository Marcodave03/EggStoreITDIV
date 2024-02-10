import { View, Text, TextInput} from 'react-native'
import React,{useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import COLORS from '../constants/color'
import { TouchableOpacity } from 'react-native-web';
import {Ionicons} from "@expo/vector-icons";
import { Button } from 'react-native';
import { Pressable } from 'react-native';



const Login = ({navigation}) => {
    const [isPasswordShown,setIsPasswordShown] = useState(false);


  return (
    <View>
      <SafeAreaView style={{flex:1,backgroundColor:COLORS.white}}>
        <View style={{flex:1, marginHorizontal:22}}>
            <View style={{marginVertical:22}}>

            </View>
            <Text style={{
                fontSize:22,
                fontWeight:'bold',
                marginVertical:12,
                color:COLORS.black,
            }}>
                Welcome Back!
            </Text>
            <Text style={{
                fontSize:16,
                color:COLORS.black
            }}>
                Hello Again!
            </Text>
        </View>

        <View style={{marginBottom:12,paddingHorizontal:20}}>
            <Text style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical:8,
                paddingHorizontal:20,
            }}>
                Email Address
            </Text>
            <View style={{
                width:"100%",
                height:48,
                borderColor:COLORS.black,
                borderWidth:1,
                borderRadius:8,
                alignItems:"center",
                justifyContent:"center",
                paddingHorizontal:20,
            }}>
                <TextInput
                placeholder ='Mobile Number'
                placeholderTextColor ={COLORS.black}
                keyboardType='email-address'
                style={{width:"100%"}}
                />
            </View>
        </View>

        
        <View>




        <View style={{marginBottom:12, paddingHorizontal:20}}>
            <Text style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical:8,
                paddingHorizontal:20,
            }}>
                Password
            </Text>
            <View style={{
                width:"100%",
                height:48,
                borderColor:COLORS.black,
                borderWidth:1,
                borderRadius:8,
                alignItems:"center",
                justifyContent:"center",
                flexDirection:"row",
                justifyContent:"space-between",
                paddingLeft:22
            }}>

                <TextInput
                    placeholder ='Enter your number'
                    placeholderTextColor ={COLORS.black}
                    secureTextEntry={isPasswordShown}
                    style={{
                        width:"80%",
                    }}
                />
                <TouchableOpacity 
                onPress={()=>setIsPasswordShown(!isPasswordShown)}
                style={{
                    position:"absolute",
                    right:12,
                }}> {
                        isPasswordShown==true?(
                            <Ionicons name="eye-off" size={24} color={COLORS.black}/>
                        ) : (
                            <Ionicons name="eye" size={24} color={COLORS.black}/>
                        )
                    }
                </TouchableOpacity>


            </View>
        </View>   

        <View style={{
            flexDirection:'row',
            marginVertical:6
        }}>
        </View>

        <View style={{
            paddingHorizontal:20,
        }}>
        <Button
            onPress={()=>navigation.navigate("Home")}
            title ="Login"
            filled
            textColor={COLORS.white}
            style={{
                marginTop:18,
                marginBottom:4,
                paddingHorizontal:20,
                borderRadius:20
            }}
        />
        </View>




        <View style={{
            justifyContent:"center",
            marginVertical:22,
            flexDirection:"row"
        }}>
            <Text style={{fontSize:16,color:COLORS.black}}>Don't have Account?</Text>
            <Pressable
            onPress={()=>navigation.navigate("Signup")}>
                <Text style={{
                    fontSize:15,
                    color:COLORS.primary,
                    fontWeight:"bold",
                    marginLeft:6
                }}>
                    Signup
                </Text>

            </Pressable>

        </View>
            
        </View>
      </SafeAreaView>
    </View>
  )
}

export default Login