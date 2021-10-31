import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import ProductHeader from '../components/ProductHeader'

const Product = ({ route, navigation }) => {
  const { product } = route.params

  console.log('🚀 ~ file: Product.js ~ line 7 ~ Product ~ product', product)

  return (
    <View style={styles.container}>
      <ProductHeader navigation={navigation} title={'Auction ending in '} />
      <View>
        <Image source={{ uri: product.photoURL }} style={styles.image} />
      </View>
      <Text style={styles.title}>{product.title}</Text>
      <View style={styles.userInfo}>
        <View style={styles.avatarName}>
          <Avatar
            size={28}
            rounded
            source={{
              uri:
                product.userPhotoURL ||
                'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
            }}
          />
          <Text style={styles.userName}>{product.userName}</Text>
        </View>
        <View style={styles.highestBid}>
          <Text style={styles.userName}>Highest Bid</Text>
          <Text style={styles.highestBidValue}>{product.highestBid}</Text>
        </View>
      </View>
      <Text style={styles.description}>Description</Text>
      <View style={styles.productInfo}>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>
    </View>
  )
}

export default Product

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#24344C',
    marginLeft: 30,
  },
  avatarName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 32,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productInfo: {
    marginLeft: 30,
    marginTop: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userName: {
    paddingLeft: 10,
    color: '#63666A',
  },
  description: {
    marginLeft: 30,
    marginTop: 40,
    fontSize: 18,
    fontWeight: '700',
    color: '#24344C',
  },
  productDescription: {
    color: '#63666A',
    fontSize: 16,
  },
  highestBid: {
    marginRight: 25,
    alignItems: 'center',
  },
  highestBidValue: {
    color: '#24344C',
    paddingLeft: 10,
    fontWeight: '700',
  },
  image: {
    height: 320,
    width: 400,
    marginBottom: 20,
  },
})
