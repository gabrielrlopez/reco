import api from "../utils/api";
import { setAlert } from "./alert";
import { createUpdateProfile, getCurrentProfile } from "./profile";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "./types";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/users/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const signUp = (
  userName,
  firstName,
  lastName,
  email,
  password,
  passwordConfirm
) => async (dispatch) => {
  try {
    const body = {
      userName,
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    };
    const res = await api.post("/users/signup", body);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(createUpdateProfile());
    dispatch(setAlert("Registration successful, welcome!", "success", 1500));
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.message, "danger", 3000));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const body = { email, password };
    const res = await api.post("/users/login", body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(getCurrentProfile());
    dispatch(setAlert("Log in successful", "success", 1500));
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.message, "danger", 3000));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  const res = await api.get("/users/logout");
  if (res.data.status === "success") window.location.reload();
  dispatch({
    type: { LOGOUT },
  });
};

export const updateUserInfo = (formData) => async (dispatch) => {
  try {
    const res = await api.patch("/users/updateMyAccount", formData);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

    dispatch(
      setAlert(
        "Your account information has been successfully updated!",
        "success",
        1500
      )
    );
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.message, "danger", 3000));
    }
  }
};

export const updatePassword = (
  currentPassword,
  newPassword,
  confirmPassword
) => async (dispatch) => {
  try {
    const data = {
      currentPassword,
      newPassword,
      confirmPassword,
    };

    const res = await api.post("/users/updateMyPassword", data);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

    dispatch(
      setAlert("Your password has been successfully updated!", "success", 1500)
    );
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.message, "danger", 3000));
    }
  }
};

export const resetPassword = (email) => async (dispatch) => {
  try {
    await api.post("/users/forgotPassword", { email });
    dispatch(
      setAlert(
        `A link to reset your password has been sent to ${email}`,
        "success",
        3000
      )
    );
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.message, "danger", 3000));
    }
  }
};
