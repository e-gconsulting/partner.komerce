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

  let url = ''

  messaging.onBackgroundMessage(payload => {
    console.log('payload', payload)
    this.url = payload.data.url_path
    const notificationOption = {
      body: payload.data.message,
      icon: payload.data.profile_image,
      actions: [{ action: payload.data.url_path, title: 'Baca Sekarang' }],
      click_action: payload.data.url_path,
    }
    // eslint-disable-next-line no-restricted-globals
    return self.registration.showNotification(payload.data.title, notificationOption)
  })
  // eslint-disable-next-line no-restricted-globals
  self.addEventListener('notificationclick', event => {
    event.waitUntil(async function () {
      const allClients = await clients.matchAll({
        includeUncontrolled: true,
      })
      let chatClient
      const appUrl = this.url
      // eslint-disable-next-line no-restricted-syntax
      for (const client of allClients) {
        // here appUrl is the application url, we are checking it application tab is open
        if (client.url.indexOf(appUrl) >= 0) {
          client.focus()
          chatClient = client
          break
        }
      }
      if (!chatClient) {
        chatClient = await clients.openWindow(appUrl)
      }
    }())
  })
} catch (err) {
  console.log('err', err)
}
