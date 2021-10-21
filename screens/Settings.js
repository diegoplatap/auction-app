import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </View>
  )
}

export default Settings
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
