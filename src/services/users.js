/* eslint-disable no-unused-vars */
import axios from 'axios'
import { users } from '../mockData/users'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const setConfig = token => {
  return {
    headers: { Authorization: token }
  }
}

const getAll = async () => {
  // const config = setConfig(token)

  // const response = await axios.get(baseUrl, config)
  // return response.data
  return users
}

const getOne = async (id) => {
  // const config = setConfig(token)

  // const response = await axios.get(`${baseUrl}/${id}`, config)
  // return response.data
  return users.filter(user => user.id === id)[0]
}

export default { getAll, getOne, setToken }
