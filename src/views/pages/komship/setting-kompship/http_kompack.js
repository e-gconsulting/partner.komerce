import httpKompack from 'axios'
import useJwt from '@/auth/jwt/useJwt'

const token = useJwt.getToken()
httpKompack.defaults.baseURL = 'https://kompackkomship.komerce.id'
httpKompack.defaults.headers.common = { Authorization: `bearer ${token}` }
export default httpKompack
