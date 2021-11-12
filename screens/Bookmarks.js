import React, { useContext, useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import UserContext from '../context/UserContext'
const Bookmarks = ({ navigation }) => {
  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    if (!currentUser) {
      navigation.navigate('Login')
    }
  }, [])

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title={'Bookmarks'} />
      <View style={styles.content}>
        <Text>Bookmarks will appear here</Text>
      </View>
    </View>
  )
}

export default Bookmarks
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
