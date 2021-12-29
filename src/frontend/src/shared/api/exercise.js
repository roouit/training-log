import axios from 'axios'

export function getAllExercises () {
  return axios('http://localhost:8080/api/v1/exercises/').then((response) => {
    return response.data ? response.data : []
  })
}

export function getExerciseById (id) {
  return axios(`http://localhost:8080/api/v1/exercises/${id}`).then(
    (response) => {
      return response.data ? response.data : []
    }
  )
}
