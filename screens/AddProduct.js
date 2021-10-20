import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AddProduct = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add product</Text>
    </View>
  )
}

export default AddProduct
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
