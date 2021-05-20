import Vue from 'vue'
import Geocoder from '@pderas/vue2-geocoder'

Vue.use(Geocoder, {
  defaultMode: 'lat-lng',
  googleMapsApiKey: process.env.VUE_APP_MAPS_API_KEY,
})
