import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, FlatList, Button } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import ProductCard from '../components/Products/ProductCards'
import SearchBar from '../components/Search/SearchBar'
import { auth, db } from '../config/firebase'

const Explore = ({ navigation }) => {
  const [products, setProducts] = useState([
    { id: '1', name: 'Guitarra Kiesel' },
    { id: '2', name: 'Guitarra Verde' },
    { id: '3', name: 'Guitarra Azul' },
    { id: '4', name: 'Guitarra Amarilla' },
  ])

  useEffect(() => {
    navigation.navigate('Landing')
  }, [])

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title={'Explore'} />
      <View style={styles.searchBar}>
        <SearchBar
          placeholderText="Search products..."
          iconType="search"
          keyboardType="default"
          autoCorrect={false}
        />
      </View>
      <Text style={styles.text}>Trending Auctions 🔥</Text>
      <View style={styles.content}>
        <FlatList
          style={styles.flatList}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={products}
          renderItem={({ item }) => (
            <ProductCard style={styles.productCard} {...item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={0}
          ListFooterComponent={() => <View style={styles.space}></View>}
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
    marginTop: 10,
  },
  flatList: {
    paddingLeft: 20,
  },
  text: {
    color: '#24344C',
    fontWeight: '700',
    fontSize: 18,
    marginTop: 25,
    paddingLeft: 20,
    marginLeft: 18,
    marginBottom: 6,
  },
  searchBar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  space: {
    marginLeft: 25,
  },
})
