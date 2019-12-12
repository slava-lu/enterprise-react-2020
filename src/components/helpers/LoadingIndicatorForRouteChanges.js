import React from 'react'
import { withStyles } from '@material-ui/core'
import { compose } from 'redux'

import LoadingIndicatorWithDelay from './LoadingIndicatorWithDelay'

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
  }
})

const LoadingIndicatorForRouteChanges = props => {
  const { classes } = props
  return (
    <div className={classes.container}>
      <LoadingIndicatorWithDelay />
    </div>
  )
}

export default compose(withStyles(styles))(LoadingIndicatorForRouteChanges)
