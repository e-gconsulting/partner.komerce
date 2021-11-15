import axios2 from 'axios'
import useJwt from '@/auth/jwt/useJwt'

const token = useJwt.getToken()

axios2.defaults.baseURL = 'https://komshipdev.komerce.id/api'
axios2.defaults.headers.common = {
  Authorization: `bearer ${token}`,
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
  'Access-Control-Allow-Origin': '*',
}

export default axios2
