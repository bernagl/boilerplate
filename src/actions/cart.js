export const setCheckout = props => dispatch => {
  dispatch({ type: 'SET_CART', payload: props })
}
