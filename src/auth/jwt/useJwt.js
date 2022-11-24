import useJwt from '@core/auth/jwt/useJwt'
import axios, { axiosAuthKompack } from '@axios'

const { jwt } = useJwt(axios, {})
export const { jwt: jwtKompackAuth } = useJwt(axiosAuthKompack, {})

export default jwt
