import axios from 'axios'
const baseUrl = 'http://localhost:3005/api/users'
const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}
const create = async (newUser) => {
  const request = await axios.post(baseUrl, newUser)
  return request.data
}
const modify = async ( newUser) => {
  const request = await axios.put(`${baseUrl}/${newUser.id}`,newUser)
  return request.data
}
const remove = async (User) => {
  const request = await axios.delete(`${baseUrl}/${User.id}`)
  return request.data
}

export default { getAll, create, modify, remove }
