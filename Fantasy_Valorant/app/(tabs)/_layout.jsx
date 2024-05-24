import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tab, Redirect, Tabs } from 'expo-router';
import {icons} from '../../constants';
import { StatusBar } from 'expo-status-bar';

const TabIcon = ({icon, color, name, focused}) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-bold' : 'font-semibold'} text-xs `} style={{color: color}} >
        {name}
      </Text>
    </View>
  )
}
const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#7338a0',
          tabBarInactiveTintColor: '#d3bbe6',
          tabBarStyle: {
            borderTopWidth: 1,
            height: 64,
            backgroundColor: '#0F0529',
            style:"light"
          }
        }}
      >
        <Tabs.Screen 
          name="home"    
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon 
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
          name="leaderboard"    
          options={{
            title: 'Leaderboard',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon 
                icon={icons.leaderboard}
                color={color}
                name="Leaderboard"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
          name="team"    
          options={{
            title: 'team',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon 
                icon={icons.team}
                color={color}
                name="My Team"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
          name="players"    
          options={{
            title: 'Players',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon 
                icon={icons.search}
                color={color}
                name="Players"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
          name="profile"    
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon 
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            )
          }}
        />
        
      </Tabs>
      <StatusBar backgroundColor='#0f0529' style="light"/>
    </>
  )
}

export default TabsLayout