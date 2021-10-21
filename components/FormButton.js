import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { windowHeight } from '../utils/Dimentions'

const FormButton = ({ buttonTitle, ...props }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...props}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  )
}

export default FormButton

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#2e64e5',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    // fontFamily: 'Lato-Regular', // ! This is an alert!! change it to ROBOTO!!!
  },
})
