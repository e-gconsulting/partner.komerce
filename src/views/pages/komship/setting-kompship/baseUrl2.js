import axios2 from 'axios'
import useJwt from '@/auth/jwt/useJwt'

const token = useJwt.getToken()

axios2.defaults.baseURL = 'http://komshipdev.komerce.id/api'
axios2.defaults.headers.common = { Authorization: `bearer ${token}` }
export default axios2
