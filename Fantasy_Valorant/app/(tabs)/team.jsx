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
              <Pressable >
                <Image source={images.liquid} className="w-[100px] h-[100px]" resizeMode="contain" />
              </Pressable>
              
             
              
            </View>
            <View style={styles.col}> 
              <Image source={images.navi} className="w-[100px] h-[100px]" resizeMode="contain" />
            </View>
          
          
            <View style={styles.col}> 
              <Image source={images.fnatic} className="w-[100px] h-[100px]" resizeMode="contain" />
            </View>
            <View style={styles.col}> 
              <Image source={images.heretics} className="w-[100px] h-[100px]" resizeMode="contain" />
            </View>
            <View style={styles.col}> 
              <Image source={images.heretics} className="w-[100px] h-[100px]" resizeMode="contain" />
            </View>
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
    

};
export default team