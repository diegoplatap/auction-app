import React, { useState, useContext, useEffect } from 'react'
import firebase from 'firebase'
import { auth, db, storage } from '../config/firebase'
import * as Facebook from 'expo-facebook'

const UserContext = React.createContext()

export function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()

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
            console.log('Document successfully written!')
          })
      }
    })
  }

  const login = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password)
  }

  const signOutUser = async (navigation) => {
    await auth.signOut().then(() => {
      navigation.replace('Landing')
      setCurrentUser('')
    })
  }

  const facebookLogIn = async () => {
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
          if (authUser && firebase.firestore().collection('users').doc(authUser.uid)) {
            firebase
              .firestore()
              .collection('users')
              .doc(authUser.uid)
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
                setCurrentUser(user)
              })

            return
          } else {
            firebase
              .firestore()
              .collection('users')
              .doc(authUser.uid)
              .set({
                userId: authUser.uid,
                displayName: additionalUserInfo.profile.name,
                email: additionalUserInfo.profile.email,
                createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                photoURL: additionalUserInfo.profile.picture.data.url,
                phoneNumber: '',
                address: '',
                mercadoPagoUserId: '',
                cardTokens: '',
              })
              .then(() => {
                setCurrentUser(authUser)
                console.log('Document successfully written!')
              })
          }
        })

        return Promise.resolve({ type: 'success' })
        // checkLoginState(await response)
      } else {
        // type === 'cancel'
        return Promise.reject({ type: 'cancel' })
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`)
    }
  }

  const updateProfile = async ({ name, phone, address, url, mercadoPagoUserId, token }) => {
    const userRef = await db.collection('users').doc(currentUser?.userId)

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
            setCurrentUser(user)
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
    updateProfile,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContext
