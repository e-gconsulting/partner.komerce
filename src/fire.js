import * as firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCPYJYeP-9_G3S5MOV_-8QPDSmxF8dj84g',
  authDomain: 'komship-ticketing.firebaseapp.com',
  projectId: 'komship-ticketing',
  storageBucket: 'komship-ticketing.appspot.com',
  messagingSenderId: '669211426801',
  appId: '1:669211426801:web:55bca3d2dac7238b298e50',
}

console.log(firebase)

const fire = firebase.initializeApp(firebaseConfig)
export default fire
