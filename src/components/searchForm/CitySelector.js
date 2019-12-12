import React from 'react'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'
import { Select, MenuItem, withStyles } from '@material-ui/core'

import { cities } from '../../config/cities'

const styles = theme => ({
  container: {
    width: 120
  }
})

const CitySelector = ({ field, form, ...props }) => {
  const { t, classes } = props
  const renderItem = Object.entries(cities).map(([code, name]) => (
    <MenuItem key={code} value={code}>
      {t(name)}
    </MenuItem>
  ))

  return (
    <Select className={classes.container} {...field}>
      {renderItem}
    </Select>
  )
}

export default compose(withStyles(styles), withTranslation())(CitySelector)
