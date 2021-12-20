import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url) => axios.get(url).then((res) => res.data)

export function useExercise (id = null) {
  const url = id
    ? `http://localhost:8080/api/v1/exercises/${id}`
    : 'http://localhost:8080/api/v1/exercises'
  const { data, error } = useSWR(url, fetcher)
  return {
    exerciseData: data,
    isLoading: !error && !data,
    isError: error
  }
}
