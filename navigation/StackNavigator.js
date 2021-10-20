import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Explore from '../screens/Explore'
import Product from '../screens/Product'
import AddProduct from '../screens/AddProduct'
import Bookmarks from '../screens/Bookmarks'
import Settings from '../screens/Settings'
import { FontAwesome5 } from '@expo/vector-icons'
import SignUp from '../screens/SignUp'
import OnBoarding from '../screens/OnBoarding'

const Stack = createStackNavigator()

const screenOptionStyle = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: 'whitesmoke',
  },
}

const MainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName={'Onboarding'}>
      <Stack.Screen
        name="Onboarding"
        component={OnBoarding}
        options={{
          headerShown: false,
          tabBarVisible: false,
        }}
      />
      <Stack.Screen name="Home" component={Explore} options={{ headerShown: false }} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen
        name="Sign up"
        component={SignUp}
        options={{ headerShown: false, presentation: 'modal' }}
      />
    </Stack.Navigator>
  )
}

const AddProductsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Add product" component={AddProduct} />
    </Stack.Navigator>
  )
}
const BookmarksStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Bookmarks" component={Bookmarks} />
    </Stack.Navigator>
  )
}
const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  )
}

export {
  MainStackNavigator,
  AddProductsStackNavigator,
  BookmarksStackNavigator,
  SettingsStackNavigator,
}
