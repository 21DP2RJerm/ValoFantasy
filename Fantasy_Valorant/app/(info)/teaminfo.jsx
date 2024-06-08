import { View, Text, ScrollView, StyleSheet, Image, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { router } from 'expo-router';


const TeamInfo = () => {
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const { teamId, teamName: passedTeamName } = route.params || {};

    if (teamId) {
      setTeamName(passedTeamName);
      fetchPlayers(teamId);
    }
  }, [route.params]);

  const fetchPlayers = async (teamId) => {
    try {
      const response = await axios.post('http://192.168.8.203:8000/api/getTeamPlayers', { teamId });
      const data = response.data;
      setPlayers(data.players);
    } catch (error) {
      console.error('Failed to fetch players data:', error);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0529' }}>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  if (!teamName) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0529' }}>
        <Text style={{ color: 'white' }}>Team not found.</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0529' }}>
      <ScrollView>
        <Text style={{ textAlign: 'center', fontSize: 24, color: 'white', fontWeight: 'bold', marginTop: 20 }}>{teamName}</Text>

        <View style={styles.app}>
          {players.map((player, index) => (
            <View key={index} style={styles.col}>
              <Pressable onPress={() => navigation.navigate('PlayerInfo', { playerId: player.id })} style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{player.name}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = {
  app: {
    flex: 1,
    marginHorizontal: "auto",
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  col: {
    borderColor: "#ffffff",
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

export default TeamInfo;
