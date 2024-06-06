import { StyleSheet, Text, View } from 'react-native'
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font'
import { useEffect, useState } from 'react';
import { loaduser,data } from '../services/Authservice';
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
        const userInfo = await loaduser(); // Assuming this now returns user info on success
        if (userInfo) {
          // Consider the user logged in if userInfo exists
          console.log('User logged in');
          // Optionally, extract user info to state or context if needed
          setUser(userInfo);
          // Navigate to home screen if user is logged in
          router.push('/home');
        } else {
          console.log('No user info found');
          // Handle the case where no user info is found
        }
      } catch (error) {
        console.log('Failed to load user', error);
        // Handle errors during the load process
      }
    }

    runEffect();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Stack initialRouteName="index">
        {user? (
          <>
            <Stack.Screen name="(tabs)" component={TabsLayout} options={{ headerShown: false }} />
            <Stack.Screen name="(info)" component={infoLayout} options={{ headerShown: false }} /> 
          </>
        ) : (
          <>
            <Stack.Screen name="index" component={Index} options={{ headerShown: false }} /> 
            <Stack.Screen name="(auth)" component={AuthLayout} options={{ headerShown: false }} /> 
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
