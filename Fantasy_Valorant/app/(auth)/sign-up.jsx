import { View, Text, ScrollView, Image, TextInput, StyleSheet, Button, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import { useState } from 'react'
import { router } from 'expo-router'
const SignUp = () => {

  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  
 
  return (
    <SafeAreaView className=  "h-full" style={{backgroundColor: '#0f0529'}}>
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]"/>

          <Text className="text-white text-2xl mt-10 font-semibold">Sign up to Valorant Fantasy</Text>
          <Text className="text-white text-xl  mt-10 font-semibold">Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder='Enter Email'
            placeholderTextColor={'#ffffff'}
          />
          <Text className="text-white text-xl  mt-5 font-semibold">Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
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
          
          <Pressable onPress={() => router.push('/home')}
            style={styles.signup}
            className="w-full justify-center text-justify">
            <Text className=" text-lg" style={{textAlign: 'center', color: '#0f0529'}}>Sign up</Text>
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
  signup: {
    marginTop: 50,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    borderColor: 'white',
    backgroundColor: 'white'
   
  
  },
});
export default SignUp