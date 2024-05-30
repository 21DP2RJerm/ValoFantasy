import { View, Text, ScrollView, StyleSheet, Image, Pressable} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { router } from 'expo-router'

const Row = ({ children }) => (
  <View style={styles.row}>{children}</View>
)

const team = () => {
  return (
    <SafeAreaView className="h-full" style={{backgroundColor:'#0f0529'}}>
    <ScrollView>
      <Text className="text-3xl text-white font-bold mt-10" style={{textAlign: 'center'}}>Your team</Text>
      <View style={styles.app}>
            <View style={styles.col} > 
              <Pressable onPress={() => router.push('/searchplayer')}>
                <Image source={images.chronicle} className="w-[100px] h-[100px]" resizeMode="contain" />
              </Pressable> 
            </View>
            <View style={styles.col} > 
              <Pressable onPress={() => router.push('/searchplayer')}>
                <Image source={images.boaster} className="w-[100px] h-[100px]" resizeMode="contain" />
              </Pressable> 
            </View>
            <View style={styles.col} > 
              <Pressable onPress={() => router.push('/searchplayer')}>
                <Image source={images.leo} className="w-[100px] h-[100px]" resizeMode="contain" />
              </Pressable> 
            </View>
            <View style={styles.col} > 
              <Pressable onPress={() => router.push('/searchplayer')}>
                <Image source={images.alfajer} className="w-[100px] h-[100px]" resizeMode="contain" />
              </Pressable> 
            </View>
            <View style={styles.col} > 
              <Pressable onPress={() => router.push('/searchplayer')}>
                <Image source={images.derke} className="w-[100px] h-[100px]" resizeMode="contain" />
              </Pressable> 
            </View>

            <Pressable
              style={styles.button}
              className="w-full justify-center text-justify mt-10">
              <Text className=" text-lg" style={{textAlign: 'center', color: '#0f0529'}}>Save team</Text>
            </Pressable>
      </View>
    </ScrollView>

  </SafeAreaView>
  )
}
const styles = {
  app: {
    flex: 1,
    marginHorizontal: "auto",
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  col:  {
    borderColor:  "#ffffff",
    backgroundColor: '#ffffff',
    borderRadius: 5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  button: {
    marginTop: 50,
    width: '60%',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    borderColor: 'white',
    backgroundColor: 'white'
  },
    

};
export default team