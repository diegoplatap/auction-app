import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet, Button } from 'react-native'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import SocialButton from '../components/SocialButton'
import { auth, db } from '../config/firebase'
import * as ImagePicker from 'expo-image-picker'

const Signup = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    console.log(navigation)
  }, [navigation])

  const register = () => {
    if (password !== confirmPassword) {
      setError(() => 'Passwords do not match')
      return
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (authUser) => {
          await authUser.user.updateProfile({
            displayName: name,
            photoURL:
              imageUrl ||
              'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
          })
        })
        .then(() => navigation.replace('Landing'))
        .catch((error) => setError(error.message))
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
          iconType="user"
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
        <Button title="Pick an image from camera roll(Optional)" onPress={pickImage} />
        <Text>{error}</Text>
        <FormButton buttonTitle="Sign Up" backgroundColor="#2a7abf" onPress={register} />

        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            By registering, you confirm that you accept our{' '}
          </Text>
          <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
            <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>Terms of service</Text>
          </TouchableOpacity>
          <Text style={styles.color_textPrivate}> and </Text>
          <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>Privacy Policy</Text>
        </View>

        {Platform.OS === 'android' ? (
          <View>
            <SocialButton
              buttonTitle="Sign Up with Facebook"
              btnType="facebook"
              color="#4867aa"
              backgroundColor="#e6eaf4"
              onPress={() => {}}
            />

            <SocialButton
              buttonTitle="Sign Up with Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={() => {}}
            />
          </View>
        ) : null}

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.navButtonText}>Have an account? Sign In</Text>
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
    fontSize: 28,
    marginBottom: 20,
    color: '#2a7abf',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2a7abf',
    // fontFamily: 'Lato-Regular', // ! CHANGE TO ROBOTO
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 20,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    // fontFamily: 'Lato-Regular', // ! CHANGE TO ROBOTO
    color: 'grey',
  },
})
