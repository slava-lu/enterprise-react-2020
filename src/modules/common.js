const moduleName = 'common'

const CHANGE_LANGUAGE = `${moduleName}/CHANGE_LANGUAGE`

const initialState = {
  language: 'en'
}

export default function reducer(state = initialState, { type, language }) {
  switch (type) {
    case CHANGE_LANGUAGE:
      return { ...state, language }
    default:
      return state
  }
}

export const setLanguage = language => ({
  type: CHANGE_LANGUAGE,
  language
})
