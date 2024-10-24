import { View, Text, StyleSheet, ScrollView, TextInput, SafeAreaView, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { router } from 'expo-router';
const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [teamRegion, setTeamRegion] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerLastName, setPlayerLastName] = useState('');
  const [playerInGameName, setPlayerInGameName] = useState('');
  const [playerTeamName, setPlayerTeamName] = useState('');

  const handleCreateTeam = async () => {
    try {
      const response = await axios.post('http://192.168.8.203:8000/api/createTeam', {
        name: teamName,
        region: teamRegion
      });
      Alert.alert('Success', response.data.message);
    } catch (error) {
      console.error('Failed to create team:', error);
      Alert.alert('Error', 'Failed to create team');
    }
    router.push('players');
  };

  const getCsrfToken = async () => {
    try {
      const response = await axios.get('http://192.168.8.203:8000/api/csrf-token');
      return response.data.csrf_token;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };
  const handleCreatePlayer = async () => {
    const csrfToken = await getCsrfToken();
    console.log(csrfToken);
    try {
     
      const teamResponse = await axios.get('http://192.168.8.203:8000/api/getTeamByName', {
        params: { name: playerTeamName }
      });
      const teamId = teamResponse.data.id;

      const response = await axios.post('http://192.168.8.203:8000/api/createPlayer', {
        name: playerName,
        last_name: playerLastName,
        in_game_name: playerInGameName,
        team: teamId
      },{
        headers:{
          'X-CSRF-TOKEN': csrfToken,
        }
      });
      Alert.alert('Success', response.data.message);
    } catch (error) {
      console.error('Failed to create player:', error);
      Alert.alert('Error', 'Failed to create player');
    }
    
  };

  return (
    <SafeAreaView className="h-full" style={{ backgroundColor: '#0f0529' }}>
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Text className="text-white text-2xl mt-5 font-semibold text-center">Create a team</Text>
          <Text className="text-white text-xl mt-5 font-semibold">Team name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTeamName}
            value={teamName}
            placeholder="Team name"
            placeholderTextColor="#ffffff"
          />

          <Text className="text-white text-xl mt-5 font-semibold">Team region</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTeamRegion}
            value={teamRegion}
            placeholder="Region"
            placeholderTextColor="#ffffff"
          />

          <Pressable
            style={styles.signup}
            onPress={handleCreateTeam}
            className="w-full justify-center text-justify"
          >
            <Text className="text-lg" style={{ textAlign: 'center', color: '#0f0529' }}>
              Create Team
            </Text>
          </Pressable>

          <Text className="text-white text-2xl mt-5 font-semibold text-center">Create a player</Text>
          <Text className="text-white text-xl mt-5 font-semibold">Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPlayerName}
            value={playerName}
            placeholder="Name"
            placeholderTextColor="#ffffff"
          />
          <Text className="text-white text-xl mt-5 font-semibold">Last name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPlayerLastName}
            value={playerLastName}
            placeholder="Last name"
            placeholderTextColor="#ffffff"
          />
          <Text className="text-white text-xl mt-5 font-semibold">In game name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPlayerInGameName}
            value={playerInGameName}
            placeholder="In game name"
            placeholderTextColor="#ffffff"
          />
          <Text className="text-white text-xl mt-5 font-semibold">Team name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPlayerTeamName}
            value={playerTeamName}
            placeholder="Team"
            placeholderTextColor="#ffffff"
          />
          <Pressable
            style={styles.signup}
            onPress={handleCreatePlayer}
            className="w-full justify-center text-justify"
          >
            <Text className="text-lg" style={{ textAlign: 'center', color: '#0f0529' }}>
              Create Player
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    marginTop: 20,
    borderColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    color: '#ffffff'
  },
  signup: {
    marginTop: 50,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    borderColor: 'white',
    backgroundColor: 'white'
  }
});

export default CreateTeam;
