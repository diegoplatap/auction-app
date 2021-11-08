import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AddPaymentsHeader from '../components/AddPaymentsHeader'
import { windowHeight } from '../utils/Dimentions'

const AddPaymentMethods = ({ navigation }) => {
  return (
    <View>
      <AddPaymentsHeader title="Add Credit Card" navigation={navigation} />
      <Image
        source={{
          uri: 'https://www.pngall.com/wp-content/uploads/2/Black-Credit-Card-PNG-Image.png',
        }}
        style={{ width: 400, height: 250, resizeMode: 'contain' }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Card Number"
          placeholderTextColor="#666666"
          autoCorrect={false}
          keyboardType="numeric"
          style={styles.textInput}
        />
        <TextInput
          placeholder="Name on card"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Valid thur"
          placeholderTextColor="#666666"
          autoCorrect={false}
          keyboardType="numeric"
          style={styles.textInput}
        />
        <TextInput
          placeholder="CVC"
          placeholderTextColor="#666666"
          autoCorrect={false}
          keyboardType="numeric"
          style={styles.textInput}
        />
      </View>
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
    // marginBottom: 20,
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
