import axios from 'axios'

export function getUserById (id) {
  return axios(`api/v1/users/${id}`).then(
    (response) => {
      return response.data ? response.data : null
    }
  )
}

export function updateUserById (id, userData) {
  return axios(
    {
      url: `api/v1/users/${id}`,
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      data: userData
    }
  ).then((response) => console.log(response))
}
