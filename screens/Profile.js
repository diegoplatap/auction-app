import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { auth } from '../config/firebase'

const Profile = ({ navigation }) => {
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace('Landing')
    })
  }

  return (
    <View>
      <Text>PROFILE</Text>
      <Button
        title="Sing out"
        onPress={signOutUser}
        overlayContainerStyle={{ backgroundColor: 'white' }}
      />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})
