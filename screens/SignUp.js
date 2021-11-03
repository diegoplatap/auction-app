import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet, Button } from 'react-native'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import SocialButton from '../components/SocialButton'
import { auth, db } from '../config/firebase'
import firebase from 'firebase'
import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient'
import GoogleButton from '../components/GoogleButton'
import FacebookButton from '../components/FacebookButton'
import UserContext from '../context/UserContext'

const Signup = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const { register, facebookLogIn } = useContext(UserContext)

  const onClickRegister = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match')
        return
      } else {
        await register(name, email, password, imageUrl)
        navigation.replace('Landing')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert('Permisson denied')
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })
        if (!result.cancelled) {
          setImageUrl(result.uri)
        }
      }
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Create an account</Text>

        <FormInput
          labelValue={name}
          onChangeText={(userName) => setName(userName)}
          placeholderText="Name"
          iconType="person"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
        />
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
        <FormInput
          labelValue={confirmPassword}
          onChangeText={(userPassword) => setConfirmPassword(userPassword)}
          placeholderText="Confirm Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <LinearGradient
          colors={['#2977BA', '#195D99', '#114E85']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={styles.profilePic}
        >
          <TouchableOpacity>
            <Text style={styles.uploadProfilePictureText} onPress={pickImage}>
              Add a profile picture from gallery
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <FormButton
          buttonTitle="Sign Up"
          backgroundColor="#114E85"
          onPress={() => onClickRegister()}
        />

        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            By registering, you confirm that you accept our{' '}
          </Text>
          <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
            <Text style={[styles.color_textPrivate, { color: '#114E85' }]}>Terms of service</Text>
          </TouchableOpacity>
          <Text style={styles.color_textPrivate}> and </Text>
          <Text style={[styles.color_textPrivate, { color: '#114E85' }]}>Privacy Policy</Text>
        </View>

        {Platform.OS === 'android' ? (
          <View>
            <FacebookButton
              buttonTitle="Sign Up with Facebook"
              color="white"
              backgroundColor="#1877F2"
              onPress={() => facebookLogIn()}
            />
            <GoogleButton
              buttonTitle="Sign Up with Google"
              color="gray"
              backgroundColor="#FFFFFF"
            />
          </View>
        ) : null}

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Login')}>
          <View style={styles.alreadyWithAccount}>
            <Text style={styles.navButtonTextInfo}>Have an account?</Text>
            <Text style={styles.navButtonText} onPress={() => navigation.navigate('Login')}>
              {' '}
              Sign In
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  container: {
    backgroundColor: 'whitesmoke',
    flex: 0.95,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    // fontFamily: 'Lato-Regular', // ! CHANGE TO ROBOTO
    fontSize: 25,
    marginBottom: 10,
    color: '#114E85',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#195D99',
    // fontFamily: 'Lato-Regular', // ! CHANGE TO ROBOTO
  },
  navButtonTextInfo: {
    fontSize: 18,
    fontWeight: '500',
    color: '#63666A',
    paddingRight: 8,
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 20,
    justifyContent: 'center',
  },
  uploadProfilePicture: {
    backgroundColor: '#114E85',
    color: 'white',
  },
  uploadProfilePictureText: {
    color: 'white',
  },
  alreadyWithAccount: {
    flexDirection: 'row',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    // fontFamily: 'Lato-Regular', // ! CHANGE TO ROBOTO
    color: '#63666A',
  },
  error: {
    marginBottom: 5,
    color: 'red',
  },
  profilePic: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 20,
    marginTop: 5,
    marginBottom: 8,
  },
})
