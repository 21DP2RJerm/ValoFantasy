import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router'; 

const Players = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teamData, setTeamData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://192.168.8.203:8000/api/getTeamInfo');
        const data = response.data;
        setTeamData(data.data);
      } catch (error) {
        console.error('Failed to fetch sorted user data:', error);
      }
    };

    fetchData();

    async function prepare() {
      try {
        // Prevent the splash screen from auto-hiding
        await SplashScreen.preventAutoHideAsync();

        // Simulate data fetching
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Hide the splash screen
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
      }
    }

    prepare();
  }, []);

  if (isLoading) {
    return null; // Or return a splash screen component
  }

  const handlePress = () => {
    router.push('/teaminfo');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0529' }}>
      <ScrollView style={{ flexGrow: 1, backgroundColor: '#0f0529' }}>
        <Text style={{ textAlign: 'center', fontSize: 24, color: 'white', fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>Teams</Text>
        <View style={styles.app}>
          {teamData.map((teamName, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.col} 
              onPress={() => handlePress(teamName)} 
            >
              <Text style={{ textAlign: 'center' }}>{teamName}</Text>
            </TouchableOpacity>
          ))}
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
    alignItems: 'center', // Center text vertically
    padding: 10,
    height: 50 // Ensure TouchableOpacity has a height
  },
  sortButton: {
    marginTop: 50,
    width: '30%',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    borderColor: 'white',
    backgroundColor: 'white',
    justifyContent: 'center'
  }
});

export default Players;
