import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import BottomTabNavigator from './navigation/TabNavigator'
import { createStackNavigator } from '@react-navigation/stack'
import OnBoarding from './screens/OnBoarding'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Login from './screens/Login'
import Signup from './screens/SignUp'

const Stack = createStackNavigator()

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)
  let routeName

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched12').then((value) => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched12', 'true')
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })
  }, [])

  if (isFirstLaunch === null) {
    return null
  } else if (isFirstLaunch == true) {
    routeName = 'Onboarding'
  } else {
    routeName = 'Landing'
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routeName}>
        <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnBoarding} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Sign up" options={{ headerShown: false }} component={Signup} />
        <Stack.Screen
          name="Landing"
          options={{ headerShown: false }}
          component={BottomTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
