import { LinearGradient } from 'expo-linear-gradient'
import React, { useContext, useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native'
import CustomHeader from '../components/CustomHeader'
import UserContext from '../context/UserContext'
import ProductsContext from '../context/ProductContext'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { windowHeight } from '../utils/Dimentions'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker'
import firebase from 'firebase'
import { storage } from '../config/firebase'
// import DateTimePicker from '@react-native-community/datetimepicker'
import CurrencyInput from 'react-native-currency-input'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const AddProduct = ({ route, navigation }) => {
  const { currentUser } = useContext(UserContext)
  const { addProduct } = useContext(ProductsContext)

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const [product, setProduct] = useState({
    bidded: 0,
    category: 'Technology',
    condition: 'New',
    description: '',
    endDate: '',
    highestBid: null,
    photoURL: '',
    title: '',
    userName: currentUser?.displayName,
    userId: currentUser?.userId,
    userPhotoURL: currentUser?.photoURL,
  })
  const [value, setValue] = useState(null)
  const [error, setError] = useState('')

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const onChange = (date) => {
    setProduct((prevState) => ({
      ...prevState,
      endDate: date,
    }))
    hideDatePicker()
  }

  const onClickAddProducts = async () => {
    const {
      title,
      category,
      bidded,
      condition,
      description,
      endDate,
      highestBid,
      userName,
      photoURL,
      userPhotoURL,
      userId,
    } = product
    try {
      addProduct(
        title,
        category,
        bidded,
        condition,
        description,
        endDate,
        highestBid,
        userName,
        photoURL,
        userPhotoURL,
        userId
      )
      navigation.navigate('Landing')
    } catch (error) {
      setError(error.message)
    }
  }

  const uploadImage = (uri) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.onerror = reject
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response)
        }
      }

      xhr.open('GET', uri)
      xhr.responseType = 'blob'
      xhr.send()
    })
  }

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert('Permisson denied')
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })

        if (!result.cancelled) {
          const imageUri = result.uri
          uploadImage(imageUri)
            .then((resolve) => {
              let ref = firebase
                .storage()
                .ref()
                .child(`products/${currentUser.userId}/${product.title}`)
              ref
                .put(resolve)
                .then(() => {
                  loadImage()
                  // console.log('Imagen subida correctamente')
                })
                .catch((error) => {
                  console.log('Error al subir la imagen')
                })
            })
            .catch((error) => {
              console.log(error)
            })
        }
      }
    }
  }

  const loadImage = async () => {
    storage
      .ref()
      .child(`products/${currentUser.userId}/${product.title}`)
      .getDownloadURL()
      .then((resolve) => {
        console.log('Resolve:', resolve)
        setProduct((prevState) => ({
          ...prevState,
          photoURL: resolve,
        }))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title={'Add product'} />
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <TouchableOpacity onPress={pickImage}>
          <View
          // style={{
          //   height: 130,
          //   width: 130,
          //   borderRadius: 50,
          //   justifyContent: 'center',
          //   alignItems: 'center',
          // }}
          >
            <ImageBackground
              source={{
                uri: product.photoURL || null,
              }}
              style={{
                height: 120,
                width: 350,
                backgroundColor: 'lightgray',
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons
                  name="image-edit-outline"
                  size={35}
                  color="#fff"
                  style={{
                    opacity: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10,
                  }}
                />
                {product.photoURL ? null : (
                  <Text style={{ color: 'whitesmoke', fontWeight: '700' }}>
                    Add a product image
                  </Text>
                )}
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
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
            selectedValue={product.condition}
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
              <TouchableOpacity onPress={showDatePicker}>
                <Text style={styles.buttonTextDate}>{`Pick a date`}</Text>
              </TouchableOpacity>
            </LinearGradient>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={onChange}
              onCancel={hideDatePicker}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 4,
          }}
        >
          {product?.endDate ? (
            <Text style={{ fontSize: 13 }}>{product.endDate.toString()}</Text>
          ) : null}
        </View>
        <View>
          <CurrencyInput
            value={value}
            onChangeValue={setValue}
            prefix="$"
            delimiter="."
            separator=","
            placeholder="$ Initial auction value"
            style={styles.textInputCurrency}
            precision={0}
            onChangeText={(formattedValue) => {
              setProduct((prevState) => ({
                ...prevState,
                highestBid: formattedValue,
              }))
            }}
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
            <TouchableOpacity onPress={() => onClickAddProducts()}>
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
    // paddingHorizontal: 20,
    // flexDirection: 'row',
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
    paddingHorizontal: 13,
    marginLeft: 10,
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
    marginTop: 10,
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
    marginBottom: 3,
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
