import { View, Text, ScrollView, Image, TextInput, StyleSheet, Button, Pressable, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import { useState } from 'react'
import { router } from 'expo-router'
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { loaduser, login } from '../../services/Authservice';


axios.defaults.baseURL = 'http://192.168.8.203:8000';
const SignIn = () => {

  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  async function handleLogin() {

    try {
      await login( 
      { name, 
        password, 
      },
      {
        headers: {
          Accept: "application/json"
        }
      });

      

      const profile = await loaduser();

    
    } catch (error) {
      console.error(error.response.data);   
    }
  }
  return (
    <SafeAreaView className=  "h-full" style={{backgroundColor: '#0f0529'}}>
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image source={images.vflogo} resizeMode='contain' className="w-[200px] h-[100px] "/>

          <Text className="text-white text-2xl mt-10 font-semibold">Log in to Valorant Fantasy</Text>
          <Text className="text-white text-xl  mt-10 font-semibold">Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder='Enter Username'
            placeholderTextColor={'#ffffff'}
          />
          <Text className="text-white text-xl mt-5 font-semibold">Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder='Enter Password'
            placeholderTextColor={'#ffffff'}
          />
          
          <Pressable onPress={handleLogin}
            style={styles.signin}
            className="w-full justify-center text-justify">
            <Text className=" text-lg" style={{textAlign: 'center', color: '#0f0529'}}>Sign in</Text>
          </Pressable>

          <Pressable onPress={() => router.push('/sign-up')}
            style={styles.signup}
            className="w-full justify-center text-justify mt-10">
            <Text className=" text-lg" style={{textAlign: 'center', color: '#ffffff'}}>Sign up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    marginTop: 20,
    borderColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    color: '#ffffff'
  },
  signin: {
    marginTop: 50,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    borderColor: 'white',
    backgroundColor: 'white'
  },
  signup: {
    marginTop: 20,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    borderColor: 'white',
  
  },
});
export default SignIn