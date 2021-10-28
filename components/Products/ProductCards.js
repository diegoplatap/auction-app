import React from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const ProductCard = (props) => {
  const goToChar = () => {
    const { navigation, ...product } = props
    navigation.navigate('Product', {
      product,
    })
  }

  return (
    <TouchableOpacity style={styles.card} onPress={goToChar}>
      <View>
        <View style={styles.column}>
          <Image source={require('../../assets/images/guitar.jpg')} style={styles.image}></Image>
          <Text style={styles.productTitle}>{props.name}</Text>
          <View style={styles.creator}>
            <View style={styles.creatorContainer}>
              <MaterialCommunityIcons name="account-circle" size={30} color="#A3B1B8" />
              <Text style={styles.creatorName}>Creator's Name</Text>
            </View>
            <View style={styles.buttonContainer}>
              <LinearGradient
                colors={['#2977BA', '#195D99', '#114E85']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
              >
                <TouchableOpacity>
                  <Text style={styles.buttonText}>03 Bidded</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
          <View style={styles.footerCard}>
            <View style={styles.footerCardLeft}>
              <Text style={styles.footerTitles}>Auction Ending in</Text>
              <Text style={styles.timer}>02d 13h 12m 10s</Text>
            </View>
            <View style={styles.footerCardRight}>
              <Text style={styles.footerTitles}>Highest Bid</Text>
              <Text style={styles.timer}>$2.500.000</Text>
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
  creator: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#A3B1B8',
    borderBottomWidth: 0.5,
    marginBottom: 14,
  },
  creatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginBottom: 10,
  },
  creatorName: {
    paddingLeft: 4,
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
    fontWeight: '600',
  },
})
