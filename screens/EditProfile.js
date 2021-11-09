import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Animated from 'react-native-reanimated'
import BottomSheet from 'reanimated-bottom-sheet'
import { auth, db, storage } from '../config/firebase'
import firebase from 'firebase'
import * as ImagePicker from 'expo-image-picker'
import ProfileHeader from '../components/ProfilesHeader'
import UserContext from '../context/UserContext'

const EditProfile = ({ navigation }) => {
  const { currentUser, updateProfile, setCurrentUser } = useContext(UserContext)
  const [name, setName] = useState(currentUser?.displayName)
  const [address, setAddress] = useState(currentUser?.address)
  const [phone, setPhone] = useState(currentUser?.phoneNumber)
  const [imageUrl, setImageUrl] = useState(currentUser?.photoURL)
  const [error, setError] = useState('')
  const [url, setUrl] = useState('')

  const onClickUpdateProfile = async () => {
    try {
      await updateProfile({ name, phone, address, url })
      setCurrentUser((prevState) => ({
        ...prevState,
        photoURL: url,
      }))
      navigation.goBack()
      console.log('Document successfully updated!')
    } catch (error) {
      setError(error)
    }
  }

  const uploadImage = (uri) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.onerror = reject
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response)
        }
      }

      xhr.open('GET', uri)
      xhr.responseType = 'blob'
      xhr.send()
    })
  }

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert('Permisson denied')
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })

        if (!result.cancelled) {
          const imageUri = result.uri
          uploadImage(imageUri)
            .then((resolve) => {
              let ref = firebase
                .storage()
                .ref()
                .child(`imageProfile/${currentUser?.email}/updatedProfilePicture`)
              ref
                .put(resolve)
                .then(() => {
                  loadImage()
                  // console.log('Imagen subida correctamente')
                })
                .catch((error) => {
                  console.log('Error al subir la imagen')
                })
            })
            .catch((error) => {
              console.log(error)
            })
        }
      }
    }
  }

  const loadImage = async () => {
    storage
      .ref()
      .child(`imageProfile/${currentUser?.email}/updatedProfilePicture`)
      .getDownloadURL()
      .then((resolve) => {
        console.log('Resolve:', resolve)
        setUrl(resolve)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
    </View>
  )

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  )

  const bs = React.createRef()
  const fall = new Animated.Value(1)

  return (
    <View style={styles.container}>
      <ProfileHeader navigation={navigation} title={'Edit profile '} />
      <BottomSheet
        ref={bs}
        snapPoints={[250, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{ margin: 20, opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)) }}
      >
        <View style={{ alignItems: 'center', marginTop: 35 }}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                <View
                  style={{
                    height: 130,
                    width: 130,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ImageBackground
                    source={url ? { uri: url } : { uri: currentUser?.photoURL }}
                    style={{ height: 140, width: 140 }}
                    imageStyle={{ borderRadius: 70 }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <MaterialCommunityIcons
                        name="image-edit-outline"
                        size={35}
                        color="#fff"
                        style={{
                          opacity: 0.7,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderColor: '#fff',
                          borderRadius: 10,
                        }}
                      />
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 40, fontSize: 18, fontWeight: 'bold' }}>
            {currentUser?.displayName}
          </Text>
        </View>

        <View style={styles.action}>
          <MaterialIcons name="person" size={25} color="black" />
          <TextInput
            value={name}
            placeholder="Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={setName}
          />
        </View>
        <View style={styles.action}>
          <MaterialIcons name="phone" size={25} color="black" />
          <TextInput
            value={phone}
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={setPhone}
          />
        </View>
        <View style={styles.action}>
          <MaterialIcons name="location-pin" size={20} />
          <TextInput
            value={address}
            placeholder="Address"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={setAddress}
          />
        </View>
        <Text>{error}</Text>

        <TouchableOpacity style={styles.commandButton} onPress={() => onClickUpdateProfile()}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#114E85',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#114E85',
    alignItems: 'center',
    marginVertical: 4,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -3.5,
    paddingLeft: 10,
    color: '#05375a',
  },
})
