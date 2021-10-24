import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import CustomHeader from '../components/CustomHeader'

const AddProduct = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title={'Add a product!'} />
      <View style={styles.content}>
        <Text>Add products screen</Text>
        <Button
          title="Add a product"
          onPress={() => navigation.navigate('Product')}
          overlayContainerStyle={{ backgroundColor: 'white' }}
        />
      </View>
    </View>
  )
}

export default AddProduct
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
