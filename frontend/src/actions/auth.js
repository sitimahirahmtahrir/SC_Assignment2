import axios from "axios";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  LOGOUT,
} from "./types";

const API_URL = "http://localhost:8000";

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${API_URL}/auth/users/me/`,
        config
      );

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const checkTokenExpiration = () => (dispatch) => {
  const expiresAt = localStorage.getItem("expiresAt");
  const currentTime = Math.floor(Date.now() / 1000);

  if (expiresAt && currentTime > expiresAt) {
    dispatch(logout());
  }
};

export const login = (email, password) => async (dispatch) => {
  const configg = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const username = "admin";

  const body = JSON.stringify({ email, username, password });

  try {
    const ress = await axios.post(
      `${API_URL}/auth/jwt/create/`,
      body,
      configg
    );

    const wt_decode = (token) => {
      let base64Url = token.split(".")[1];
      let base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    };

    const accessToken = ress.data.access;
    const refreshToken = ress.data.refresh;
    const decodedToken = wt_decode(ress.data.access);
    const expiresAt = decodedToken.exp;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { accessToken, refreshToken, expiresAt },
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${accessToken}`,
        Accept: "application/json",
      },
    };

    const res = await axios.get(
      `${API_URL}/auth/users/me/`,
      config
    );

    dispatch({
      type: USER_LOADED_SUCCESS,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    return err.response.data;
  }
};

export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `${API_URL}/auth/users/reset_password/`,
      body,
      config
    );

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
    });
  }
};

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      await axios.post(
        `${API_URL}/auth/users/reset_password_confirm/`,
        body,
        config
      );

      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
