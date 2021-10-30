import { NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import LottieView from 'lottie-react-native'
import FormButton from '../components/FormButton'
import FormInput from '../components/FormInput'
import { auth } from '../config/firebase'

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [visible, setVisible] = useState(false)

  const toggleModal = () => {
    setVisible(!visible)
  }

  const closeModal = () => {
    setVisible(!visible)
    navigation.navigate('Home')
  }

  const forgotPassword = async (email) => {
    try {
      const emailSent = await auth.sendPasswordResetEmail(email)
      toggleModal()
    } catch (error) {
      toggleModal()
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
        <Modal animationType={'slide'} transparent={false} visible={visible}>
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
            <Text style={styles.closeText} onPress={closeModal}>
              Take me home
            </Text>
          </View>
        </Modal>
      </View>
      <View style={styles.container}>
        <Modal animationType={'slide'} transparent={false} visible={visible}>
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
            <Text style={styles.closeText} onPress={closeModal}>
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
    height: 400,
    width: 500,
    marginBottom: 20,
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
