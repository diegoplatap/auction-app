import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AddPaymentsHeader from '../components/AddPaymentsHeader'
import CreditCards from '../components/CreditCards'
import axios from '../utils/axios'
import UserContext from '../context/UserContext'

const MyCards = ({ navigation }) => {
  const { currentUser } = useContext(UserContext)
  const { mercadoPagoUserId } = currentUser
  const [loadedCard, setLoadedCard] = useState({
    cardFranchise: '',
    lastFourDigits: '',
    name: '',
    expirationYear: '',
    expirationMonth: '',
  })

  useEffect(() => {
    loadCardsFromUser()
  }, [])

  const loadCardsFromUser = async () => {
    const cardsInfo = await axios.get(`v1/customers/${mercadoPagoUserId}/cards`)
    const data = cardsInfo.data.map((el) => {
      const {
        cardholder: { name },
      } = el
      // const {
      //   issuer: { name: cardNname },
      // } = el
      setLoadedCard((prevState) => ({
        ...prevState,
        name: name,
        cardFranchise: el.issuer.name,
        lastFourDigits: el.last_four_digits,
        expirationYear: el.expiration_year,
        expirationMonth: el.expiration_month,
      }))
    })
  }
  console.log('COMO ESTA CARGANDO???:', loadedCard)

  return (
    <View>
      <AddPaymentsHeader title="Wallet" navigation={navigation} />
      <CreditCards
        cardFranchise={loadedCard.cardFranchise}
        lastFourDigits={loadedCard.lastFourDigits}
        name={loadedCard.name}
        expirationYear={loadedCard.expirationYear}
        expirationMonth={loadedCard.expirationMonth}
      />
    </View>
  )
}

export default MyCards

const styles = StyleSheet.create({})
