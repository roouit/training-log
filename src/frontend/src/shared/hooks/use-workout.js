import React from 'react'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url) => axios.get(url).then((res) => res.data)

export function useWorkout () {
  const { data, error } = useSWR(
    `http://localhost:8080/api/v1/users/1/workouts?offset=0&limit=20`,
    fetcher
  )
  return {
    workoutData: data,
    isLoading: !error && !data,
    isError: error
  }
}
