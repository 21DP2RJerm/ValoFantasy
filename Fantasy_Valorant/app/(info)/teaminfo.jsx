import { View, Text, ScrollView, StyleSheet, Image, Pressable} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { router } from 'expo-router'


const teaminfo = () => {
  return (
     <SafeAreaView className="h-full" style={{backgroundColor:'#0f0529'}}>
      <ScrollView>
        <Text className="text-3xl text-white font-bold mt-10" style={{textAlign: 'center'}}>FNATIC</Text>

        <View styles={{    justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Image source={images.fnatic} style={{alignSelf: 'center'}} className="w-[200px] h-[200px] mt-5" resizeMode="contain"/>
        </View>

        <View style={styles.app}>
              <View style={styles.col} > 
                <Pressable onPress={() => router.push('/playerinfo')} >
                  <Image source={images.boaster} className="w-[100px] h-[100px]" resizeMode="contain" />
                </Pressable>
                
              
                
              </View>
              <View style={styles.col}> 
                <Pressable onPress={() => router.push('/playerinfo')} >
                  <Image source={images.leo} className="w-[100px] h-[100px]" resizeMode="contain" />
                </Pressable>
              </View>
            
            
              <View style={styles.col}> 
                <Pressable onPress={() => router.push('/playerinfo')} >
                  <Image source={images.alfajer} className="w-[100px] h-[100px]" resizeMode="contain" />
                </Pressable>
              </View>
              <View style={styles.col}> 
                <Pressable onPress={() => router.push('/playerinfo')} >
                  <Image source={images.chronicle} className="w-[100px] h-[100px]" resizeMode="contain" />
                </Pressable>
              </View>
              <View style={styles.col}> 
                <Pressable onPress={() => router.push('/playerinfo')} >
                  <Image source={images.derke} className="w-[100px] h-[100px]" resizeMode="contain" />
                </Pressable>
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
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
    

};
export default teaminfo