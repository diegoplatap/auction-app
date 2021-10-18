import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Button } from 'react-native'

const Explore = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>EXPLORE</Text>
    </View>
  )
}

export default Explore

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
