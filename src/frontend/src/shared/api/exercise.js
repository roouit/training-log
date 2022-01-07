import axios from 'axios'

export function getAllExercises () {
  return axios('api/v1/exercises/').then((response) => {
    return response.data ? response.data : []
  })
}

export function getExerciseById (id) {
  return axios(`api/v1/exercises/${id}`).then(
    (response) => {
      return response.data ? response.data : []
    }
  )
}

export function saveExercise(exercise) {
  return axios({
    url: 'api/v1/exercises/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: exercise
  }).then((response) => console.log(response))
}

export function updateExerciseById(id, exerciseData) {
  return axios({
    url: `api/v1/exercises/${id}`,
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data: exerciseData
  }).then((response) => console.log(response))
}

export function deleteExerciseById(id) {
  return axios({
    url: `api/v1/exercises/${id}`,
    method: 'delete'
  }).then((response) => console.log(response))
}
