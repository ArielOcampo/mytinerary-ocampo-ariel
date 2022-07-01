import axios from 'axios'

const userActions = {

  signUpUsers: (userData) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.post('http://localhost:4000/api/signUp', { userData })
        console.log(res)
        dispatch({
          type: 'message',
          payload: {
            view: true,
            message: res.data.message,
            success: res.data.success
          }
        })
        return res
      } catch (error) {
        console.log(error);
      }
    }
  },

  loginUsers: (logedUser) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.post('http://localhost:4000/api/login', { logedUser })
        console.log(res)
        dispatch({
          type: 'user',
          payload: {
            message: res.data.message,
            success: res.data.success
          }
        })
        return res
      } catch (error) {
        console.log(error);
      }

    }
  }
}

export default userActions