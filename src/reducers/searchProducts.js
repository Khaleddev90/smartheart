import { createAction, handleActions } from 'redux-actions'

const initialState = {
  isSearched: false,
  next: '',
  productsFound: [],
  error: null,
};

export const PRODUCTS_SEARCH_REQUEST = 'PRODUCTS_SEARCH_REQUEST';
export const PRODUCTS_SEARCH_SUCCESS = 'PRODUCTS_SEARCH_SUCCESS';
export const PRODUCTS_SEARCH_FAILURE = 'PRODUCTS_SEARCH_FAILURE';
export const PRODUCTS_SEARCH_CLEAR = 'PRODUCTS_SEARCH_CLEAR';

export const productsSearch = createAction(PRODUCTS_SEARCH_REQUEST, (query, nextPage) => ({ query, nextPage }));
export const productsSearchClear = createAction(PRODUCTS_SEARCH_CLEAR);

export default handleActions({

  PRODUCTS_SEARCH_REQUEST: state => ({
    ...state,
    isSearched: true,
  }),

  PRODUCTS_SEARCH_SUCCESS: (state, { payload: { results, next, merge } }) => {
    return {
    ...state,
    next,
    isSearched: false,
    productsFound: (merge) ? [ ...state.productsFound, ...results ] : results,
  }},

  PRODUCTS_SEARCH_FAILURE: (state, { payload: error }) => ({
    ...state,
    isSearched: false,
    error
  }),

  PRODUCTS_SEARCH_CLEAR: state => ({
    ...initialState,
  }),
}, initialState)
