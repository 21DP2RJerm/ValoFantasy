import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, Button, Pressable } from 'react-native';
import { Link, Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';

const home = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView className= "h-full" style={{backgroundColor: '#0f0529'}}>
      <ScrollView contentContainerStyle={{ height: '100'}}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.vflogo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Text className="text-white text-2xl mt-10 font-semibold text-center">Welcome to 
            <Text className=" text-fuchsia-400"> Fantasy Valorant</Text>
          </Text>

          <Text className="text-white text-2xl mt-10 font-semibold text-center">Head over to 
            <Text className=" text-fuchsia-400"> "My team" </Text>
          to put players on your fantasy team</Text>

          <Text className="text-white text-2xl mt-10 font-semibold text-center">Check out the leagues  
            <Text className=" text-fuchsia-400"> players</Text>
          </Text>

          <Text className="text-white text-2xl mt-10 font-semibold text-center">Or find how high you've placed in the 
            <Text className=" text-fuchsia-400"> leaderboards</Text>
          </Text>
          
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#0f0529' style="light"/>
    </SafeAreaView>
  )
}

export default home