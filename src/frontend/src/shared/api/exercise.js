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

export async function saveExercise(exercise) {
  try {
    const result = await axios({
      url: 'api/v1/exercises/',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: exercise
    })
    return result
  } catch (error) {
    return error.response
  }
}

export async function updateExerciseById(id, exerciseData) {
  try {
    const result = await axios({
      url: `api/v1/exercises/${id}`,
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      data: exerciseData
    })
    return result
  } catch (error) {
    return error.response
  }
}

export async function deleteExerciseById(id) {
  try {
    const result = await axios({
      url: `api/v1/exercises/${id}`,
      method: 'delete'
    })
    return result
  } catch (error) {
    return error.response
  }
}
