import { all, call, put, takeLatest, cancelled, cancel } from 'redux-saga/effects'

import { getCurrentWeatherApi } from '../api/weatherApi'

const moduleName = 'weather'

export const GET_CURRENT_WEATHER_TRIGGER = `${moduleName}/GET_CURRENT_WEATHER_TRIGGER`
const GET_CURRENT_WEATHER_REQUEST = `${moduleName}/GET_CURRENT_WEATHER_REQUEST`
const GET_CURRENT_WEATHER_SUCCESS = `${moduleName}/GET_CURRENT_WEATHER_SUCCESS`
const GET_CURRENT_WEATHER_FAILURE = `${moduleName}/GET_CURRENT_WEATHER_FAILURE`

const CLEAR_ERROR_MESSAGE = `${moduleName}/CLEAR_ERROR_MESSAGE`

const initialState = {
  loading: false,
  loaded: false,
  cityCode: '',
  currentWeather: {},
  isError: false,
  error: {}
}

export const clearErrorMessage = () => ({
  type: CLEAR_ERROR_MESSAGE
})

export const requestCurrentWeather = (cityCode, history) => ({
  type: GET_CURRENT_WEATHER_TRIGGER,
  cityCode,
  history
})

export default function reducer(state = initialState, { type, cityCode, currentWeather = {}, error = {} }) {
  switch (type) {
    case GET_CURRENT_WEATHER_REQUEST:
      return { ...state, cityCode, currentWeather, isError: false, loading: true, loaded: false }
    case GET_CURRENT_WEATHER_SUCCESS:
      return { ...state, currentWeather, loading: false, error, loaded: true }
    case GET_CURRENT_WEATHER_FAILURE:
      return { ...state, isError: true, error, loading: false }

    case CLEAR_ERROR_MESSAGE:
      return { ...state, isError: false }

    default:
      return state
  }
}

export const getCurrentWeatherSaga = function*(action) {
  const abortController = new AbortController()
  const { signal } = abortController
  const { cityCode, history } = action
  yield put({ type: GET_CURRENT_WEATHER_REQUEST, cityCode })
  try {
    const result = yield call(getCurrentWeatherApi, { cityCode, signal })
    if (result && result.response.ok) {
      const currentWeather = result.data
      yield put({ type: GET_CURRENT_WEATHER_SUCCESS, currentWeather })
      yield call(history.push, '/current')
    } else {
      const { error } = result
      yield put({ type: GET_CURRENT_WEATHER_FAILURE, error })
      yield cancel()
    }
  } catch (error) {
    yield put({ type: GET_CURRENT_WEATHER_FAILURE, error })
  } finally {
    if (yield cancelled()) {
      abortController.abort()
    }
  }
}

export const weatherSagas = function*() {
  yield all([takeLatest(GET_CURRENT_WEATHER_TRIGGER, getCurrentWeatherSaga)])
}
