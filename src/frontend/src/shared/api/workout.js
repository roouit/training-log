import axios from 'axios'

export function getWorkouts () {
  return axios(
    'http://localhost:8080/api/v1/users/2/workouts?offset=0&limit=20'
  ).then((response) => {
    return response.data ? response.data : [] 
  })
}

export function saveWorkout (workout) {
  return axios({
    url: 'http://localhost:8080/api/v1/users/2/workouts/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: workout
  }).then((response) => console.log(response))
}

export function deleteWorkoutById (workoutId) {
  return axios({
    url: `http://localhost:8080/api/v1/users/2/workouts/${workoutId}`,
    method: 'delete'
  }).then((response) => console.log(response))
}
