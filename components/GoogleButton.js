import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { windowHeight } from '../utils/Dimentions'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Image } from 'react-native'

const GoogleButton = ({ buttonTitle, btnType, color, backgroundColor, ...props }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, { backgroundColor }]} {...props}>
      <View style={styles.iconWrapper}>
        {/* <FontAwesome name={btnType} style={styles.icon} size={22} color={color} /> */}
        <Image source={require('../assets/LogoGoogle.png')} style={styles.icon} />
      </View>
      <View style={styles.btnTxtWrapper}>
        <Text style={[styles.buttonText, { color }]}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default GoogleButton

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 15,
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 40,
    width: 40,
    borderBottomLeftRadius: 10,
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    // fontFamily: 'Lato-Regular', // ! This is an alert!! change it to ROBOTO!!!
  },
})
