import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as actions from "../api";

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onSuccess, onStart, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
      let token = await AsyncStorage.getItem("student_token");

      //Make API call
      const response = await axios.request({
        baseURL: "http://167.172.183.158",
        url: url, // /bugs
        method: method,
        data: data,

        headers: {
          Authorization: "Bearer " + token,
        },
      });

      //General
      dispatch(actions.apiCallSuccess(response.data));

      //Specific
      if (onSuccess) {
        dispatch({ type: onSuccess, payload: response.data });
      }
    } catch (error) {
      //General
      dispatch(actions.apiCallFailed(error.message));

      //Specific
      if (onError) {
        dispatch({ type: onError, payload: error.message });
      }
    }
  };

export default api;
