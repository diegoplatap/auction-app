import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Platform, StyleSheet, ScrollView } from 'react-native'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import SocialButton from '../components/SocialButton'

import { auth } from '../config/firebase'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace('Landing')
      }
    })

    return unsubscribe
  }, [])

  const Login = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => setError(error.message))
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/Logo-temporal.png')} style={styles.logo} />

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      <Text>{error}</Text>
      <FormButton buttonTitle="Log in" backgroundColor="#2a7abf" onPress={Login} />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Log In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            // onPress={() => fbLogin()}
          />

          <SocialButton
            buttonTitle="Log In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            // onPress={() => googleLogin()}
          />
        </View>
      ) : null}

      <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('Sign up')}>
        <Text style={styles.navButtonText}>Don't have an acount? Create here</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.replace('Landing')}>
        <Text style={styles.navButtonText}>Continue as a guest...</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 0,
  },
  logo: {
    height: 130,
    width: 130,
    resizeMode: 'cover',
    marginBottom: 20,
  },

  text: {
    // fontFamily: 'Lato-Regular', // ! This is an alert!! change it to ROBOTO!!!
    fontSize: 28,
    marginBottom: 10,
    color: '#2a7abf',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 25,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2a7abf',
    // fontFamily: 'Lato-Regular', // ! This is an alert!! change it to ROBOTO!!!
  },
})
