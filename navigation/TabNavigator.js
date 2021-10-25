import React, { useEffect, useRef } from 'react'
import {
  AddProductsStackNavigator,
  BookmarksStackNavigator,
  ExploreStackNavigator,
  SettingsStackNavigator,
} from './StackNavigator'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import iconsName from '../utils/icons'

const Tab = createBottomTabNavigator()

function getWidth() {
  let width = Dimensions.get('window').width

  width = width - 80
  return width / 4
}

const BottomTabNavigator = ({ navigate }) => {
  const tabOffSetValue = useRef(new Animated.Value(0)).current

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,

          tabBarStyle: {
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 20,
            marginHorizontal: 20,

            height: 60,
            borderRadius: 10,

            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            paddingHorizontal: 20,
          },

          tabBarIcon: ({ focused, size }) => {
            const iconName = iconsName(route.name)

            return (
              <MaterialIcons name={iconName} size={size} color={focused ? '#2a7abf' : '#A3B1B8'} />
            )
          },
        })}
      >
        <Tab.Screen
          name={'Explore'}
          component={ExploreStackNavigator}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffSetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start()
            },
          })}
        />
        <Tab.Screen
          name={'Add'}
          component={AddProductsStackNavigator}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffSetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start()
            },
          })}
        />
        <Tab.Screen
          name={'Bookmarks'}
          component={BookmarksStackNavigator}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffSetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start()
            },
          })}
        />
        <Tab.Screen
          name={'Settings'}
          component={SettingsStackNavigator}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffSetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start()
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={{
          width: getWidth() - 35,
          height: 2,
          backgroundColor: '#2a7abf',
          position: 'absolute',
          bottom: 80,
          left: 56,
          borderRadius: 20,
          transform: [{ translateX: tabOffSetValue }],
        }}
      />
    </>
  )
}

export default BottomTabNavigator
