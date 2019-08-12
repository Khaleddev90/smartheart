import { call, put, select } from 'redux-saga/effects'
import { doSearchProducts } from 'utils/api'

import {
  PRODUCTS_SEARCH_SUCCESS,
  PRODUCTS_SEARCH_FAILURE
} from 'reducers/searchProducts'

const nextPageSelector = (state) => state.searchProducts.next;

export function* searchProducts({ payload: { query, nextPage } }) {
  try {
    const next = yield select(nextPageSelector);
    const { data } = yield call(doSearchProducts, query, !!(nextPage) && next);
    yield put({ type: PRODUCTS_SEARCH_SUCCESS, payload: {
      results: data.results,
      next: data.next,
      merge: !!(nextPage)
    }})
  } catch (error) {
    yield put({ type: PRODUCTS_SEARCH_FAILURE, payload: error })
  }
}