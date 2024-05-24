import { View, Text, ScrollView, StyleSheet, Image, Pressable} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { router } from 'expo-router'

const leaderboard = () => {
  return (
    <SafeAreaView className="h-full" style={{backgroundColor:'#0f0529'}}>
    <ScrollView>
      <Text className="text-3xl text-white font-bold mt-10 mb-10" style={{textAlign: 'center'}}>Leaderboards</Text>
      <View style={styles.app}>
            <View style={styles.col} > 
              <Text style={{textAlign: 'left'}}>1</Text>
              <Text style={{textAlign: 'center'}}>Player</Text>
              <Text style={{textAlign: 'right'}}>205</Text>         
            </View>
            <View style={styles.col} > 
              <Text style={{textAlign: 'left'}}>1</Text>
              <Text style={{textAlign: 'center'}}>Player</Text>
              <Text style={{textAlign: 'right'}}>205</Text>         
            </View>
            <View style={styles.col} > 
              <Text style={{textAlign: 'left'}}>1</Text>
              <Text style={{textAlign: 'center'}}>Player</Text>
              <Text style={{textAlign: 'right'}}>205</Text>         
            </View>
            <View style={styles.col} > 
              <Text style={{textAlign: 'left'}}>1</Text>
              <Text style={{textAlign: 'center'}}>Player</Text>
              <Text style={{textAlign: 'right'}}>205</Text>         
            </View>
            <View style={styles.col} > 
              <Text style={{textAlign: 'left'}}>1</Text>
              <Text style={{textAlign: 'center'}}>Player</Text>
              <Text style={{textAlign: 'right'}}>205</Text>         
            </View>
            <View style={styles.col} > 
              <Text style={{textAlign: 'left'}}>1</Text>
              <Text style={{textAlign: 'center'}}>Player</Text>
              <Text style={{textAlign: 'right'}}>205</Text>         
            </View>
            <View style={styles.col} > 
              <Text style={{textAlign: 'left'}}>1</Text>
              <Text style={{textAlign: 'center'}}>Player</Text>
              <Text style={{textAlign: 'right'}}>205</Text>         
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
    width: 350,

  },
  col:  {
    borderColor:  "#ffffff",
    backgroundColor: '#ffffff',
    borderWidth:  1,
    flex:  1,
    borderRadius: 5,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
    
  }
    

};

export default leaderboard