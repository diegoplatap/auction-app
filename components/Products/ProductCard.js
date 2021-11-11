import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Avatar } from 'react-native-elements'
import Counter from './Counter'

const ProductCard = (props) => {
  const {
    photoURL,
    title,
    bidded,
    highestBid,
    userName,
    userPhotoURL,
    endDate,
    id,
    highBidMercadoPagoUserId,
    highBidUserId,
    highBidUserToken,
    finished,
  } = props

  const actualDate = new Date()

  const goToProduct = () => {
    const { navigation, ...product } = props
    navigation.navigate('Product', {
      product,
    })
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={goToProduct}
      disabled={finished === false ? false : true}
    >
      {finished === false ? null : (
        <TouchableOpacity style={styles.imageFinished} disabled={true}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              top: 40,
              left: 32,
            }}
          >
            Auction ended
          </Text>
        </TouchableOpacity>
      )}
      <View>
        <View style={styles.column}>
          <Image source={{ uri: photoURL }} style={styles.image}></Image>

          <Text style={styles.productTitle}>{title}</Text>
          <View style={styles.creator}>
            <View style={styles.creatorContainer}>
              <Avatar
                rounded
                size={25}
                source={{
                  uri:
                    userPhotoURL ||
                    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
                }}
              />
              <Text style={styles.creatorName}>{userName}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <LinearGradient
                colors={['#2977BA', '#195D99', '#114E85']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
              >
                <TouchableOpacity>
                  <Text style={styles.buttonText}>{`${bidded} Bidded`}</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
          <View style={styles.footerCard}>
            <View style={styles.footerCardLeft}>
              <Counter
                id={id}
                endDate={endDate}
                highBidMercadoPagoUserId={highBidMercadoPagoUserId}
                finished={finished}
                highestBid={highestBid}
                highBidUserToken={highBidUserToken}
                title={title}
              />
              <Text style={styles.footerTitles}>Auction Ending in</Text>
            </View>
            <View style={styles.footerCardRight}>
              <Text style={styles.footerTitles}>Highest Bid</Text>
              <Text style={styles.timer}>{highestBid}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  card: {
    height: 360,
    width: 240,
    padding: 10,
    marginLeft: 10,
    marginVertical: 5,
    backgroundColor: 'whitesmoke',
    borderRadius: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  image: {
    height: 200,
    width: 220,
    resizeMode: 'cover',
    borderRadius: 20,
    marginTop: 5,
  },
  imageFinished: {
    height: 100,
    width: 160,
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    top: 135,
    right: 37,
    borderRadius: 20,
    marginTop: 5,
    position: 'absolute',
    zIndex: 10,
  },
  creator: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#A3B1B8',
    borderBottomWidth: 0.5,
    marginBottom: 14,
    marginLeft: 6,
  },
  creatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginBottom: 10,
  },
  creatorName: {
    marginLeft: 10,
    fontSize: 12,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  button: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    padding: 3,
  },
  column: {
    flexDirection: 'column',
    height: '100%',
  },
  productTitle: {
    color: '#24344C',
    fontWeight: '700',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
  },
  footerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerCardLeft: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerCardRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerTitles: {
    fontSize: 10,
  },
  timer: {
    color: '#24344C',
    fontSize: 12,
    fontWeight: '700',
  },
})
