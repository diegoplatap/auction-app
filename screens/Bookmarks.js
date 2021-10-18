import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Bookmarks = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BOOKMARKS</Text>
    </View>
  )
}

export default Bookmarks
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
