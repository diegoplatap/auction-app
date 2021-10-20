import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Product = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Product</Text>
    </View>
  )
}

export default Product

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
