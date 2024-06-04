import { StyleSheet, Text, View } from 'react-native'
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font'
import { useEffect, useState } from 'react';
import { loaduser } from '../services/Authservice';
import {  useUser } from '../context/UserContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthContext from '../context/AuthContext';
import TabsLayout from './(tabs)/_layout';
const Stacks = createNativeStackNavigator();

const RootLayout = () => {
  
  const [user, setUser] = useState();

  useEffect(() =>{
    async function runEffect() {
      try {
        const user = await loaduser();
        setUser(user);
      } catch(error){
        console.log("Failed to load user", error)
      }
    }

    runEffect();
  }, [])
  return (
    <AuthContext.Provider value={{user, setUser
    }}>
      <Stack>
      {user? (
        <>
          <Stack.Screen name="(tabs)" options={{headerShown: false}} component={TabsLayout}/>
        </>

      ) : (
        <>
          <Stack.Screen name="index" options={{headerShown: false}}/>
          <Stack.Screen name="(auth)" options={{headerShown: false}}/>
          <Stack.Screen name="(info)" options={{headerShown: false}}/>
        </>
      )}
      </Stack>
    </AuthContext.Provider>
  );
};

export default RootLayout

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    
})