const initialState = {
  user: {
    message: '',
    success: false
  },
  notification: {
    view: false,
    message: '',
    success: false
  },

}

const userReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'message':
      return {
        ...state,
        notification: action.payload,
      }
    case 'user':
      return {
        ...state,
        user: action.payload,
      }

    default:
      return state
  }
}
export default userReducer