import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const CreditCard = (props) => {
  const visa = require('../assets/images/Visa.png')
  const masterCard = require('../assets/images/MasterCard.png')
  const franchise =
    props.cardFranchise === 'Visa' ? visa : props.cardFranchise === 'Mastercard' ? masterCard : null
  const bgColor = props.cardFranchise === 'Visa' ? '#114e85' : '#db2c40'
  return (
    <View style={styles.myCardsContainer}>
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <View style={[styles.bgCircle, styles.rightBgCircle]} />
        <View style={[styles.bgCircle, styles.bottomBgCircle]} />
        <View style={[styles.circle, styles.leftCircle]} />
        <View style={[styles.circle, styles.rightCircle]} />
        <Image source={franchise} style={{ width: 40, height: 25 }} />
        <View style={styles.cardNumberContainer}>
          <View style={styles.cardNumberPart}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
          <View style={styles.cardNumberPart}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
          <View style={styles.cardNumberPart}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
          <Text style={styles.text}>{props.lastFourDigits}</Text>
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.text}>{props.name}</Text>
          <Text style={styles.text}>{`${props.expirationMonth}/${props.expirationYear}`}</Text>
        </View>
      </View>
    </View>
  )
}

export default CreditCard

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 40,
    borderRadius: 12,
    width: 290,
    position: 'relative',
    backgroundColor: '#0047cc',
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 18,
  },
  cardNumberPart: { flexDirection: 'row' },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
    backgroundColor: 'whitesmoke',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    letterSpacing: 0.53,
    color: 'white',
  },
  bgCircle: {
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.05,
    height: 250,
    width: 250,
    borderRadius: 250,
  },
  rightBgCircle: {
    top: (-1 * 250) / 4,
    right: (-1 * 250) / 2,
  },
  bottomBgCircle: {
    bottom: (-1 * 250) / 2,
    left: (0 * (-1 * 250)) / 2,
  },
  myCardsContainer: {
    paddingHorizontal: 45,
    marginTop: 15,
  },
})
