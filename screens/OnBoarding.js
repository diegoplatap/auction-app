import React from 'react'
import { StyleSheet } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import LottieView from 'lottie-react-native'

const OnBoarding = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.replace('Login')}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <LottieView
              source={require('../assets/images/onBoardnumber1.json')}
              style={{
                width: 250,
                height: 250,
              }}
              autoPlay
              loop
            />
          ),
          title: 'Welcome to HandSell',
          subtitle: `The first auction app in Colombia! 🚀`,
        },
        {
          backgroundColor: '#fff',
          image: (
            <LottieView
              source={require('../assets/images/onBoardnumber2.json')}
              style={{
                width: 250,
                height: 250,
              }}
              autoPlay
              loop
            />
          ),
          title: 'HandSell is a win-win App',
          subtitle: `Create and participate in auctions 
        of your interest 🤑 `,
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
