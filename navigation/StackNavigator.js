import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Explore from '../screens/Explore'
import Product from '../screens/Product'
import AddProduct from '../screens/AddProduct'
import Bookmarks from '../screens/Bookmarks'
import Settings from '../screens/Settings'
import Login from '../screens/Login'
import Signup from '../screens/SignUp'

const Stack = createStackNavigator()

const screenOptionStyle = {
  headerShown: false,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: 'white',
  },
}

const ExploreStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Explore} />
      <Stack.Screen name="Product" component={Product} />
      {/* <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="Sign up" options={{ headerShown: false }} component={Signup} /> */}
    </Stack.Navigator>
  )
}

const AddProductsStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Add product" component={AddProduct} />
      {/* <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="Sign up" options={{ headerShown: false }} component={Signup} /> */}
    </Stack.Navigator>
  )
}
const BookmarksStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="BookmarksStack" component={Bookmarks} />
      {/* <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="Sign up" options={{ headerShown: false }} component={Signup} /> */}
    </Stack.Navigator>
  )
}
const SettingsStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="SettingsStack" component={Settings} />
      {/* <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="Sign up" options={{ headerShown: false }} component={Signup} /> */}
    </Stack.Navigator>
  )
}

export {
  ExploreStackNavigator,
  AddProductsStackNavigator,
  BookmarksStackNavigator,
  SettingsStackNavigator,
}
