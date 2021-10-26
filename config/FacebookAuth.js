import firebase from 'firebase'

export function checkLoginState(response) {
  if (response.authResponse) {
    // User is signed-in Facebook.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe()
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(response.authResponse, firebaseUser)) {
        // Build Firebase credential with the Facebook auth token.
        console.log(reponse)
        var credential = firebase.auth.FacebookAuthProvider.credential(
          response.authResponse.accessToken
        )

        // Sign in with the credential from the Facebook user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message
            // The email of the user's account used.
            var email = error.email
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential
            // ...
          })
      } else {
        // User is already signed-in Firebase with the correct user.
      }
    })
  } else {
    // User is signed-out of Facebook.
    firebase.auth().signOut()
  }
}

export function isUserEqual(facebookAuthResponse, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
        providerData[i].uid === facebookAuthResponse.userID
      ) {
        // We don't need to re-auth the Firebase connection.
        return true
      }
    }
  }
  return false
}
