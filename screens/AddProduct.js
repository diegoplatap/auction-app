import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import CustomHeader from '../components/CustomHeader'

const AddProduct = ({ route, navigation }) => {
  const [imageUrl, setImageUrl] = useState({})

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title={'Add products '} />
      <View>
        <Image
          source={{ uri: 'https://http2.mlstatic.com/D_NQ_NP_677988-MLA45993737435_052021-O.jpg' }}
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>Hello</Text>
      <View style={styles.userInfo}>
        <View style={styles.avatarName}>
          <Text style={styles.userName}>Hello</Text>
        </View>
        <View style={styles.highestBid}>
          <Text style={styles.userName}>Highest Bid</Text>
          <Text style={styles.highestBidValue}>Hello</Text>
        </View>
      </View>
      <Text style={styles.description}>Description</Text>
      <View style={styles.productInfo}>
        <Text style={styles.productDescription}>Hello</Text>
      </View>
      <View>
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={['#2977BA', '#195D99', '#114E85']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            {/* <TouchableOpacity>
              <Text style={styles.buttonText}>{`Place a Bid      |     ${
                product.highestBid + 1
              } `}</Text>
            </TouchableOpacity> */}
          </LinearGradient>
        </View>
      </View>
    </View>
  )
}

export default AddProduct

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
