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

  const messaging = firebase.messaging(app)

  messaging.setBackgroundMessageHandler(payload => {
    const notificationOption = {
      body: 'You have a message',
      icon: 'Message',
    }
    // eslint-disable-next-line no-restricted-globals
    return self.registration.showNotification('Message', notificationOption)
  })
} catch (err) {
  console.log('err', err)
}
