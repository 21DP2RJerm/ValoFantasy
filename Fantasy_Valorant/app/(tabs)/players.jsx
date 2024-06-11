import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; 
import { loaduser } from '../../services/Authservice'; // Assuming loaduser is exported from Authservice
import { router } from 'expo-router';
const Players = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teamData, setTeamData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch team data
        const teamResponse = await axios.post('http://192.168.8.203:8000/api/getTeamInfo');
        setTeamData(teamResponse.data.data);

        // Fetch user profile
        const profile = await loaduser();
        setIsAdmin(profile.data.admin);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0529' }}>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  const handlePress = (teamId, teamName) => {
    navigation.navigate('teaminfo', { teamId, teamName });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0529' }}>
      <ScrollView style={{ flexGrow: 1, backgroundColor: '#0f0529' }}>
        <Text style={{ textAlign: 'center', fontSize: 24, color: 'white', fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>Teams</Text>
        <View style={styles.app}>
          {teamData.map((team, index) => (
            <TouchableOpacity
              key={index}
              style={styles.col}
              onPress={() => handlePress(team.id, team.name)}
            >
              <Text style={{ textAlign: 'center' }}>{team.name}</Text>
            </TouchableOpacity>
          ))}
          {isAdmin && (
            <TouchableOpacity
              style={styles.adminButton}
              onPress={() => router.push('createteam')}
            >
              <Text className=" text-lg" style={{textAlign: 'center', color: '#ffffff'}}>Create Team</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    marginHorizontal: "auto",
    width: 350,
    backgroundColor: '#0f0529'
  },
  col: {
    borderColor: "#ffffff",
    backgroundColor: '#ffffff',
    borderWidth: 1,
    flex: 1,
    borderRadius: 5,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 10,
    height: 50 
  },
  adminButton: {
    marginTop: 50,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    borderColor: 'white',
  }
});

export default Players;
