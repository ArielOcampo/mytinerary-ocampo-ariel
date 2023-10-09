import axios from "axios";

let urlHost = "https://darwin-goanna-skdq.2.sg-1.fl0.io";
// let urlHost = 'http://localhost:4000/'
const citiesActions = {
  getCities: () => {
    return async (dispatch, getState) => {
      const res = await axios.get(urlHost + `/api/cities`);
      dispatch({ type: "GET_CITIES", payload: res.data.response.cities });
    };
  },
  getOneCity: (id) => {
    return async (dispatch, getState) => {
      const res = await axios.get(`${urlHost}/api/cities/${id}`);
      dispatch({ type: "GET_ONE_CITY", payload: res.data.response });
    };
  },
  filterCities: (input) => {
    return (dispatch, getState) => {
      dispatch({ type: "FILTER_CITIES", payload: input });
    };
  },
};

export default citiesActions;
