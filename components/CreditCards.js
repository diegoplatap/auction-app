import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const CreditCards = ({ cardFranchise, lastFourDigits, name, expirationYear, expirationMonth }) => {
  const visa = require('../assets/images/Visa.png')
  const masterCard = require('../assets/images/MasterCard.png')
  const franchise =
    cardFranchise === 'Visa' ? visa : cardFranchise === 'Mastercard' ? masterCard : null
  return (
    <View style={styles.myCardsContainer}>
      <View style={styles.myCards}>
        {!cardFranchise ? <Text style={styles.message}>No credit cards added.</Text> : null}
        <Image style={{ width: 30, height: 20, borderRadius: 6, marginTop: 20 }} source={visa} />

        <Text>{name}</Text>
      </View>
    </View>
  )
}

export default CreditCards

const styles = StyleSheet.create({
  myCardsContainer: {
    // padding: 40,
    paddingHorizontal: 45,
    borderColor: 'red',
    borderWidth: 1.5,
  },
  myCards: {
    borderColor: 'red',
    borderWidth: 1,
    padding: 15,
  },
  myCardsTitle: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    color: '#24344C',
  },
  message: {
    marginTop: 20,
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
  },
})
