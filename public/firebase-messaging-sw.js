/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

try {
  const firebaseConfig = {
    apiKey: 'AIzaSyCPYJYeP-9_G3S5MOV_-8QPDSmxF8dj84g',
    authDomain: 'komship-ticketing.firebaseapp.com',
    projectId: 'komship-ticketing',
    storageBucket: 'komship-ticketing.appspot.com',
    messagingSenderId: '669211426801',
    appId: '1:669211426801:web:55bca3d2dac7238b298e50',
  }

  const app = firebase.initializeApp(firebaseConfig)
  console.log(firebase)

  const messaging = firebase.messaging(app)

  console.log('service worker', messaging)

  messaging.setBackgroundMessageHandler(payload => {
    console.log(payload)
    // const notification = JSON.parse(payload)
    // console.log('notification', notification)
    const notificationOption = {
      body: payload.data.message,
      icon: payload.data.username,
    }
    // eslint-disable-next-line no-restricted-globals
    return self.registration.showNotification(payload.data.username, notificationOption)
  })
} catch (err) {
  console.log('err', err)
}
