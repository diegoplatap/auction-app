import React, { useState, useContext, useEffect } from 'react'
import firebase from 'firebase'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import { auth, db, storage } from '../config/firebase'
import * as Facebook from 'expo-facebook'
import { Alert } from 'react-native'
import axios from '../utils/axios'

const UserContext = React.createContext()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  async function registerForPushNotificationsAsync(authUser) {
    let token
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push token for push notification!')
        return
      }
      token = (await Notifications.getExpoPushTokenAsync()).data
    } else {
      alert('Must use physical device for Push Notifications')
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    firebase.database().ref('users/').child(authUser.uid).set({
      expoPushToken: token,
    })

    return token
  }

  const register = async (name, email, password, url) => {
    await auth.createUserWithEmailAndPassword(email, password).then(async (authUser) => {
      await authUser.user.updateProfile({
        displayName: name,
        photoURL:
          url ||
          'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
      })
    })

    await auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection('users')
          .doc(authUser.uid)
          .set({
            userId: authUser.uid,
            displayName: name,
            email: email,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
            photoURL:
              url ||
              'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
            phoneNumber: '',
            address: '',
            mercadoPagoUserId: '',
            cardTokens: '',
          })
          .then(() => {
            setCurrentUser({
              userId: authUser.uid,
              displayName: name,
              email: email,
              createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
              photoURL:
                url ||
                'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
              phoneNumber: '',
              address: '',
              mercadoPagoUserId: '',
              cardTokens: '',
            })
            console.log('ESTA ENTRANDO POR ACA 1  Document successfully written!')
          })
        registerForPushNotificationsAsync(authUser)
      }
    })
  }

  const login = async ({ email, password, navigation }) => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
      navigation.replace('Landing')
    } catch (error) {
      console.log(error)
    }
  }

  const signOutUser = async (navigation) => {
    await auth.signOut().then(() => {
      navigation.replace('Landing')
      setCurrentUser('')
    })
  }

  const facebookRegister = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '870849203622017',
      })

      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile', 'email'],
        })
      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        const credential = firebase.auth.FacebookAuthProvider.credential(token)
        const facebookProfileData = await firebase.auth().signInWithCredential(credential)

        const { additionalUserInfo } = facebookProfileData

        await auth.onAuthStateChanged((authUser) => {
          const user = firebase.firestore().collection('users').doc(authUser?.uid)

          user.get().then((doc) => {
            if (doc.exists) {
              alert(`Please login, user already exists`)
            } else {
              if (authUser) {
                firebase
                  .firestore()
                  .collection('users')
                  .doc(authUser.uid)
                  .set({
                    userId: authUser.uid,
                    displayName: currentUser?.displayName || additionalUserInfo.profile.name,
                    email: additionalUserInfo.profile.email,
                    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                    photoURL: currentUser?.photoURL || additionalUserInfo.profile.picture.data.url,
                    phoneNumber: currentUser?.photoURL || '',
                    address: currentUser?.address || '',
                    mercadoPagoUserId: currentUser?.mercadoPagoUserId || '',
                    cardTokens: currentUser?.cardTokens || '',
                  })
                  .then(() => {
                    setCurrentUser(authUser)
                    console.log('ESTA ENTRANDO POR ACA 2 Document successfully written!')
                  })
                registerForPushNotificationsAsync(authUser)
              }
            }
          })
        })
        return Promise.resolve({ type: 'success' })
      } else {
        Promise.reject({ type: 'cancel' })
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`)
    }
  }

  const facebookLogIn = async (navigation) => {
    try {
      await Facebook.initializeAsync({
        appId: '870849203622017',
      })
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile', 'email'],
        })
      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        const credential = firebase.auth.FacebookAuthProvider.credential(token)
        await firebase.auth().signInWithCredential(credential)
        navigation.replace('Landing')
        return Promise.resolve({ type: 'success' })
      } else {
        Promise.reject({ type: 'cancel' })
        Alert.alert('Please Sign up first')
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`)
    }
  }

  const updateProfile = async ({ name, phone, address, url, mercadoPagoUserId, token }) => {
    const userRef = await db.collection('users').doc(currentUser?.userId)

    setCurrentUser((prevState) => ({
      ...prevState,
      photoURL: url,
    }))

    return userRef.update({
      displayName: name || currentUser?.displayName,
      phoneNumber: phone || currentUser?.phoneNumber,
      address: address || currentUser?.address,
      photoURL: url || currentUser?.photoURL,
      updateDate: firebase.firestore.FieldValue.serverTimestamp(),
      mercadoPagoUserId: mercadoPagoUserId || currentUser?.mercadoPagoUserId,
      cardTokens: token || currentUser?.cardTokens,
    })
  }

  const createUserMercadoPago = async ({ email, displayName, card }) => {
    try {
      let user
      let mercadoPagoUserId
      user = await axios.get(`/v1/customers/search?email=${email}`)
      if (user.data.results.length === 1) {
        mercadoPagoUserId = user.data.results[0].id
      }
      if (user.data.results.length === 0) {
        user = await axios.post('/v1/customers', {
          email: email,
          first_name: displayName,
        })
        mercadoPagoUserId = user.data.id
        setCurrentUser((prevState) => ({
          ...prevState,
          mercadoPagoUserId: mercadoPagoUserId,
        }))
      }
      if (user) {
        const cardTokenGenerate = await axios.post(`/v1/card_tokens`, card)
        const token = cardTokenGenerate.data.id
        await axios.post(`/v1/customers/${mercadoPagoUserId}/cards`, {
          token: token,
        })
        await updateProfile({ mercadoPagoUserId, token })
      }
    } catch (error) {
      console.log(error.message)
      Alert.alert('Please try again later')
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection('users')
          .doc(auth.currentUser.uid)
          .onSnapshot((doc) => {
            const {
              displayName,
              email,
              phoneNumber,
              address,
              photoURL,
              userId,
              mercadoPagoUserId,
              cardTokens,
            } = doc.data()
            const user = {
              displayName,
              email,
              phoneNumber,
              address,
              photoURL,
              userId,
              mercadoPagoUserId,
              cardTokens,
            }
            setCurrentUser(() => user)
          })
      }
    })
    return unsubscribe
  }, [auth])

  const value = {
    currentUser,
    setCurrentUser,
    register,
    login,
    signOutUser,
    facebookLogIn,
    facebookRegister,
    updateProfile,
    createUserMercadoPago,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContext
