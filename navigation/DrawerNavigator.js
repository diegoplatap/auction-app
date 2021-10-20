import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { StyleSheet } from 'react-native'
import TabNavigator from './TabNavigator'
import { AddProductsStackNavigator } from './StackNavigator'

const Drawer = createDrawerNavigator()

const screenOptionStyle = {
  headerShown: false,
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={screenOptionStyle}>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Add Products" component={AddProductsStackNavigator} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f6f8',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
})
