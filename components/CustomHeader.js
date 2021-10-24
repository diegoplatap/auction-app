import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { auth } from '../config/firebase'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'

const CustomHeader = ({ navigation, title, uri }) => {
  const [isUserAuth, setIsUserAuth] = useState(null)

  const openProfile = () => navigation.navigate('Profile')
  const openLogin = () => navigation.navigate('Login')

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setIsUserAuth(true)
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={{ marginLeft: 15 }}>
          <Avatar
            rounded
            source={{
              uri:
                auth?.currentUser?.photoURL ||
                'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
            }}
            onPress={isUserAuth ? openProfile : openLogin}
          />
        </View>
      </View>
      <View style={styles.centerMax}>
        <Text style={{ textAlign: 'center', fontSize: 20, color: '#24344C', fontWeight: 'bold' }}>
          {title}
        </Text>
      </View>
      {title === 'Explore' ? (
        <View style={styles.center}>
          <View style={{ marginLeft: 65 }}>
            <MaterialIcons name="notifications-active" size={26} color="#A3B1B8" />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}></View>
      )}
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 30, // esta propiedad la utilizo para que se vea bien en el emulador
    height: 60,
    borderBottomColor: '#A3B1B8',
    borderBottomWidth: 0.5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  centerMax: {
    flex: 1.5,
    justifyContent: 'center',
  },
})
