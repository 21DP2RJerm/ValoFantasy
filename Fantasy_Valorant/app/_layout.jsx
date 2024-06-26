import { StyleSheet, Text, View } from 'react-native';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { loaduser } from '../services/Authservice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthContext from '../context/AuthContext';
import TabsLayout from './(tabs)/_layout';
import InfoLayout from './(info)/_layout';
import AuthLayout from './(auth)/_layout';
import Index from './index';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
const Stacks = createNativeStackNavigator();

const RootLayout = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function runEffect() {
      try {
        const userInfo = await loaduser();
        if (userInfo) {
          console.log('User logged in');
          setUser(userInfo);
          router.push('home'); 
        } else {
          console.log('No user info found');
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
        {user ? (
          <>
            <Stack.Screen name="(tabs)" component={TabsLayout} options={{ headerShown: false }} />
            <Stack.Screen name="(info)" component={InfoLayout} options={{ headerShown: false }} />
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
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
