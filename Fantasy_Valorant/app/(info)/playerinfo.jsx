import { View, Text, ScrollView, StyleSheet, Image, Pressable} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { router } from 'expo-router'


const Row = ({ children }) => (
  <View style={styles.row}>{children}</View>
)
const playerinfo = () => {
  return (
    <SafeAreaView className="h-full" style={{backgroundColor:'#0f0529'}}>
      <ScrollView>
        <Text className="text-3xl text-white font-bold mt-10" style={{textAlign: 'center'}}>Boaster</Text>
        <View style={styles.app}>
          <Row>
            <View style={styles.col} > 
              <Image source={images.boaster} className="w-[350px] h-[220px]" resizeMode="contain" />
            </View>
            <View style={styles.col2}> 
              <Image source={images.fnatic} className="w-[250px] h-[140px]" resizeMode="contain" />
            </View>
          </Row>

          <Text className="text-3xl text-white font-bold mt-10" style={{textAlign: 'center'}}>Real name:</Text>
          <Text className="text-3xl text-white font-bold " style={{textAlign: 'center'}}>Jake Howlett</Text>
          <Text className="text-3xl text-white font-bold mt-10" style={{textAlign: 'center'}}>Team:</Text>
          <Text className="text-3xl text-white font-bold " style={{textAlign: 'center'}}>FNATIC</Text>
          <Text className="text-3xl text-white font-bold mt-10" style={{textAlign: 'center'}}>Achievments:</Text>
          <Text className="text-3xl text-white font-bold " style={{textAlign: 'center'}}>VCT Lock In Champion, VCT Masters Tokyo 2023 Champion</Text>

        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = {
  app: {
    flex: 4,
    marginHorizontal: "auto",
    width: 350,

  },
  row: {
    flexDirection: "row"
  },
  col:  {
    borderWidth:2,
    borderColor: '#ffffff',
    borderRadius: 5,
    flex:  2,
    marginTop: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  col2:  {
    flex:  2,
    borderRadius: 5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
    

};

export default playerinfo