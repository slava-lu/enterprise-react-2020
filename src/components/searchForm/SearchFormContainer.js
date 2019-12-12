import React from 'react'
import { Formik, Field, Form } from 'formik'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'
import { Grid, withStyles, FormControl, InputLabel } from '@material-ui/core'

import { requestCurrentWeather } from '../../modules/weather'
import SearchButton from './SearchButton'
import CitySelector from './CitySelector'
import LoadingIndicatorWithDelay from '../helpers/LoadingIndicatorWithDelay'

const styles = theme => ({
  formControl: {
    margin: theme.spacing(4)
  }
})

const SearchFormContainer = props => {
  const handleSubmit = ({ city }) => {
    const { requestCurrentWeather, history } = props
    requestCurrentWeather(city, history)
  }
  const { t, classes, loading } = props
  return (
    <Formik initialValues={{ city: '2643743' }} onSubmit={handleSubmit}>
      {props => (
        <Form>
          <Grid container spacing={3} alignItems='center'>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel>{t('city')}</InputLabel>
                <Field name='city' component={CitySelector} />
              </FormControl>
            </Grid>
            <Grid item>
              <SearchButton />
            </Grid>
          </Grid>
          {loading && <LoadingIndicatorWithDelay />}
        </Form>
      )}
    </Formik>
  )
}

const mapStateToProps = ({ weather }) => ({
  loading: weather.loading
})

export default compose(
  connect(mapStateToProps, { requestCurrentWeather }),
  withStyles(styles),
  withTranslation()
)(SearchFormContainer)

export { SearchFormContainer } // for testing
