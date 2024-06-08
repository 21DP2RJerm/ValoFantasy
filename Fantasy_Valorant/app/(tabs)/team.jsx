import { View, Text, ScrollView, StyleSheet, Image, Pressable, TextInput} from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { router } from 'expo-router'
import { useNavigation } from '@react-navigation/native'; 
import axios from 'axios';
import { loaduser } from '../../services/Authservice';

const Row = ({ children }) => (
  <View style={styles.row}>{children}</View>
)

const team = () => {
  const navigation = useNavigation();
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [player3, setPlayer3] = useState('');
  const [player4, setPlayer4] = useState('');
  const [player5, setPlayer5] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await loaduser();
        if (userInfo && userInfo.data && userInfo.data.id) {
          console.log('User data:', userInfo);
          setUser(userInfo.data.id);
        }
      } catch (error) {
        console.error('Failed to load user', error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async () => {
    if (!user) {
      console.error('User ID is not available');
      return;
    }

    try {
      console.log('Sending data:', {
        user,
        player1,
        player2,
        player3,
        player4,
        player5,
      });

      const response = await fetch('http://192.168.8.203:8000/api/fantasyTeam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user,
          player1,
          player2,
          player3,
          player4,
          player5,
        }),
      });

      const data = await response.json();
      if (data.status) {
        console.log(data.message); // Handle success
      } else {
        console.error(data.message); // Handle error
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView className="w-full justify-center h-full px-4" style={{backgroundColor:'#0f0529'}}>
    <ScrollView>
      <Text className="text-3xl text-white font-bold mt-10" style={{textAlign: 'center'}}>Your team</Text>
      <View style={styles.app}>
            <View style={styles.col} > 
              <TextInput
                style={styles.input}
                placeholder='Enter Player Name'
                placeholderTextColor={'#ffffff'}
                value={player1}
                onChangeText={setPlayer1}
              />
            </View>
            <View style={styles.col} > 
              <TextInput
                style={styles.input}
                placeholder='Enter Player Name'
                placeholderTextColor={'#ffffff'}
                value={player2}
                onChangeText={setPlayer2}
              />
            </View>
            <View style={styles.col} > 
              <TextInput
                style={styles.input}
                placeholder='Enter Player Name'
                placeholderTextColor={'#ffffff'}
                value={player3}
                onChangeText={setPlayer3}
              />
            </View>
            <View style={styles.col} > 
              <TextInput
                style={styles.input}
                placeholder='Enter Player Name'
                placeholderTextColor={'#ffffff'}
                value={player4}
                onChangeText={setPlayer4}
              />
            </View>
            <View style={styles.col} > 
              <TextInput
                style={styles.input}
                placeholder='Enter Player Name'
                placeholderTextColor={'#ffffff'}
                value={player5}
                onChangeText={setPlayer5}
              />
            </View>

            <Pressable onPress={handleSubmit} style={styles.button}>
              <Text style={{textAlign: 'center', color: '#0f0529'}}>Save team</Text>
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
    width: 350,
    backgroundColor: '#0f0529'
  },
  col: {
    backgroundColor: '#0f0529',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  input: {
    height: 50,
    borderWidth: 1,
    marginTop: 20,
    borderColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    color: '#ffffff',
    width: '100%'
  },
    

};
export default team