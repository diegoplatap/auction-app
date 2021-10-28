import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { windowHeight } from '../utils/Dimentions'
import { MaterialIcons } from '@expo/vector-icons'

const FormInput = ({ labelValue, placeholderText, iconType, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <MaterialIcons name={iconType} size={25} color="#666" />
      </View>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...props}
      />
    </View>
  )
}

export default FormInput

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 15,
    borderWidth: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    // fontFamily: 'Lato-Regular', // ! This is an alert!! change it to ROBOTO!!!
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
