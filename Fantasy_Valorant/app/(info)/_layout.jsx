import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const infoLayout = () => {
  return (
    <>
    <Stack>
      <Stack.Screen
        name='playerinfo'
        options={{
          headerShown: false
        }}/>
        <Stack.Screen
        name='teaminfo'
        options={{
          headerShown: false
        }}/>
        <Stack.Screen
        name='searchplayer'
        options={{
          headerShown: false
        }}/>
    </Stack>

    <StatusBar backgroundColor='#0f0529' style="light"/>
  </>
  )
}

export default infoLayout