import React from 'react'
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import LottieView from 'lottie-react-native'

const OnBoarding = ({ navigation }) => {
  const Skip = ({ ...props }) => (
    <TouchableOpacity stlye={{ marginHorizontal: 8 }} {...props}>
      <Text stlye={{ fontSize: 16 }}>Skip</Text>
    </TouchableOpacity>
  )
  const Next = ({ ...props }) => (
    <TouchableOpacity stlye={{ marginHorizontal: 8 }} {...props}>
      <Text stlye={{ fontSize: 16 }}>Next</Text>
    </TouchableOpacity>
  )

  const Done = ({ ...props }) => (
    <TouchableOpacity stlye={{ marginHorizontal: 10 }} {...props}>
      <Text stlye={{ fontSize: 16 }}>Done</Text>
    </TouchableOpacity>
  )
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
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
          subtitle: 'Done with React Native Onboarding Swiper',
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
