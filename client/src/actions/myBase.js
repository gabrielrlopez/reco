import api from "../utils/api";
import { setAlert } from "./alert";
import { UPDATE_PROFILE, PROFILE_ERROR } from "./types";

export const addBookToMyBase = (book) => async (dispatch) => {
  try {
    const res = await api.put("/base/myBooks", book);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Book added to your base!", "success", 3000));
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.message, "danger", 3000));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: error,
    });
  }
};

export const deleteBookFromMyBase = (book) => async (dispatch) => {
  try {
    const res = await api.put(`/base/myBooks/${book._id}`, book);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res,
    });
    dispatch(
      setAlert("Book successfully removed from your base", "success", 3000)
    );
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.message, "danger", 3000));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: error,
    });
  }
};
