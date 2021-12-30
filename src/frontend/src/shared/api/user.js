import axios from 'axios'

export function getUserById (id) {
  return axios(`http://localhost:8080/api/v1/users/${id}`).then(
    (response) => {
      return response.data ? response.data : null
    }
  )
}

export function updateUserById (id, userData) {
  return axios(
    {
      url: `http://localhost:8080/api/v1/users/${id}`,
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      data: userData
    }
  ).then((response) => console.log(response))
}
