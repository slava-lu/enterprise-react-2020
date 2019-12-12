import React, { Suspense, lazy } from 'react'
import { Route } from 'react-router-dom'
import { withStyles, Paper } from '@material-ui/core'

import Header from './Header'
import ErrorMessage from './ErrorMessage'
import LoadingIndicatorForRouteChanges from './helpers/LoadingIndicatorForRouteChanges'

const CurrentWeather = lazy(() => import(/* webpackPrefetch: true */ './CurrentWeather'))
const SearchFormContainer = lazy(() => import('./searchForm/SearchFormContainer'))

const styles = theme => ({
  container: {
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(6),
    backgroundColor: theme.palette.background.paper,
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily
  },
  headerContainer: {
    height: 100
  },
  contentContainer: {
    padding: theme.spacing(2),
    minHeight: 120
  }
})

const App = props => {
  const { classes } = props
  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <Header />
      </div>
      <Paper className={classes.contentContainer}>
        <Suspense fallback={<LoadingIndicatorForRouteChanges />}>
          <Route exact path='/' component={SearchFormContainer} />
          <Route path='/current' component={CurrentWeather} />
        </Suspense>
      </Paper>
      <ErrorMessage />
    </div>
  )
}

export default withStyles(styles)(App)
