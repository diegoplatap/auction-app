import { LinearGradient } from 'expo-linear-gradient'
import React, { useContext, useRef, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import UserContext from '../context/UserContext'
import { windowHeight } from '../utils/Dimentions'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import CurrencyInput from 'react-native-currency-input'

const AddProduct = ({ route, navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState()
  const { currentUser } = useContext(UserContext)

  const [product, setProduct] = useState({
    bidded: 0,
    category: 'Technology',
    condition: 'New',
    description: '',
    endDate: '',
    highestBid: '',
    photoURL: '',
    title: '',
    userName: currentUser?.displayName,
    userId: currentUser?.userId,
    userPhotoURL: currentUser?.photoURL,
  })

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title={'Add product'} />
      <View>
        <Image
          source={{ uri: 'https://http2.mlstatic.com/D_NQ_NP_677988-MLA45993737435_052021-O.jpg' }}
          style={styles.image}
        />
      </View>
      <View style={styles.inputContainer}>
        <View>
          <TextInput
            placeholder="Title"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={(title) =>
              setProduct((prevState) => ({
                ...prevState,
                title: title,
              }))
            }
          />
        </View>
        <View>
          <TextInput
            placeholder="Description"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInputDescription}
            numberOfLines={4}
            maxLength={2500}
            multiline={true}
            onChangeText={(description) =>
              setProduct((prevState) => ({
                ...prevState,
                description: description,
              }))
            }
          />
        </View>
        <Text style={styles.textCategory}>Please select a catergory:</Text>
        <View style={styles.picker}>
          <Picker
            style={styles.picker}
            selectedValue={product.category}
            onValueChange={(itemValue, itemIndex) =>
              setProduct((prevState) => ({
                ...prevState,
                category: itemValue,
              }))
            }
          >
            <Picker.Item label="Technology" value="Technology" style={{ fontSize: 14 }} />
            <Picker.Item label="Music" value="Music" style={{ fontSize: 14 }} />
            <Picker.Item label="Art" value="Art" style={{ fontSize: 14 }} />
            <Picker.Item label="NFT'S" value="NFT'S" style={{ fontSize: 14 }} />
          </Picker>
        </View>
        <Text style={styles.textCategory}>Condition:</Text>
        <View style={styles.picker}>
          <Picker
            style={styles.picker}
            selectedValue={product.category}
            onValueChange={(itemValue, itemIndex) =>
              setProduct((prevState) => ({
                ...prevState,
                condition: itemValue,
              }))
            }
          >
            <Picker.Item label="New" value="New" style={{ fontSize: 14 }} />
            <Picker.Item label="Used" value="Used" style={{ fontSize: 14 }} />
          </Picker>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
          }}
        >
          <View>
            <Text style={styles.auctionEnds}>Auction ends on:</Text>
          </View>
          <View style={styles.dateContainer}>
            <LinearGradient
              colors={['#2977BA', '#195D99', '#114E85']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonDate}
            >
              <TouchableOpacity>
                <Text style={styles.buttonTextDate}>{`Pick a date`}</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
        <View>
          <CurrencyInput
            onChangeValue={(value) =>
              setProduct((prevState) => ({
                ...prevState,
                highestBid: value,
              }))
            }
            prefix="$"
            delimiter="."
            separator=","
            placeholder="$ Initial auction value "
            style={styles.textInputCurrency}
            // precision={2}
            // onChangeText={(formattedValue) => {
            //   console.log(formattedValue); // $2,310.46
            // }}
          />
        </View>
      </View>

      <View>
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={['#2977BA', '#195D99', '#114E85']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <TouchableOpacity>
              <Text style={styles.buttonText}>{`Add product`}</Text>
            </TouchableOpacity>
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
    height: 120,
    width: 400,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  buttonContainer: {
    // marginBottom: 20,
    paddingHorizontal: 120,
  },
  dateContainer: {
    paddingHorizontal: 20,
    // marginBottom: 10,
  },
  button: {
    elevation: 8,
    borderRadius: 15,
    paddingVertical: 6,
  },
  buttonDate: {
    elevation: 8,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    padding: 3,
  },
  buttonTextDate: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    // padding: 3,
  },
  inputContainer: {
    padding: 20,
  },
  textInput: {
    marginTop: 3,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 18,
    borderColor: '#ccc',
    borderRadius: 15,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 15,
  },
  textInputCurrency: {
    marginTop: 15,
    width: '100%',
    height: windowHeight / 20,
    borderColor: '#ccc',
    borderRadius: 15,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 15,
  },
  textInputDescription: {
    borderColor: '#ccc',
    borderRadius: 15,
    borderWidth: 0.5,
    paddingLeft: 15,
  },
  textCategory: {
    color: '#666666',
    paddingLeft: 5,
    marginBottom: 5,
    marginTop: 15,
    fontWeight: '700',
  },
  auctionEnds: {
    color: '#666666',
    fontWeight: '700',
  },
  picker: {
    width: '100%',
    height: windowHeight / 20,
    textAlign: 'center',
    borderColor: '#ccc',
    color: '#666666',
    borderRadius: 15,
    borderWidth: 0.5,
    paddingLeft: 8,
  },
})
