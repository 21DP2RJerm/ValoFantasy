import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, Button } from 'react-native';
import { Link, Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';


export default function App() {
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
            
              <Button title='Sign In' color='#4a2574' onPress={() => router.push('/sign-in')} />
            </Text>

            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

