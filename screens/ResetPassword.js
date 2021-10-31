import { NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import LottieView from 'lottie-react-native'
import FormButton from '../components/FormButton'
import FormInput from '../components/FormInput'
import { auth } from '../config/firebase'

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [visibleSucess, setVisibleSucess] = useState(false)
  const [visibleError, setVisibleError] = useState(false)

  const toggleModalSuccess = () => {
    setVisibleSucess(!visibleSucess)
  }
  const toggleModalError = () => {
    setVisibleError(!visibleError)
  }

  const closeModalSuccess = () => {
    setVisibleSucess(!visibleSucess)
    navigation.navigate('Home')
  }
  const closeModalError = () => {
    setVisibleError(!visibleError)
    navigation.navigate('Home')
  }

  const forgotPassword = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email)
      toggleModalSuccess()
    } catch (error) {
      toggleModalError()
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Image source={require('../assets/passwordReset.png')} style={styles.logo} />
      <Text style={{ marginBottom: 15, fontWeight: '700', fontSize: 15 }}>
        Please enter your email address
      </Text>
      <FormInput
        labelValue={email}
        onChangeText={(email) => setEmail(email)}
        placeholderText="Email"
        iconType="mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormButton
        buttonTitle="Send email"
        backgroundColor="#114E85"
        onPress={() => forgotPassword(email)}
      />
      <View style={styles.container}>
        <Modal animationType={'slide'} transparent={false} visible={visibleSucess}>
          <LottieView
            source={require('../assets/images/success.json')}
            style={{
              width: 200,
              height: 200,
              marginLeft: 45,
              marginTop: 100,
            }}
            autoPlay
            loop
          />
          <View style={styles.resetPasswordText}>
            <Text style={styles.text}>Email password reset sent.</Text>
            <Text style={styles.closeText} onPress={closeModalSuccess}>
              Take me home
            </Text>
          </View>
        </Modal>
      </View>
      <View style={styles.container}>
        <Modal animationType={'slide'} transparent={false} visible={visibleError}>
          <LottieView
            source={require('../assets/images/error.json')}
            style={{
              width: 200,
              height: 200,
              marginLeft: 45,
              marginTop: 100,
            }}
            autoPlay
            loop
          />
          <View style={styles.resetPasswordText}>
            <Text style={styles.text}>Please try again later.</Text>
            <Text style={styles.closeText} onPress={closeModalError}>
              Take me home
            </Text>
          </View>
        </Modal>
      </View>
    </View>
  )
}

export default ResetPassword

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: 300,
    width: 200,
    marginBottom: 20,
    marginLeft: 20,
  },
  container: {
    padding: 25,
    // flex: 0.5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  image: {
    marginTop: 150,
    marginBottom: 10,
    width: 350,
    height: 100,
  },
  resetPasswordText: {
    marginTop: 100,
  },
  text: {
    fontSize: 20,
    padding: 20,
    textAlign: 'center',
  },
  closeText: {
    fontSize: 18,
    color: '#114E85',
    textAlign: 'center',
  },
})
