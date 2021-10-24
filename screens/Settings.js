import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import CustomHeader from '../components/CustomHeader'

const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title={'Settings'} />
      <View style={styles.content}>
        <Text>This is the settings screen</Text>
        <Button
          title="SETTINGS"
          onPress={() => navigation.navigate('Product')}
          overlayContainerStyle={{ backgroundColor: 'white' }}
        />
      </View>
    </View>
  )
}

export default Settings
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
