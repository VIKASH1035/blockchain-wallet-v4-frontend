import { select, takeEvery, put } from 'redux-saga/effects'
import * as AT from './actionTypes'
import * as S from './selectors'
import * as actions from '../../actions'
import { calculateStart, calculateScale } from 'services/ChartService'

export default ({ coreSagas }) => {
  const initialized = function * (action) {
    try {
      const { coin, time } = action.payload
      const currency = 'USD'
      const start = calculateStart(coin, time)
      const scale = calculateScale(coin, time)
      yield put(actions.core.data.misc.fetchPriceIndexSeries(coin, currency, start, scale))
    } catch (e) {
      // yield put(actions.alerts.displayError('Price index series chart could not be initialized.'))
    }
  }

  const coinClicked = function * (action) {
    try {
      const { coin } = action.payload
      const currency = 'USD'
      const time = yield select(S.getTime)
      const start = calculateStart(coin, time)
      const scale = calculateScale(coin, time)
      yield put(actions.core.data.misc.fetchPriceIndexSeries(coin, currency, start, scale))
    } catch (e) {
      // yield put(actions.alerts.displayError('Price index series chart could not be initialized.'))
    }
  }

  const timeClicked = function * (action) {
    try {
      const { time } = action.payload
      const currency = 'USD'
      const coin = yield select(S.getCoin)
      const start = calculateStart(coin, time)
      const scale = calculateScale(coin, time)
      yield put(actions.core.data.misc.fetchPriceIndexSeries(coin, currency, start, scale))
    } catch (e) {
      // yield put(actions.alerts.displayError('Price index series chart could not be initialized.'))
    }
  }

  return {
    initialized,
    coinClicked,
    timeClicked
  }
}
