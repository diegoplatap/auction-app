import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ProductHeader from '../components/ProductHeader'

const Product = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ProductHeader navigation={navigation} title={'Auction ending in '} />
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
