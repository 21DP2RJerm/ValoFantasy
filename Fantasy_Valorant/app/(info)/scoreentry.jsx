import { View, Text, StyleSheet, ScrollView, TextInput, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { router } from 'expo-router';

const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
)

const scoreentry = () => {
  const [entries, setEntries] = useState(Array.from({ length: 10 }).map(() => ({
    playerName: '',
    kills: '',
    deaths: '',
    assists: ''
  })));

  const handleChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const handleSubmit = async () => {
    try {
      for (const entry of entries) {
        if (!entry.playerName || !entry.kills || !entry.deaths || !entry.assists) {
          Alert.alert('Error', 'Please fill out all fields');
          return;
        }

        const playerResponse = await axios.get(`http://192.168.8.203:8000/api/players?in_game_name=${entry.playerName}`);
        if (playerResponse.status !== 200 || !playerResponse.data.data) {
          Alert.alert('Error', `Player with in-game name ${entry.playerName} not found`);
          continue;
        }

        const player = playerResponse.data.data;
        const playerId = player.id;

        await axios.post('http://192.168.8.203:8000/api/stat_tracker', {
          player: playerId,
          kills: parseInt(entry.kills),
          deaths: parseInt(entry.deaths),
          assists: parseInt(entry.assists)
        });
      }

      Alert.alert('Success', 'Player statistics submitted successfully');
      router.push('scoreentry'); 
    } catch (error) {
      console.error('Error submitting data:', error);
      Alert.alert('Error', 'An error occurred while submitting player statistics');
    }
  };

  const renderScoreEntries = () => {
    return entries.map((entry, index) => (
      <View key={index} className="w-full justify-center h-full px-4 my-1" style={styles.col}>
        <TextInput
          style={styles.inputteam}
          placeholder="Player name"
          placeholderTextColor="#ffffff"
          value={entry.playerName}
          onChangeText={(text) => handleChange(index, 'playerName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Kills"
          placeholderTextColor="#ffffff"
          value={entry.kills}
          onChangeText={(text) => handleChange(index, 'kills', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Deaths"
          placeholderTextColor="#ffffff"
          value={entry.deaths}
          onChangeText={(text) => handleChange(index, 'deaths', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Assists"
          placeholderTextColor="#ffffff"
          value={entry.assists}
          onChangeText={(text) => handleChange(index, 'assists', text)}
        />
      </View>
    ));
  };

  return (
    <SafeAreaView className="h-full" style={{ backgroundColor: '#0f0529' }}>
      <ScrollView>
        <View style={styles.app} className="justify-center items-center">
          <Text className="text-white text-2xl mt-5 font-semibold text-center">Entry game stats</Text>
          <Text className="text-white text-xl mt-5 font-semibold text-center">Player name       K/D/A</Text>
          {renderScoreEntries()}
          <TouchableOpacity
            style={styles.Button}
            onPress={handleSubmit}
          >
            <Text className=" text-lg" style={{ textAlign: 'center', color: '#ffffff' }}>Enter data</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 4,
    width: 350,
    backgroundColor: '#0f0529',
  },
  col: {
    backgroundColor: '#0f0529',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputteam: {
    height: 50,
    borderWidth: 1,
    marginTop: 20,
    borderColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    color: '#ffffff',
    width: 160,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginTop: 20,
    borderColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    color: '#ffffff',
    width: 70,
  },
  signup: {
    marginTop: 50,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    borderColor: 'white',
    backgroundColor: 'white'
  },
  Button: {
    marginTop: 50,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    borderColor: 'white',
    justifyContent: 'center',
    alignContent: 'center'
  }
});

export default scoreentry;
