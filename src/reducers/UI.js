import { createAction, handleActions } from 'redux-actions'

const initialState = {
  popup: { type: '', isToggled: false, message: null }
}

export const TOGGLE_POPUP = 'TOGGLE_POPUP'

export const togglePopup = createAction(TOGGLE_POPUP)

export default handleActions({
  TOGGLE_POPUP: (state, { payload: { type, isToggled, message } }) => ({
    ...state,
    popup: { type, isToggled, message }
  })
}, initialState)
