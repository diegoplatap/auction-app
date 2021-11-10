import { LinearGradient } from 'expo-linear-gradient'
import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AddPaymentsHeader from '../components/AddPaymentsHeader'
import { windowHeight } from '../utils/Dimentions'
import axios from '../utils/axios'
import UserContext from '../context/UserContext'
import { CreditCardInput } from 'react-native-input-credit-card'
import { Alert } from 'react-native'

const AddPaymentMethods = ({ navigation }) => {
  const { currentUser, updateProfile, setCurrentUser } = useContext(UserContext)

  const { displayName, email, mercadoPagoUserId } = currentUser
  const [error, setError] = useState('')
  const [card, setCard] = useState({
    cardNumber: '',
    email: email,
    cardholder: {
      name: '',
    },
    expirationYear: '',
    expirationMonth: '',
    securityCode: '',
  })

  // const [userData, setUserData] = useState({
  //   email: 'probando01@a.com',
  //   first_name: displayName,
  // })

  const handleInputChange = (form) => {
    const { values } = form
    const { name, cvc, expiry, number } = values
    const newNumber = number.replace(/\s/g, '')
    setCard((prevState) => ({
      ...prevState,
      cardNumber: newNumber,
      cardholder: {
        name: name,
      },
      expirationYear: 20 + expiry.slice(3, 6),
      expirationMonth: expiry.slice(0, 2),
      securityCode: cvc,
    }))
  }

  const createUserMercadoPago = async () => {
    try {
      let user
      let mercadoPagoUserId
      user = await axios.get(`/v1/customers/search?email=${email}`)
      console.log('🚀 ~ file: AddPaymentMethods.js ~ line 53 ~ createUserMercadoPago ~ user', user)

      if (user.data.results.length === 1) {
        mercadoPagoUserId = user.data.results[0].id
        console.log('test1')
      }
      if (user.data.results.length === 0) {
        console.log('test2')
        user = await axios.post('/v1/customers', {
          email: email,
          first_name: displayName,
        })
        mercadoPagoUserId = user.data.id
        setCurrentUser((prevState) => ({
          ...prevState,
          mercadoPagoUserId: mercadoPagoUserId,
        }))
      }
      if (user) {
        console.log('test3')
        const cardTokenGenerate = await axios.post(`/v1/card_tokens`, card)
        const token = cardTokenGenerate.data.id
        const saveCardResponse = await axios.post(`/v1/customers/${mercadoPagoUserId}/cards`, {
          token: token,
        })
        await updateProfile({ mercadoPagoUserId, token })
        navigation.navigate('Wallet')
      }
    } catch (error) {
      console.log(error.message)
      Alert.alert('Please try again later')
    }
  }

  return (
    <View>
      <AddPaymentsHeader title="Add Credit Card" navigation={navigation} />
      <CreditCardInput onChange={handleInputChange} requiresName requiresCVC />

      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={['#2977BA', '#195D99', '#114E85']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <TouchableOpacity onPress={() => createUserMercadoPago()}>
            <Text style={styles.buttonText}>{`Add Card`}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  )
}

export default AddPaymentMethods

const styles = StyleSheet.create({
  inputContainer: {
    padding: 20,
  },
  textInput: {
    marginTop: 3,
    marginBottom: 6,
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
  buttonContainer: {
    paddingHorizontal: 120,
  },
  button: {
    elevation: 8,
    borderRadius: 15,
    paddingVertical: 6,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    padding: 3,
  },
})
