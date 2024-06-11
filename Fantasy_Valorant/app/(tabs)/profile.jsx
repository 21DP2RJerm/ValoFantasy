import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { useNavigation } from '@react-navigation/native'; 
import { logout } from '../../services/Authservice';
import AuthContext from '../../context/AuthContext';
import { router } from 'expo-router';
import { CommonActions } from '@react-navigation/native';

const Row = ({ children }) => (
  <View style={styles.row}>{children}</View>
);

const profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigation = useNavigation();

  async function handleLogout() {
    console.log('User logged out');
    await logout();
    setUser(null);
    router.push(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'sign-in' }], // Ensure this matches the name of your sign-in screen
      })
    );
  }

  return (
    <SafeAreaView className="h-full" style={{ backgroundColor: '#0f0529' }}>
      <ScrollView>
        <Text className="text-3xl text-white font-bold mt-10" style={{ textAlign: 'center' }}>Username</Text>
        <View style={styles.app}>
          <Row>
            <View style={styles.col}>
              <Image source={images.boaster} className="w-[350px] h-[220px]" resizeMode="contain" />
            </View>
          </Row>

          <Text className="text-3xl text-white font-bold mt-10" style={{ textAlign: 'center' }}>Points:</Text>
          <Text className="text-3xl text-white font-bold" style={{ textAlign: 'center' }}>254</Text>
          <Text className="text-3xl text-white font-bold mt-10" style={{ textAlign: 'center' }}>Highest placement:</Text>
          <Text className="text-3xl text-white font-bold" style={{ textAlign: 'center' }}>5th</Text>
          <Pressable onPress={handleLogout} style={styles.button} className="w-full justify-center text-justify">
            <Text className="text-lg" style={{ textAlign: 'center', color: '#0f0529' }}>Sign out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  app: {
    flex: 1,
    marginHorizontal: "auto",
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: "row"
  },
  col: {
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 5,
    marginTop: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%'
  },
  button: {
    marginTop: 50,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    borderColor: 'white',
    backgroundColor: 'white'
  }
};

export default profile;