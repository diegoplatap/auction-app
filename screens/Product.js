import { LinearGradient } from 'expo-linear-gradient'
import React, { useContext } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import ProductHeader from '../components/ProductHeader'
import UserContext from '../context/UserContext'

const Product = ({ route, navigation }) => {
  const { product } = route.params
  const { currentUser } = useContext(UserContext)
  const haveCreditCard = currentUser.mercadoPagoUserId
  const { endDate } = product

  const placeAbid = () => {
    if (!haveCreditCard) {
      navigation.navigate('Login')
    }
  }

  return (
    <View style={styles.container}>
      <ProductHeader navigation={navigation} title={'Auction ending in '} endDate={endDate} />
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
      <View>
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={['#2977BA', '#195D99', '#114E85']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <TouchableOpacity onPress={() => placeAbid()}>
              <Text style={styles.buttonText}>{`Place a Bid      |     ${
                product.highestBid + 1
              } `}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
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
  buttonContainer: {
    marginBottom: 10,
    padding: 40,
  },
  button: {
    elevation: 8,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 6,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    padding: 3,
  },
})
