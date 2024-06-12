import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Leaderboard = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [sortedUserData, setSortedUserData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://192.168.8.203:8000/api/countsUsers');
      const data = response.data;
      setSortedUserData(data.data);
    } catch (error) {
      console.error('Failed to fetch sorted user data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleSortToggle = () => {
    setIsAscending(!isAscending);
    const sortedData = [...sortedUserData].sort((a, b) => {
      return isAscending ? (a.points - b.points) : (b.points - a.points);
    });
    setSortedUserData(sortedData);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0529' }}>
      <ScrollView style={{ flexGrow: 1, backgroundColor: '#0f0529' }}>
        <Text style={{ textAlign: 'center', fontSize: 24, color: 'white', fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>Leaderboards</Text>
        <View style={styles.app}>
          {sortedUserData.length > 0 ? (
            sortedUserData.map((user, index) => (
              <View key={index} style={styles.col}>
                <Text style={{ textAlign: 'left' }}>{index + 1}</Text>
                <Text style={{ textAlign: 'center' }}>{user.name}</Text>
                <Text style={{ textAlign: 'right' }}>{user.points ?? 0}</Text>
              </View>
            ))
          ) : (
            <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>No data available</Text>
          )}
          <Pressable onPress={handleSortToggle} style={styles.sortButton}>
            <Text style={{ color: 'black', textAlign: 'center' }}>
              {isAscending ? 'Sort by Points Descending' : 'Sort by Points Ascending'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    marginHorizontal: 'auto',
    width: 350,
    backgroundColor: '#0f0529',
  },
  col: {
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    flex: 1,
    borderRadius: 5,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  sortButton: {
    marginTop: 50,
    width: '30%',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    borderColor: 'white',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});

export default Leaderboard;
