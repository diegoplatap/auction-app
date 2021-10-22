import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import LottieView from 'lottie-react-native'

const OnBoarding = ({ navigation }) => {
  // const Done = ({ ...props }) => <Text stlye={{ marginRight: 16, color: 'red' }}>Done</Text>
  return (
    <Onboarding
      // DoneButtonComponent={Done}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.replace('Login')}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <LottieView
              source={require('../assets/images/onBoard1.json')}
              style={{
                width: 300,
                height: 300,
              }}
              autoPlay
              loop
            />
          ),
          title: 'Welcome to xxx',
          subtitle: 'Done with React Native Onboarding Swiper!',
        },
        {
          backgroundColor: '#fff',
          image: (
            <LottieView
              source={require('../assets/images/onBoard2.json')}
              style={{
                width: 300,
                height: 300,
              }}
              autoPlay
              loop
            />
          ),
          title: 'Onboarding 2',
          subtitle: 'Done with React Native Onboarding Swiper12',
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
  text: {
    marginRight: 10,
    fontSize: 16,
  },
})
