import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import BottomTabNavigator from './navigation/TabNavigator'
import { createStackNavigator } from '@react-navigation/stack'
import OnBoarding from './screens/OnBoarding'
import SignUp from './screens/SignUp'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Explore from './screens/Explore'
import { ExploreStackNavigator } from './navigation/StackNavigator'

const Stack = createStackNavigator()

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched2').then((value) => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched2', 'true')
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })
  }, [])

  if (isFirstLaunch === null) {
    return null
  } else if (isFirstLaunch === true) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnBoarding} />
          <Stack.Screen name="Sign Up" options={{ headerShown: false }} component={SignUp} />
          <Stack.Screen
            name="Landing"
            options={{ headerShown: false }}
            component={BottomTabNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Landing"
            options={{ headerShown: false }}
            component={BottomTabNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
