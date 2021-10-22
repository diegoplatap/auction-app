import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { windowHeight } from '../../utils/Dimentions'

import { MaterialIcons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'

const SearchBar = ({ placeholderText, iconType, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <Feather name={iconType} size={22} color="#97a4a9" />
      </View>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder={placeholderText}
        placeholderTextColor="#97a4a9"
        {...props}
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 15,
    marginBottom: 10,
    width: '80%',
    height: windowHeight / 22,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 4,
  },
  iconStyle: {
    // padding: 5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  input: {
    flex: 1,
    fontSize: 15,
    // fontFamily: 'Lato-Regular', // ! This is an alert!! change it to ROBOTO!!!
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
