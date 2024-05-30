import { View, Text, ScrollView, StyleSheet, Image, Pressable} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { router } from 'expo-router'


const Row = ({ children }) => (
  <View style={styles.row}>{children}</View>
)

const profile = () => {
  return (
    <SafeAreaView className="h-full" style={{backgroundColor:'#0f0529'}}>
      <ScrollView>
      <Text className="text-3xl text-white font-bold mt-10" style={{textAlign: 'center'}}>Username</Text>
        <View style={styles.app}>
          <Row>
            <View style={styles.col} > 
              <Image source={images.boaster} className="w-[350px] h-[220px]" resizeMode="contain" />
            </View>
          </Row>

          <Text className="text-3xl text-white font-bold mt-10" style={{textAlign: 'center'}}>Points:</Text>
          <Text className="text-3xl text-white font-bold " style={{textAlign: 'center'}}>254</Text>
          <Text className="text-3xl text-white font-bold mt-10" style={{textAlign: 'center'}}>Highest placement:</Text>
          <Text className="text-3xl text-white font-bold " style={{textAlign: 'center'}}>5th</Text>

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
    justifyContent: 'center',
    alignItems: 'center',

  },
  row: {
    flexDirection: "row"
  },
  col:  {
    borderWidth:2,
    borderColor: '#ffffff',
    borderRadius: 5,
    marginTop: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%'
  },
};

export default profile