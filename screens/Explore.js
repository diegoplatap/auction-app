import React from 'react'
import { Text, StyleSheet, View, SafeAreaView, Button } from 'react-native'
import CustomHeader from '../components/CustomHeader'

const Explore = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title={'Explore'} />
      <View style={styles.content}>
        <Text>This is the home screen</Text>
        <Button
          title="Go to product page"
          onPress={() => navigation.navigate('Product')}
          overlayContainerStyle={{ backgroundColor: 'white' }}
        />
      </View>
    </View>
  )
}

export default Explore

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
