import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: 'translations/locales/{{lng}}/{{ns}}.json'
    },
    lng: 'en',
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: true,
      useSuspense: false
    }
  })
