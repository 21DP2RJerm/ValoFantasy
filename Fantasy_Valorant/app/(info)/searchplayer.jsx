import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { SearchBar } from 'react-native-screens'
import { SafeAreaView } from 'react-native-safe-area-context'


const searchplayer = () => {

    const [player, setPlayer] = React.useState('');


    return (
        <SafeAreaView className="h-full" style={{backgroundColor:'#0f0529'}}>
            <ScrollView>
                <View className="w-full justify-center items-center h-full px-4">
                    <Text className="text-3xl text-white font-bold mt-10" style={{textAlign: 'center'}}>Search your player</Text>

                    <TextInput
                    
                    style={styles.button}
                    onChangeText={setPlayer}
                    value={player}
                    placeholder='Enter Username'
                    placeholderTextColor={'#ffffff'}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
  )
}

export default searchplayer

const styles = StyleSheet.create({
    button: {
      marginTop: 50,
      width: '90%',
      borderRadius: 5,
      borderWidth: 1,
      height: 50,
      borderColor: 'white',
      backgroundColor: 'white',
      padding: 10
    },
})