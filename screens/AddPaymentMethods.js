import { LinearGradient } from 'expo-linear-gradient'
import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AddPaymentsHeader from '../components/AddPaymentsHeader'
import { windowHeight } from '../utils/Dimentions'
import axios from '../utils/axios'
import UserContext from '../context/UserContext'
import { CreditCardInput } from 'react-native-input-credit-card'
import CreditCards from '../components/CreditCards'

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

  const [user, setUserData] = useState({
    email: 'pepito12@gmail.com',
    first_name: displayName,
  })

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
      expirationYear: expiry.slice(3, 6),
      expirationMonth: expiry.slice(0, 2),
      securityCode: cvc,
    }))
  }

  useEffect(() => {
    createUserMercadoPago()
  }, [])

  const createUserMercadoPago = async () => {
    try {
      let user
      user = await axios.get(`/v1/customers/search?email=${email}`)
      if (user.data.results.length === 0) {
        user = await axios.post('/v1/customers', user)
        const mercadoPagoUserId = user.data.id
        await updateProfile({ mercadoPagoUserId })
        setCurrentUser((prevState) => ({
          ...prevState,
          mercadoPagoUserId: mercadoPagoUserId,
        }))
      } else {
        return
      }
    } catch (error) {
      console.log(error.message)
      setError(() => 'The user already exist')
    }
  }

  const createCardToken = async () => {
    const cardToken = await axios.post('/v1/card_tokens', card)
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
          <TouchableOpacity onPress={() => {}}>
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
