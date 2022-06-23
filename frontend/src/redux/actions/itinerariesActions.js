import axios from 'axios'

const itinerariesActions = {
  getItineraries: () => {
    return async (dispatch, getState) => {
      const res = await axios.get('http://localhost:4000/api/itineraries')
      console.log(res)
      dispatch({ type: 'GET_ITINERARIES', payload: res.data.response.itineraries })
    }
  },
  getItinerary: (id) => {
    return async (dispatch, getState) => {
      const res = await axios.get(`http://localhost:4000/api/itineraries/${id}`)
      dispatch({ type: 'GET_ITINERARY', payload: res.data.response })
    }
  },
  getItinerariesById: (id) => {
    return async (dispatch, getState) => {
      const res = await axios.get(`http://localhost:4000/api/itinerariesbycity/${id}`)
      console.log(res)
      dispatch({ type: 'GET_ITINERARIES_BY_ID', payload: res.data.response })
    }
  }
}

export default itinerariesActions