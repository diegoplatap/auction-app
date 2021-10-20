import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import LottieView from 'lottie-react-native'

const OnBoarding = ({ navigation }) => {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#fff',
          image: <LottieView source={require('../assets/images/onBoard1.json')} autoPlay loop />,
          title: 'Onboarding 1',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/adaptive-icon.png')} />,
          title: 'Onboarding 2',
          subtitle: 'Done with React Native Onboarding Swiper1',
        },
      ]}
    />
  )
}

export default OnBoarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
