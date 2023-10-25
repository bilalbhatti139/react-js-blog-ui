/* eslint-disable no-unused-vars */
import axios from 'axios'
import { blogs, newComment } from '../mockData/blogs'
const baseUrl = '/api/blogs'

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
  // const response = await axios.get(baseUrl)
  // return response.data
  return blogs
}

const getOne = async (id) => {
  // const response = await axios.get(`${baseUrl}/${id}`)
  // return response.data
  return blogs.filter(blog => blog.id === id)[0]
}

const create = async newObject => {
  // const config = setConfig(token)

  // const response = await axios.post(baseUrl, newObject, config)
  // return response.data
  return blogs[blogs.length - 1]
}

const replace = async (updatedObject) => {
  // const config = setConfig(token)

  // const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject, config)
  // return response.data
  return blogs.filter(blog => blog.id === updatedObject.id)[0]
}

const remove = async (id) => {
  // const config = setConfig(token)

  // await axios.delete(`${baseUrl}/${id}`, config)
}

const createComment = async ({blogId, commentObject}) => {
  // const config = setConfig(token)

  // const response = await axios.post(`${baseUrl}/${blogId}/comments`, commentObject, config)
  // return response.data
  return newComment
}

export default { getAll, getOne, create, replace, remove, createComment, setToken }
