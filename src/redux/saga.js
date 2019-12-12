import { all } from 'redux-saga/effects'

import { weatherSagas } from '../modules/weather'

const rootSaga = function*() {
  yield all([weatherSagas()])
}

export default rootSaga
