import React, { useEffect, useState, useContext } from 'react'
import { Text, StyleSheet, View, FlatList, Button } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import ProductCard from '../components/Products/ProductCard'
import CategoriesCard from '../components/Categories/CategoriesCard'
import SearchBar from '../components/Search/SearchBar'
import { db } from '../config/firebase'
import LottieView from 'lottie-react-native'
import ProductsContext from '../context/ProductContext'
import axios from '../utils/axios'

const Explore = ({ navigation }) => {
  const { products } = useContext(ProductsContext)

  const [categories, setCategories] = useState([
    { id: '1', name: 'Technology' },
    { id: '2', name: 'Music' },
    { id: '3', name: 'Art' },
    { id: '4', name: "NFT'S" },
  ])

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
      {products ? (
        <>
          <Text style={styles.text}>Trending Auctions 🔥</Text>
          <View style={styles.content}>
            <FlatList
              style={styles.flatList}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={products}
              renderItem={({ item }) => <ProductCard {...item} navigation={navigation} />}
              keyExtractor={(item) => item.id}
              numColumns={0}
              ListFooterComponent={() => <View style={styles.space}></View>}
            />
          </View>
          <Text style={styles.categoryText}>Featured Categories ⭐</Text>
          <View style={styles.content}>
            <FlatList
              style={styles.flatList}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              renderItem={({ item }) => <CategoriesCard {...item} navigation={navigation} />}
              keyExtractor={(item) => item.id}
              numColumns={0}
              ListFooterComponent={() => <View style={styles.space}></View>}
            />
          </View>
        </>
      ) : (
        <LottieView
          source={require('../assets/images/loading.json')}
          style={{
            width: 100,
            height: 100,
            marginLeft: 70,
            marginTop: 100,
          }}
          autoPlay
          loop
        />
      )}
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  flatList: {
    paddingLeft: 20,
  },
  categoryText: {
    color: '#24344C',
    fontWeight: '700',
    fontSize: 18,
    marginTop: 25,
    paddingLeft: 20,
    marginLeft: 18,
  },
  text: {
    color: '#24344C',
    fontWeight: '700',
    fontSize: 18,
    marginTop: 18,
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
