import { LinearGradient } from 'expo-linear-gradient'
import React, { useContext, useEffect } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import UserContext from '../context/UserContext'

const Settings = ({ navigation }) => {
  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    if (!currentUser) {
      navigation.navigate('Login')
    }
  }, [])

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title={'Settings'} />
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={['#2977BA', '#195D99', '#114E85']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <TouchableOpacity>
              <Text style={styles.buttonText}>Reset password</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={['#ea4c46', '#ea4c46', '#dc1c13']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <TouchableOpacity>
              <Text style={styles.buttonText}>{`Delete account  `}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  )
}

export default Settings
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 110,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    padding: 3,
  },
})
