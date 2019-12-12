import { makeRequest } from '../utils/fetchData'
import { WEATHER_API_KEY, CURRENT_WEATHER_URL } from '../config/consts'

export const getCurrentWeatherApi = ({ cityCode, signal }) => {
  const options = {
    baseUrl: CURRENT_WEATHER_URL,
    method: 'GET',
    signal,
    queryParams: { id: cityCode, units: 'metric', ...WEATHER_API_KEY }
  }
  return makeRequest(options)
}
