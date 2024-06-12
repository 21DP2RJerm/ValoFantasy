import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../services/Authservice';
import { CommonActions } from '@react-navigation/native';
import { loaduser } from '../../services/Authservice';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { router } from 'expo-router';
const Row = ({ children }) => (
  <View style={styles.row}>{children}</View>
);

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [profileID, setProfileID] = useState(null);
  const [fantasyPoints, setFantasyPoints] = useState(0);

  useEffect(() => {
    loadUserProfile();
  }, []);

  useEffect(() => {
    if (profileID !== null) {
      loadFantasyTeamPoints();
    }
  }, [profileID]);

  const loadUserProfile = async () => {
    try {
      const userData = await loaduser();
      setProfile(userData.data.name);
      setProfileID(userData.data.id);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const loadFantasyTeamPoints = async () => {
    try {

      const response = await axios.post(
        'http://192.168.8.203:8000/api/getFantasyTeamInfo',
        {},
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      const fantasyTeamsData = response.data.data; 
      if (Array.isArray(fantasyTeamsData) && fantasyTeamsData.length > 0) {

        const currentUserFantasyTeam = fantasyTeamsData.find(team => team.user === profileID);

        if (currentUserFantasyTeam) {
          setFantasyPoints(currentUserFantasyTeam.points);
        } else {
          console.error('Fantasy team data not found for current user');
        }
      } else {
        console.error('Fantasy teams data is not an array or empty:', fantasyTeamsData);
      }
    } catch (error) {
      console.error('Error loading fantasy team points:', error);
    }
  };

  async function handleLogout() {
    console.log('User logged out');
    await logout();
    setUser(null);
    router.push(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'sign-in' }], 
      })
    );
  }

  return (
    <SafeAreaView className="h-full" style={{ backgroundColor: '#0f0529' }}>
      <ScrollView>
        {profile && (
          <>
            <Text className="text-3xl text-white font-bold mt-10" style={{ textAlign: 'center' }}>{profile}</Text>
            <View style={styles.app}>
              <Row>
                <View style={styles.col}>
                  <Image source={images.boaster} className="w-[350px] h-[220px]" resizeMode="contain" />
                </View>
              </Row>

              <Text className="text-3xl text-white font-bold mt-10" style={{ textAlign: 'center' }}>Points:</Text>
              <Text className="text-3xl text-white font-bold" style={{ textAlign: 'center' }}>{fantasyPoints}</Text>
              <Pressable onPress={handleLogout} style={styles.button} className="w-full justify-center text-justify">
                <Text className="text-lg" style={{ textAlign: 'center', color: '#0f0529' }}>Sign out</Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    marginHorizontal: "auto",
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: "row"
  },
  col: {
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 5,
    marginTop: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%'
  },
  button: {
    marginTop: 50,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    borderColor: 'white',
    backgroundColor: 'white'
  }
});

export default Profile;
