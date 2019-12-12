import React from 'react'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'
import { withStyles, Button } from '@material-ui/core'
import Send from '@material-ui/icons/Send'

const styles = theme => ({
  container: {
    margin: theme.spacing(2)
  }
})

const SearchButton = props => {
  const { t, classes } = props
  return (
    <div className={classes.container}>
      <Button type='submit' variant='outlined' color='primary' startIcon={<Send />}>
        {t('get_weather')}
      </Button>
    </div>
  )
}

export default compose(withStyles(styles), withTranslation())(SearchButton)
