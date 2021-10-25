import React, { useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Share } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MaterialIcons } from '@expo/vector-icons'
import { auth } from '../config/firebase'

const Profile = ({ navigation }) => {
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace('Landing')
    })
  }

  useEffect(() => {
    console.log(auth?.currentUser)
  }, [])

  const myCustomShare = async () => {
    try {
      const result = await Share.share({
        message: 'React Native | A framework for building native apps using React',
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL,
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {auth?.currentUser?.displayName}
            </Text>
            <Text style={styles.caption}>{auth?.currentUser?.email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#A3B1B8" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>
            {auth?.currentUser?.location || 'Update your address in settings'}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#A3B1B8" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>
            {auth?.currentUser?.phoneNumber
              ? auth?.currentUser?.phoneNumber
              : 'Update your phone in settings'}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#A3B1B8" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>{auth?.currentUser?.email}</Text>
        </View>
      </View>
      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: '#dddddd',
              borderRightWidth: 1,
            },
          ]}
        >
          <Text>5</Text>
          <Text>Auctions</Text>
        </View>
        <View style={styles.infoBox}>
          <Text>12</Text>
          <Text>Orders</Text>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialIcons name="favorite-outline" size={25} color="#2a7abf" />
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialIcons name="credit-card" size={25} color="#2a7abf" />
            <Text style={styles.menuItemText}>Payments</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={myCustomShare}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#2a7abf" size={25} />
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialIcons name="settings" size={25} color="#2a7abf" />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={signOutUser}>
          <View style={styles.menuItem}>
            <MaterialIcons name="logout" size={25} color="#2a7abf" />
            <Text style={styles.menuItemText}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    paddingTop: 40,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 65,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
})
