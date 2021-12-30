import axios from 'axios'

export function getUserById (id) {
  return axios(`http://localhost:8080/api/v1/users/${id}`).then(
    (response) => {
      return response.data ? response.data : null
    }
  )
}
