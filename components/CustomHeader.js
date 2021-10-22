import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const CustomHeader = ({ navigation, title, screen }) => {
  const openProfile = () => navigation.navigate('Login')
  const closeSignup = () => navigation.navigate('Landing')

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={{ marginLeft: 15 }}>
          {title === 'Explore' || title === 'Add a product!' ? (
            <MaterialCommunityIcons
              onPress={openProfile}
              name="account-circle"
              size={38}
              color="#A3B1B8"
            />
          ) : (
            <MaterialIcons onPress={closeSignup} name="close" size={30} color="#24344C" />
          )}
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
