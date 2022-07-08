import axios from 'axios'

const itinerariesActions = {
  getItineraries: () => {
    return async (dispatch, getState) => {
      const res = await axios.get('http://localhost:4000/api/itineraries')

      dispatch({ type: 'GET_ITINERARIES', payload: res.data.response.itineraries })
      return res
    }

  },
  getItinerary: (id) => {
    return async (dispatch, getState) => {
      const res = await axios.get(`http://localhost:4000/api/itineraries/${id}`)
      dispatch({ type: 'GET_ITINERARY', payload: res.data.response })
      return res
    }

  },
  getItinerariesById: (id) => {
    return async (dispatch, getState) => {
      const res = await axios.get(`http://localhost:4000/api/itinerariesbycity/${id}`)

      dispatch({ type: 'GET_ITINERARIES_BY_ID', payload: res.data.response })
    }
  },
  likeDislike: (id) => {
    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {
      try {
        const res = await axios.put(`http://localhost:4000/api/itineraries/like/${id}`, {}, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        console.log(res)
        return res

      } catch (err) {
        console.error(err);
      }
    }
  }
}

export default itinerariesActions