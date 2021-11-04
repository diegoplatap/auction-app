import React, { useState, useContext, useEffect } from 'react'
import firebase from 'firebase'
import { auth, db, storage } from '../config/firebase'
import UserContext from './UserContext'

const ProductsContext = React.createContext()

export function ProductsContextContextProvider({ children }) {
  const [products, setProducts] = useState(null)
  const { currentUser } = useContext(UserContext)

  const addProduct = async (
    title,
    category,
    bidded,
    condition,
    description,
    endDate,
    highestBid,
    userName,
    photoURL,
    userPhotoURL,
    userId
  ) => {
    await db.collection('products').doc(currentUser.userId).set({
      title: title,
      category: category,
      bidded: bidded,
      condition: condition,
      description: description,
      endDate: endDate,
      highestBid: highestBid,
      userName: userName,
      photoURL: photoURL,
      userPhotoURL: userPhotoURL,
      userId: userId,
    })
  }

  const loadProducts = async () => {
    try {
      await db.collection('products').onSnapshot((querySnapshot) => {
        const products = []
        querySnapshot.docs.forEach((doc) => {
          const {
            title,
            category,
            bidded,
            condition,
            description,
            endDate,
            highestBid,
            userName,
            photoURL,
            userPhotoURL,
            userId,
          } = doc.data()

          products.push({
            title,
            category,
            bidded,
            condition,
            description,
            endDate,
            highestBid,
            userName,
            photoURL,
            userPhotoURL,
            id: userId,
          })
        })
        setProducts(() => products)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [db])

  const value = {
    loadProducts,
    setProducts,
    products,
    addProduct,
  }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export default ProductsContext
