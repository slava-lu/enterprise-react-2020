import { combineReducers } from 'redux'

import weather from '../modules/weather'
import common from '../modules/common'

const reducer = combineReducers({
  weather,
  common
})

export default reducer
