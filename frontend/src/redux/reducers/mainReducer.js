import { combineReducers } from 'redux';
import citiesReducer from '../reducers/citiesReducer';
import itinerariesReducer from '../reducers/itinerariesReducer'

const mainReducer = combineReducers({
  citiesReducer,
  itinerariesReducer
})

export default mainReducer