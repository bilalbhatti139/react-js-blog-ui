/* eslint-disable no-unused-vars */
import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  // const response = await axios.post(baseUrl, credentials)
  // return response.data
  return {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…AyM30.aq0FWQLb5xFhXHO59tz5Q45vq5fBz_sn2Ey7kiAZ2Zg', username: 'myusername', name: 'Emily L', id: '6491e8f6052b60013c04d56a'}
}

export default { login }
