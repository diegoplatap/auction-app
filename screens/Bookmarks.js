import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import CustomHeader from '../components/CustomHeader'

const Bookmarks = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title={'Bookmarks'} />
      <View style={styles.content}>
        <Text>Bookmarks will appear here</Text>
        <Button
          title="Bookmarks"
          onPress={() => navigation.navigate('Product')}
          overlayContainerStyle={{ backgroundColor: 'white' }}
        />
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
