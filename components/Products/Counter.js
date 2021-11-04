import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import intervalToDuration from 'date-fns/intervalToDuration'

const Counter = ({ endDate, styles }) => {
  const [counter, setCounter] = useState({
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  })

  useEffect(() => {
    const timer = setInterval(() => {
      let interval
      const now = new Date()
      interval = intervalToDuration({
        start: now,
        end: endDate.toDate(),
      })
      const { days, hours, minutes, seconds } = interval

      setCounter({ days, hours, minutes, seconds })
    }, 1000)
    return () => clearInterval(timer)
  })

  return (
    <Text
      style={styles.timer}
    >{`${counter.days}d ${counter.hours}h ${counter.minutes}m ${counter.seconds}s`}</Text>
  )
}

export default Counter
