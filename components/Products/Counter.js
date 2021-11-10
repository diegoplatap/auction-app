import React, { useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import intervalToDuration from 'date-fns/intervalToDuration'
import { endOfDay } from 'date-fns'

const Counter = ({ endDate, screen }) => {
  const [counter, setCounter] = useState({
    months: '',
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  })

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
    }
  })

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
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
})
