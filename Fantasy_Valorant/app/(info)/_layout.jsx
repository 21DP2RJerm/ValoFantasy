import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const InfoLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='playerinfo'
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name='teaminfo'
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name='searchplayer'
          options={{
            headerShown: false
          }} />
          <Stack.Screen
          name='createteam'
          options={{
            headerShown: false
          }} />
      </Stack>
      <StatusBar backgroundColor='#0f0529' style="light" />
    </>
  )
}

export default InfoLayout;
