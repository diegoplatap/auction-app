import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Platform, StyleSheet, ScrollView } from 'react-native'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import { auth, db } from '../config/firebase'
import * as Google from 'expo-google-app-auth'
import { onSignIn } from '../config/GoogleAuth'
import * as Facebook from 'expo-facebook'
import firebase from 'firebase'
import GoogleButton from '../components/GoogleButton'
import FacebookButton from '../components/FacebookButton'
import UserContext from '../context/UserContext'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState('')

  const { login, facebookLogIn, currentUser } = useContext(UserContext)

  if (currentUser) {
    navigation.replace('Landing')
  }

  const onClickLogin = async () => {
    try {
      await login(email, password)
    } catch (error) {
      setError('Email and password are required to log in')
    }
  }

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        // behavior: 'web',
        androidClientId: '719319884640-u29gcptu1a6snl8e46j21h334kejglfs.apps.googleusercontent.com',
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      })

      if (result.type === 'success') {
        onSignIn(result)
        return result.accessToken
      } else {
        return { cancelled: true }
      }
    } catch (e) {
      return { error: true }
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/images/HandSell-LOGO.png')} style={styles.logo} />

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
      <FormButton buttonTitle="Log in" backgroundColor="#114E85" onPress={() => onClickLogin()} />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('ResetPassword')}
      >
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      {Platform.OS === 'android' ? (
        <View>
          <FacebookButton
            buttonTitle="Continue with Facebook"
            color="white"
            backgroundColor="#1877F2"
            onPress={() => facebookLogIn()}
          />
          <GoogleButton
            buttonTitle="Continue with Google"
            color="gray"
            backgroundColor="#FFFFFF"
            onPress={signInWithGoogleAsync}
          />
        </View>
      ) : null}

      <TouchableOpacity style={styles.forgotButton}>
        <View style={styles.createAccount}>
          <Text style={styles.navButtonTextInfo}>Don't have an acount?</Text>
          <Text style={styles.navButtonText} onPress={() => navigation.navigate('Sign up')}>
            Create here
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.navButtonTextInfo}>or</Text>
      <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.replace('Landing')}>
        <Text style={styles.navButtonText}>Continue as a guest</Text>
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
    // paddingTop: 0,
  },
  logo: {
    height: 90,
    width: 140,
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
    marginVertical: 20,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#195D99',
    // fontFamily: 'Lato-Regular', // ! This is an alert!! change it to ROBOTO!!!
  },
  createAccount: {
    flexDirection: 'row',
  },
  navButtonTextInfo: {
    fontSize: 18,
    fontWeight: '500',
    color: '#63666A',
    paddingRight: 8,
  },
})
