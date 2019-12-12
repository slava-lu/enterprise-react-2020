import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'
import get from 'lodash/get'
import format from 'date-fns/format'
import deLocale from 'date-fns/locale/de'
import enLocale from 'date-fns/locale/en-US'

import { withStyles, Card, CardContent, CardHeader } from '@material-ui/core'

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    width: 440
  },
  header: {
    backgroundColor: '#F5F7F9'
  },
  title: {
    fontSize: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  content: {
    paddingTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

const CurrentWeather = props => {
  useEffect(() => {
    const {
      weather: { loaded },
      history
    } = props
    if (!loaded) {
      history.replace('/')
    }
  }, [props])

  const { t } = props
  const { classes } = props
  const {
    weather,
    common: { language }
  } = props
  const locale = language === 'de' ? deLocale : enLocale

  const temperature = get(weather, ['currentWeather', 'main', 'temp'], ' ')
  const humidity = get(weather, ['currentWeather', 'main', 'humidity'], ' ')
  const wind = get(weather, ['currentWeather', 'wind', 'speed'], ' ')
  const city = get(weather, ['currentWeather', 'name'], ' ')
  const country = get(weather, ['currentWeather', 'location', 'country'], ' ')
  const icon = get(weather, ['currentWeather', 'weather', '0', 'icon'], ' ')
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

  // since create-react-app 3.3.0 you can use optional chaining
  const lastUpdated = weather.currentWeather?.dt ?? ''

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardHeader
          className={classes.header}
          classes={{ title: classes.title }}
          title={`${city}, ${country}`}
          subheader={`${t('last_updated')}: ${format(lastUpdated * 1000, 'dd/MMM/yyyy HH:mm', { locale })}`}
          avatar={<img src={iconUrl} alt='icon' />}
        />
        <CardContent>
          <div className={classes.content}>
            <div>{`${t('temp')}: ${temperature} ${'\u2103'} `}</div>
            <div>{`${t('wind')} : ${wind} Kph `}</div>
            <div>{`${t('humidity')}: ${humidity} %`}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const mapStateToProps = ({ weather, common }) => ({ weather, common })

export default compose(connect(mapStateToProps), withStyles(styles), withTranslation())(CurrentWeather)
