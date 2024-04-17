import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const deleteBlog = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll, 
  create, 
  deleteBlog
}