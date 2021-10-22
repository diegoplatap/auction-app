import React, { useState } from 'react'
import { Text, StyleSheet, View, FlatList, Button } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import ProductCard from '../components/Products/ProductCards'

const Explore = ({ navigation }) => {
  const [products, setProducts] = useState([
    { id: '1', name: 'Guitarra Kiesel' },
    { id: '2', name: 'Guitarra Verde' },
  ])
  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title={'Explore'} />
      <Text style={styles.text}>Trending Auctions 🔥</Text>
      <View style={styles.content}>
        <FlatList
          horizontal
          data={products}
          renderItem={({ item }) => <ProductCard {...item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
          numColumns={0}
        />
      </View>
    </View>
  )
}

export default Explore

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#24344C',
    fontWeight: '700',
    fontSize: 22,
  },
})
