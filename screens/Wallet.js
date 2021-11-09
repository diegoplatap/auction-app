import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import AddPaymentsHeader from '../components/AddPaymentsHeader'
import CreditCard from '../components/CreditCard'
import axios from '../utils/axios'
import UserContext from '../context/UserContext'
import LottieView from 'lottie-react-native'

const Wallet = ({ navigation }) => {
  const { currentUser } = useContext(UserContext)
  const { mercadoPagoUserId } = currentUser
  const [loadedCards, setLoadedCards] = useState([])

  useEffect(() => {
    loadCardsFromUser()
  }, [])

  const loadCardsFromUser = async () => {
    try {
      const cardsInfo = await axios.get(`v1/customers/${mercadoPagoUserId}/cards`)

      const data = cardsInfo.data.map((el) => {
        const {
          cardholder: { name },
        } = el
        setLoadedCards((prevState) => [
          ...prevState,
          {
            id: el.id,
            name: name,
            cardFranchise: el.issuer.name,
            lastFourDigits: el.last_four_digits,
            expirationYear: el.expiration_year,
            expirationMonth: el.expiration_month,
          },
        ])
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <View style={styles.container}>
      <AddPaymentsHeader title="Wallet" navigation={navigation} />
      <View style={styles.content}>
        {loadedCards.length === 0 ? (
          <View style={{ alignItems: 'center' }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Text style={{ fontSize: 15, fontWeight: '700', marginRight: 60, marginLeft: 110 }}>
                Please add a card
              </Text>
              <LottieView
                source={require('../assets/images/arrowUp.json')}
                style={{
                  width: 50,
                  height: 50,
                  marginBottom: 5,
                }}
                autoPlay
                loop
              />
            </View>

            <View style={{ marginTop: 50 }}>
              <LottieView
                source={require('../assets/images/nothingHere.json')}
                style={{
                  width: 250,
                  height: 250,
                }}
                autoPlay
                loop
              />
            </View>
          </View>
        ) : null}
        <FlatList
          data={loadedCards}
          renderItem={({ item }) => <CreditCard {...item} />}
          keyExtractor={(item) => item.id}
          numColumns={1}
        />
      </View>
    </View>
  )
}

export default Wallet

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flex: 3,
  },
  arrowImage: {
    marginLeft: 20,
    width: 50,
    height: 50,
  },
})
