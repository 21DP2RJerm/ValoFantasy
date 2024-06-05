import { StyleSheet, Text, View } from 'react-native'
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font'
import { useEffect, useState } from 'react';
import { loaduser } from '../services/Authservice';
import {  useUser } from '../context/UserContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthContext from '../context/AuthContext';
import TabsLayout from './(tabs)/_layout';
import infoLayout from './(info)/_layout';
import AuthLayout from './(auth)/_layout';
import Index from './index';
import home from './(tabs)/home';
import { router } from 'expo-router'

const Stacks = createNativeStackNavigator();

const RootLayout = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function runEffect() {
      try {
        const isLoggedIn = await loaduser(); // Assuming this now returns true/false
        if (isLoggedIn) {
          // Navigate to tabs screen if user is logged in
          router.push('/home');
          console.log("User logged in");
        }
      } catch (error) {
        console.log('Failed to load user', error);
      }
    }

    runEffect();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Stack initialRouteName="index">
        {user? (
          <>
            <Stack.Screen name="(tabs)"  options={{ headerShown: false }} />
            <Stack.Screen name="(info)" options={{ headerShown: false }} /> {/* Placeholder component */}
          </>
        ) : (
          <>
            <Stack.Screen name="index"  options={{ headerShown: false }} /> {/* Placeholder component */}
            <Stack.Screen name="(auth)"  options={{ headerShown: false }} /> {/* Placeholder component */}
          </>
        )}
      </Stack>
    </AuthContext.Provider>
  );
};


export default RootLayout;

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    
})
