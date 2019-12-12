import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@material-ui/core'

import { LOADING_INDICATOR_DELAY } from '../../config/consts'

const LoadingIndicatorWithDelay = () => {
  const delay = LOADING_INDICATOR_DELAY

  const [showLoadingIndicator, setLoadingIndicatorVisibility] = useState(false)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoadingIndicatorVisibility(true)
    }, delay)
    return () => {
      clearTimeout(timerId)
    }
  }, [delay])

  if (showLoadingIndicator) {
    return <CircularProgress />
  }
  return null
}

export default LoadingIndicatorWithDelay
