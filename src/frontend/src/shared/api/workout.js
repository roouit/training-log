import axios from 'axios'

export function getWorkouts (offset, limit, ascending, olderThan, cutoffDate) {
  return axios(
    `http://localhost:8080/api/v1/users/1/workouts?offset=${offset}&limit=${limit}
    ${ascending ? '&asc=true' : ''}
    ${olderThan ? '&olderThan=true' : ''}
    ${cutoffDate ? `&date=${cutoffDate}` : ''}`
  ).then((response) => {
    return response.data ? response.data : []
  })
}

export function saveWorkout (workout) {
  return axios({
    url: 'http://localhost:8080/api/v1/users/1/workouts/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: workout
  }).then((response) => console.log(response))
}

export function deleteWorkoutById (workoutId) {
  return axios({
    url: `http://localhost:8080/api/v1/users/1/workouts/${workoutId}`,
    method: 'delete'
  }).then((response) => console.log(response))
}

export function updateWorkoutById(id, workoutData) {
  return axios({
    url: `http://localhost:8080/api/v1/users/1/workouts/${id}`,
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data: workoutData
  }).then((response) => console.log(response))
}
