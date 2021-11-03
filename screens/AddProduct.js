import { LinearGradient } from 'expo-linear-gradient'
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import UserContext from '../context/UserContext'
import { windowHeight } from '../utils/Dimentions'
import { Picker } from '@react-native-community/picker'

const AddProduct = ({ route, navigation }) => {
  const { currentUser } = useContext(UserContext)
  const [product, setProduct] = useState({
    bidded: 0,
    category: '',
    condition: '',
    description: '',
    endDate: '',
    highestBid: '',
    photoURL: '',
    title: '',
    userName: currentUser?.displayName,
    userId: currentUser?.userId,
    userPhotoURL: currentUser?.photoURL,
  })

  // categories: "Technology", "Music", "Household appliances", "NTF'S"

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title={'Add products '} />
      <View>
        <Image
          source={{ uri: 'https://http2.mlstatic.com/D_NQ_NP_677988-MLA45993737435_052021-O.jpg' }}
          style={styles.image}
        />
      </View>
      <View style={styles.inputContainer}>
        <View>
          <TextInput
            // value={phone}
            placeholder="Title"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            // onChangeText={setPhone}
          />
        </View>
        <View>
          <TextInput
            // value={phone}
            placeholder="Description"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            // onChangeText={setPhone}
          />
        </View>
        <View>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
      </View>
      <View>
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={['#2977BA', '#195D99', '#114E85']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <TouchableOpacity>
              <Text style={styles.buttonText}>{`Add product`}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  )
}

export default AddProduct

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#24344C',
    marginLeft: 30,
  },
  avatarName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 32,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productInfo: {
    marginLeft: 30,
    marginTop: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userName: {
    paddingLeft: 10,
    color: '#63666A',
  },
  description: {
    marginLeft: 30,
    marginTop: 40,
    fontSize: 18,
    fontWeight: '700',
    color: '#24344C',
  },
  productDescription: {
    color: '#63666A',
    fontSize: 16,
  },
  highestBid: {
    marginRight: 25,
    alignItems: 'center',
  },
  highestBidValue: {
    color: '#24344C',
    paddingLeft: 10,
    fontWeight: '700',
  },
  image: {
    height: 200,
    width: 400,
    marginBottom: 20,
  },
  buttonContainer: {
    // marginBottom: 20,
    paddingHorizontal: 30,
  },
  button: {
    elevation: 8,
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 6,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    padding: 3,
  },
  inputContainer: {
    padding: 20,
  },
  textInput: {
    marginTop: 3,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 18,
    borderColor: '#ccc',
    borderRadius: 15,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 15,
  },
})
