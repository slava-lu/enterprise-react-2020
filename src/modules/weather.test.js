import { runSaga } from 'redux-saga'
import fetchMock from 'fetch-mock'

import store from '../redux/store'
import { GET_CURRENT_WEATHER_TRIGGER, getCurrentWeatherSaga } from './weather'

const serverResponse = {
  main: {
    temp: 6,
    pressure: 1017.58
  }
}

const storeSetup = () => {
  return store
}

describe('OA detail actions test', () => {
  let store
  beforeEach(() => {
    store = storeSetup()
  })
  afterEach(fetchMock.restore)

  test('fetching the weather info', async () => {
    fetchMock.get('*', serverResponse)

    await runSaga(store, getCurrentWeatherSaga, {
      type: GET_CURRENT_WEATHER_TRIGGER,
      cityCode: '2643743',
      history: { push: jest.fn() }
    }).toPromise()

    const newState = store.getState().weather
    expect(newState.currentWeather.main.temp).toBe(6)
  })
})
