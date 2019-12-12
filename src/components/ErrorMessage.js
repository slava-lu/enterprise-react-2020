import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import ErrorIcon from '@material-ui/icons/Error'
import CloseIcon from '@material-ui/icons/Close'
import { IconButton, Snackbar, SnackbarContent, withStyles } from '@material-ui/core'

import { clearErrorMessage } from '../modules/weather'

const styles = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
})

const ErrorMessage = props => {
  const { classes, isError, error, clearErrorMessage } = props
  const errorMessage = error.message || 'Something went wrong'
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      open={isError}
      autoHideDuration={6000}
      onClose={clearErrorMessage}>
      <SnackbarContent
        className={classes.error}
        message={
          <span className={classes.message}>
            <ErrorIcon className={classes.icon} />
            {errorMessage}
          </span>
        }
        action={[
          <IconButton key='close' color='inherit' onClick={clearErrorMessage}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
      />
    </Snackbar>
  )
}
const mapStateToProps = state => ({
  isError: state.weather.isError,
  error: state.weather.error
})

export default compose(connect(mapStateToProps, { clearErrorMessage }), withStyles(styles))(ErrorMessage)
