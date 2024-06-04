import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, Button, Pressable } from 'react-native';
import { Link, Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.8.203:8000';

export default function Index() {
  return (
    <SafeAreaView className= "h-full" style={{backgroundColor: '#0f0529'}}>
      <ScrollView contentContainerStyle={{ height: '100'}}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.jett}
            className="w-[400px] h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5 ">
            <Text className="text-3xl text-white font-bold text-center">Emerse yourself in the world of
              <Text className=" text-fuchsia-400"> Fantasy Valorant</Text>
            </Text>         
          </View>

          
          <Pressable onPress={() => router.push('/sign-in')}
            style={styles.signin}
            className="w-full justify-center text-justify">
            <Text className=" text-lg" style={{textAlign: 'center', color: '#0f0529'}}>Sign in</Text>
          </Pressable>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#0f0529' style="light"/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signin: {
    marginTop: 50,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    borderColor: 'white',
    backgroundColor: 'white'
  
  },

});