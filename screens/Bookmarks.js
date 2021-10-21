import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Bookmarks = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bookmark</Text>
    </View>
  )
}

export default Bookmarks
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
