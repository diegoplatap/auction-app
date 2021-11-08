import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const AddPaymentsHeader = ({ navigation, title }) => {
  const goBack = () => {
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={{ marginLeft: 15 }}>
          <MaterialIcons name="arrow-back" size={24} color="#24344C" onPress={goBack} />
        </View>
      </View>
      <View style={styles.centerMax}>
        <Text style={{ textAlign: 'center', fontSize: 20, color: '#24344C', fontWeight: 'bold' }}>
          {title}
        </Text>
      </View>
      {title === 'Explore' ? (
        <View style={styles.center}>
          <View style={{ marginLeft: 65 }}>
            <MaterialIcons name="notifications-active" size={26} color="#A3B1B8" />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}></View>
      )}
    </View>
  )
}

export default AddPaymentsHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 30, // esta propiedad la utilizo para que se vea bien en el emulador
    height: 60,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  centerMax: {
    flex: 1.5,
    justifyContent: 'center',
  },
  timer: {
    color: '#24344C',
    fontSize: 12,
    fontWeight: '700',
  },
})
