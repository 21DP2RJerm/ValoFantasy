import { View, Text, ScrollView, StyleSheet, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'



const Row = ({ children }) => (
  <View style={styles.row}>{children}</View>
)
const players = () => {
  return (
    <SafeAreaView className="h-full" style={{backgroundColor:'#0f0529'}}>
      <ScrollView>
        <Text className="text-3xl text-white font-bold mt-10" style={{textAlign: 'center'}}>Choose a team</Text>
        <View style={styles.app}>
          <Row>
            <View style={styles.col}> 
              <Image source={images.liquid} className="w-[330px] h-[200px]" resizeMode="contain" />
            </View>
            <View style={styles.col}> 
              <Image source={images.navi} className="w-[250px] h-[140px]" resizeMode="contain" />
            </View>
          </Row>
          <Row>
            <View style={styles.col}> 
              <Image source={images.fnatic} className="w-[150px] h-[90px]" resizeMode="contain" />
            </View>
            <View style={styles.col}> 
              <Image source={images.heretics} className="w-[310px] h-[190px]" resizeMode="contain" />
            </View>
          </Row>
          <Row>
            <View style={styles.col}> 
              <Image source={images.kc} className="w-[270px] h-[150px]" resizeMode="contain" />
            </View>
            <View style={styles.col}> 
              <Image source={images.fut} className="w-[330px] h-[200px]" resizeMode="contain" />
            </View>
          </Row>
          <Row>
            <View style={styles.col}> 
              <Image source={images.liquid} className="w-[330px] h-[200px]" resizeMode="contain" />
            </View>
            <View style={styles.col}> 
              <Image source={images.liquid} className="w-[330px] h-[200px]" resizeMode="contain" />
            </View>
          </Row>
          <Row>
            <View style={styles.col}> 
              <Image source={images.liquid} className="w-[330px] h-[200px]" resizeMode="contain" />
            </View>
            <View style={styles.col}> 
              <Image source={images.liquid} className="w-[330px] h-[200px]" resizeMode="contain" />
            </View>
          </Row>
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
    borderColor:  "#ffffff",
    backgroundColor: '#ffffff',
    borderWidth:  1,
    flex:  2,
    borderRadius: 5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  images:{
    width: 350,
    resizeMode: 'contain'
  }
    

};
export default players