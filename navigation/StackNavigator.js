import React, { useLayoutEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Explore from '../screens/Explore'
import Product from '../screens/Product'
import AddProduct from '../screens/AddProduct'
import Bookmarks from '../screens/Bookmarks'
import Settings from '../screens/Settings'
import Profile from '../screens/Profile'
import EditProfile from '../screens/EditProfile'
import ResetPassword from '../screens/ResetPassword'
import AddPaymentMethods from '../screens/AddPaymentMethods'

const Stack = createStackNavigator()

const screenOptionStyle = {
  headerShown: false,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: 'white',
  },
}

const ExploreStackNavigator = ({ navigation, route }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Explore} />
      {/* <Stack.Screen name="Product" component={Product} /> */}
      <Stack.Screen name="Profile" component={Profile} />
      {/* <Stack.Screen name="EditProfile" component={EditProfile} /> */}
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="AddPayments" component={AddPaymentMethods} />
    </Stack.Navigator>
  )
}

const AddProductsStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Add product" component={AddProduct} />
      <Stack.Screen name="Profile" component={Profile} />
      {/* <Stack.Screen name="EditProfile" component={EditProfile} /> */}
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="AddPayments" component={AddPaymentMethods} />
    </Stack.Navigator>
  )
}
const BookmarksStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="BookmarksStack" component={Bookmarks} />
      <Stack.Screen name="Profile" component={Profile} />
      {/* <Stack.Screen name="EditProfile" component={EditProfile} /> */}
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="AddPayments" component={AddPaymentMethods} />
    </Stack.Navigator>
  )
}
const SettingsStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="SettingsStack" component={Settings} />
      <Stack.Screen name="Profile" component={Profile} />
      {/* <Stack.Screen name="EditProfile" component={EditProfile} /> */}
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="AddPayments" component={AddPaymentMethods} />
    </Stack.Navigator>
  )
}

export {
  ExploreStackNavigator,
  AddProductsStackNavigator,
  BookmarksStackNavigator,
  SettingsStackNavigator,
}
