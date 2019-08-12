import { createAction, handleActions } from 'redux-actions'

const initialState = {
  isProductPublished: false,
  error: null,
  productsTags: [],
};

export const PUBLISH_PRODUCT_REQUEST = 'PUBLISH_PRODUCT_REQUEST';
export const PUBLISH_PRODUCT_SUCCESS = 'PUBLISH_PRODUCT_SUCCESS';
export const PUBLISH_PRODUCT_FAILURE = 'PUBLISH_PRODUCT_FAILURE';

export const SET_PRODUCT_REQUEST = 'SET_PRODUCT_REQUEST';
export const SET_PRODUCT_SUCCESS = 'SET_PRODUCT_SUCCESS';
export const SET_PRODUCT_FAILURE = 'SET_PRODUCT_FAILURE';

export const MISSING_PRODUCT_REQUEST = 'MISSING_PRODUCT_REQUEST';
export const MISSING_PRODUCT_SUCCESS = 'MISSING_PRODUCT_SUCCESS';
export const MISSING_PRODUCT_FAILURE = 'MISSING_PRODUCT_FAILURE';

export const REMOVE_PRODUCT_REQUEST = 'REMOVE_PRODUCT_REQUEST';
export const REMOVE_PRODUCT_SUCCESS = 'REMOVE_PRODUCT_SUCCESS';
export const REMOVE_PRODUCT_FAILURE = 'REMOVE_PRODUCT_FAILURE';

export const FINISH_PUBLISH_PRODUCT = 'FINISH_PUBLISH_PRODUCT';
export const CLEAN_PRODUCTS = 'CLEAN_PRODUCTS';

export const publishProduct = createAction(PUBLISH_PRODUCT_REQUEST, data => data);
export const setProduct = createAction(SET_PRODUCT_REQUEST, data => data);
export const missingProduct = createAction(MISSING_PRODUCT_REQUEST, data => data);
export const removeProduct = createAction(REMOVE_PRODUCT_REQUEST, productId => productId);
export const cleanProducts = createAction(CLEAN_PRODUCTS);

export default handleActions({
  PUBLISH_PRODUCT_REQUEST: state => ({
    ...state,
    isProductPublished: false
  }),

  PUBLISH_PRODUCT_SUCCESS: state => ({
    ...state,
    isProductPublished: true
  }),

  PUBLISH_PRODUCT_FAILURE: (state, { payload: error }) => ({
    ...state,
    error
  }),

  SET_PRODUCT_SUCCESS: (state, { payload: data }) => {
    return {
      ...state,
      productsTags: state.productsTags.concat([data]),
    }
  },

  REMOVE_PRODUCT_SUCCESS: (state, { payload: productId }) => {
    return {
      ...state,
      productsTags: state.productsTags.filter((tag) => tag.id !== productId),
    }
  },

  CLEAN_PRODUCTS: state => initialState,
}, initialState)
