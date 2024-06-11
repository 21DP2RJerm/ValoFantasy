import { View, Text, StyleSheet, ScrollView, TextInput, SafeAreaView, Pressable, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { router } from 'expo-router';


const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
  )

  const scoreentry = () => {
    const renderScoreEntries = () => {
      return Array.from({ length: 10 }).map((_, index) => (
        <View key={index} className="w-full justify-center h-full px-4 my-1" style={styles.col}>
          <TextInput
            style={styles.inputteam}
            placeholder="Player name"
            placeholderTextColor="#ffffff"
          />
          <TextInput
            style={styles.input}
            placeholder="Kills"
            placeholderTextColor="#ffffff"
          />
          <TextInput
            style={styles.input}
            placeholder="Deaths"
            placeholderTextColor="#ffffff"
          />
          <TextInput
            style={styles.input}
            placeholder="Assists"
            placeholderTextColor="#ffffff"
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
              onPress={() => router.push('scoreentry')}
              >
                <Text className=" text-lg" style={{textAlign: 'center', color: '#ffffff'}}>Enter data</Text>
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
    width:70,
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
    justifyContent:'center',
    alignContent:'center'
      }
});


export default scoreentry