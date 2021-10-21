import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Explore from '../screens/Explore'
import Product from '../screens/Product'
import AddProduct from '../screens/AddProduct'
import Bookmarks from '../screens/Bookmarks'
import Settings from '../screens/Settings'

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
    </Stack.Navigator>
  )
}

const AddProductsStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Add product" component={AddProduct} />
    </Stack.Navigator>
  )
}
const BookmarksStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="BookmarksStack" component={Bookmarks} />
    </Stack.Navigator>
  )
}
const SettingsStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="SettingsStack" component={Settings} />
    </Stack.Navigator>
  )
}

export {
  ExploreStackNavigator,
  AddProductsStackNavigator,
  BookmarksStackNavigator,
  SettingsStackNavigator,
}
