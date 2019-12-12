import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import ArrowBack from '@material-ui/icons/ArrowBack'
import {
  withStyles,
  AppBar,
  Toolbar,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  IconButton
} from '@material-ui/core'

import { setLanguage } from '../modules/common'

const styles = theme => ({
  title: {
    marginLeft: theme.spacing(1)
  },
  langSelector: {
    marginLeft: 'auto',
    marginRight: 30
  },
  radioButtons: {
    display: 'flex',
    flexDirection: 'row'
  }
})

const Header = props => {
  const handleChange = event => {
    const { i18n, setLanguage } = props
    const language = event.target.value
    setLanguage(language)
    i18n.changeLanguage(language)
  }
  const { t, classes, history, location, language } = props
  const disabled = location.pathname === '/'
  return (
    <AppBar position='static' color='default'>
      <Toolbar>
        <IconButton disabled={disabled} onClick={() => history.goBack()}>
          <ArrowBack />
        </IconButton>
        <div className={classes.title}>{t('app_title')}</div>
        <FormControl component='fieldset' className={classes.langSelector}>
          <RadioGroup name='language' className={classes.radioButtons} value={language} onChange={handleChange}>
            <FormControlLabel value='en' control={<Radio color='primary' />} label='EN' />
            <FormControlLabel value='de' control={<Radio color='primary' />} label='DE' />
          </RadioGroup>
        </FormControl>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = ({ common }) => ({
  language: common.language
})

export default compose(
  withRouter,
  connect(mapStateToProps, { setLanguage }),
  withStyles(styles),
  withTranslation()
)(Header)
