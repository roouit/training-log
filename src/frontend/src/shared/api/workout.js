import axios from 'axios'

export function getWorkouts (offset, limit, ascending, olderThan, cutoffDate) {
  return axios(
    `api/v1/users/2/workouts?offset=${offset}&limit=${limit}
    ${ascending ? '&asc=true' : ''}
    ${olderThan ? '&olderThan=true' : ''}
    ${cutoffDate ? `&date=${cutoffDate}` : ''}`
  ).then((response) => {
    return response.data ? response.data : []
  })
}

export async function saveWorkout (workout) {
  try {
    const result = await axios({
      url: 'api/v1/users/2/workouts/',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: workout
    })
    return result
  } catch (error) {
    return error.response
  }
}

export async function deleteWorkoutById (workoutId) {
  try {
    const result = await axios({
      url: `api/v1/users/2/workouts/${workoutId}`,
      method: 'delete'
    })
    return result
  } catch (error) {
    return error.response
  }
}

export function updateWorkoutById(id, workoutData) {
  return axios({
    url: `api/v1/users/2/workouts/${id}`,
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data: workoutData
  }).then((response) => console.log(response))
}
