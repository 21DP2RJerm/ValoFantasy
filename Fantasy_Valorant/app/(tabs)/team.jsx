import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { loaduser } from '../../services/Authservice';

const Row = ({ children }) => (
  <View style={styles.row}>{children}</View>
);

const Team = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [player3, setPlayer3] = useState('');
  const [player4, setPlayer4] = useState('');
  const [player5, setPlayer5] = useState('');
  const [user, setUser] = useState(null);
  const [hasTeam, setHasTeam] = useState(false);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await loaduser();
        if (userInfo && userInfo.data && userInfo.data.id) {
          setUser(userInfo.data.id);
          checkUserTeam(userInfo.data.id);
        }
      } catch (error) {
        console.error('Failed to load user', error);
      }
    };

    fetchUser();
  }, []);

  const checkUserTeam = async (userId) => {
    try {
      const response = await axios.get(`http://192.168.8.203:8000/api/fantasyTeam/${userId}`);
      if (response.data.status && response.data.team) {
        setHasTeam(true);
        const { player1, player2, player3, player4, player5 } = response.data.team;
        setPlayer1(player1);
        setPlayer2(player2);
        setPlayer3(player3);
        setPlayer4(player4);
        setPlayer5(player5);
      }
    } catch (error) {
    
      console.error('Failed to check user team', error);
    }
  };

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

      const response = await axios.post('http://192.168.8.203:8000/api/fantasyTeam', {
        user,
        player1,
        player2,
        player3,
        player4,
        player5,
      });

      if (response.data.status) {
        console.log(response.data.message); 
        checkUserTeam(user); 
        Alert.alert('Team created succesfully');
      } else {
        console.error(response.data.message); 
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert('Fantasy team already created');
      } else {
        Alert.alert('Failed to create team, check player information');
      }
      console.error('Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text className="text-3xl text-white font-bold mb-5">Your Team</Text>
        <View style={styles.app}>
              <View style={styles.col}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Player Name"
                  placeholderTextColor="#ffffff"
                  value={player1}
                  onChangeText={setPlayer1}
                />
              </View>
              <View style={styles.col}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Player Name"
                  placeholderTextColor="#ffffff"
                  value={player2}
                  onChangeText={setPlayer2}
                />
              </View>
              <View style={styles.col}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Player Name"
                  placeholderTextColor="#ffffff"
                  value={player3}
                  onChangeText={setPlayer3}
                />
              </View>
              <View style={styles.col}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Player Name"
                  placeholderTextColor="#ffffff"
                  value={player4}
                  onChangeText={setPlayer4}
                />
              </View>
              <View style={styles.col}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Player Name"
                  placeholderTextColor="#ffffff"
                  value={player5}
                  onChangeText={setPlayer5}
                />
              </View>
              <Pressable onPress={handleSubmit} style={styles.button}>
                <Text >Save Team</Text>
              </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0529',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  app: {
    width: 350,
    backgroundColor: '#0f0529',
    alignItems: 'center',
  },
  col: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    color: '#ffffff',
    width: '100%',
  },
  button: {
    marginTop: 30,
    width: '60%',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    borderColor: 'white',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Team;
