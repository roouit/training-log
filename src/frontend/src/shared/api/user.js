import axios from 'axios'

export function getUserById (id) {
  return axios(`api/v1/users/${id}`).then(
    (response) => {
      return response.data ? response.data : null
    }
  )
}

export async function updateUserById (id, userData) {
  try {
    const result = await axios({
      url: `api/v1/users/${id}`,
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      data: userData
    })
    return result
  } catch (error) {
    return error.response
  }
}
