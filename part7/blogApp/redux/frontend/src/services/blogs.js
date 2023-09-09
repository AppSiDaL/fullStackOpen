import axios from 'axios'
const baseUrl = 'http://localhost:3005/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}
const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}
const modify = async ( newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config)
  return request.data
}
const remove = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return request.data
}

const comment = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const commentJSON={ comment:blog.comment }
  const request = await axios.post(`${baseUrl}/${blog.id}/comments`, commentJSON, config)
  return request.data
}

export default { getAll, setToken, create, modify, remove,comment }
