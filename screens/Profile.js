import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Share } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { auth, db } from '../config/firebase'
import UserContext from '../context/UserContext'

const Profile = ({ navigation }) => {
  const { signOutUser, currentUser } = useContext(UserContext)

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
      <View style={styles.mainUserInfoSection}>
        <View style={styles.avatarAndInfo}>
          <Avatar
            rounded
            source={{
              uri:
                currentUser?.photoURL ||
                'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
            }}
            size={80}
          />

          <View style={{ marginLeft: 20, marginRight: 20 }}>
            <Text
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {currentUser?.displayName}
            </Text>
            <Text style={styles.caption}>{currentUser?.email}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
          }}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <MaterialCommunityIcons name="account-edit-outline" size={24} color="#24344C" />
          <Text style={{ fontSize: 12, marginRight: 3, color: '#24344C' }}>edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#A3B1B8" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>
            {currentUser?.address || 'Update your address'}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#A3B1B8" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>
            {currentUser?.phoneNumber || 'Update your phone'}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#A3B1B8" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>{currentUser?.email}</Text>
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
          <Text>My Auctions</Text>
        </View>
        <View style={styles.infoBox}>
          <Text>{/*currentUser.auctionsWon*/}14</Text>
          <Text>Auctions I won</Text>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialIcons name="favorite-outline" size={25} color="#2a7abf" />
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
          <View style={styles.menuItem}>
            <MaterialIcons name="credit-card" size={25} color="#2a7abf" />
            <Text style={styles.menuItemText}>Wallet</Text>
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
        <TouchableOpacity onPress={() => signOutUser(navigation)}>
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
  mainUserInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarAndInfo: {
    flexDirection: 'row',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#24344C',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    color: '#24344C',
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
