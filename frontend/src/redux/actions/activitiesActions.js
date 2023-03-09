import axios from "axios";

let urlHost = "https://mytinerary-backend.up.railway.app/";
// let urlHost = 'http://localhost:4000/'

const activityActions = {
  getActivities: () => {
    return async (dispatch, getState) => {
      const res = await axios.get(urlHost + `api/activities`);
      dispatch({
        type: "GET_ACTIVITIES",
        payload: res.data.response.activities,
      });
    };
  },

  uploadActivity: (activities, itinerary) => {
    return async (dispatch, getState) => {
      const answer = await axios.post(urlHost + "api/activities", {
        activities,
        itinerary,
      });
      dispatch({
        type: "UPD_ACTIVITY",
        payload: answer.data.response.activities,
      });
    };
  },

  deleteAct: (id) => {
    return async (dispatch, getState) => {
      try {
        const answer = await axios.delete(urlHost + `api/activities/${id}`);
        dispatch({
          type: "DEL_ACTIVITY",
          payload: answer.data.response.activities,
        });
      } catch (err) {
        console.log(err);
      }
    };
  },

  oneActivity: (id) => {
    return async (dispatch, getState) => {
      try {
        const answer = await axios.get(urlHost + `api/activities/${id}`);
        dispatch({
          type: "ONE_ACTIVITY",
          payload: answer.data.response.activities,
        });
      } catch (err) {
        console.log(err);
      }
    };
  },

  findActFromTin: (id) => {
    return async () => {
      try {
        let answer = await axios.post(
          urlHost + `api/activitiesfromttineraries`,
          { id }
        );

        return {
          success: true,
          response: answer.data.response.activities,
        };
      } catch (error) {
        return {
          success: false,
          response: error.messagge,
        };
      }
    };
  },
};

export default activityActions;
