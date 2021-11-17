import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import intervalToDuration from 'date-fns/intervalToDuration'
import axios from '../../utils/axios'
import { db } from '../../config/firebase'
import sendPushNotification from '../../utils/pushNotification'
import UserContext from '../../context/UserContext'
import firebase from 'firebase'

const Counter = ({
  id,
  endDate,
  screen,
  highBidMercadoPagoUserId,
  finished,
  highestBid,
  highBidUserToken,
  title,
}) => {
  const [counter, setCounter] = useState({
    months: '',
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  })

  const [expoToken, setExpoToken] = useState('')

  const { currentUser } = useContext(UserContext)

  const highestBidToNumber = highestBid?.slice(1).replace(/\./g, '')
  const highestBidToRealNumber = parseInt(highestBidToNumber)

  const updateProductForBid = async (finished) => {
    const userRef = await db.collection('products').doc(id)

    return userRef.update({ finished: finished })
  }

  const payment = async (payload) => {
    try {
      await axios.post('/v1/payments', payload)
      console.log('PERFECTOOOOO', 'GANO LA SUBASTA!!!!')
    } catch (error) {
      console.log('Esta entrando por aca', error)
    }
  }

  useEffect(() => {
    try {
      async function getExpoNotificationToken(currentUserId) {
        const token = await firebase
          .database()
          .ref()
          .child('users')
          .child(currentUserId)
          .get()
          .then((token) => {
            const { expoPushToken } = token.val()
            return expoPushToken
          })
          .catch((error) => {
            console.log('Esta imprimiendo por aca', error)
          })

        setExpoToken(() => token)
      }
      if (currentUser?.userId) {
        getExpoNotificationToken(currentUser?.userId)
      }
    } catch (error) {
      console.log('No hay auth user todavia')
    }
  }, [currentUser?.userId])

  useEffect(() => {
    const today = new Date()
    if (endDate.toDate() > today) {
      const timer = setInterval(() => {
        let interval
        const now = new Date()

        interval = intervalToDuration({
          start: now,
          end: endDate.toDate(),
        })
        const { months, days, hours, minutes, seconds } = interval

        setCounter({ months, days, hours, minutes, seconds })
      }, 1000)
      return () => clearInterval(timer)
    } else if (endDate.toDate() < today && finished === false) {
      payment({
        additional_info: {
          items: [
            {
              id: id,
              title: title,
              quantity: 1,
              unit_price: highestBidToRealNumber,
            },
          ],
          payer: {
            first_name: 'Test',
          },
        },
        description: 'Payment for product',
        installments: 1,
        order: {
          type: 'mercadopago',
          id: 1,
        },
        payer: {
          entity_type: 'individual',
          type: 'customer',
          id: highBidMercadoPagoUserId,
        },
        transaction_amount: highestBidToRealNumber,
        token: highBidUserToken,
      })
      updateProductForBid(true)
      sendPushNotification(expoToken)
    }
  }, [counter.seconds])

  return (
    <Text style={screen === 'products' ? styles.timerProducts : styles.timer}>
      {counter?.months
        ? `${counter.months}m ${counter.days}d ${counter.hours}h ${counter.minutes}m ${counter.seconds}s`
        : ` ${counter.days || 0}d ${counter.hours || 0}h ${counter.minutes || 0}m ${
            counter.seconds || 0
          }s`}
    </Text>
  )
}

export default Counter

const styles = StyleSheet.create({
  timer: {
    color: '#24344C',
    fontSize: 12,
    fontWeight: '700',
  },
  timerProducts: {
    color: '#24344C',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
})
