import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomHeader from '../components/CustomHeader'

const SignUp = ({ navigation }) => {
  return (
    <View>
      <CustomHeader navigation={navigation} title={'Please Sign Up'} />
      <Text>SIGN UP</Text>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({})
