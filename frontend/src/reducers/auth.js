/* eslint-disable import/no-anonymous-default-export */
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
} from "../actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  expiresAt: localStorage.getItem("expiresAt"),
  isAuthenticated: localStorage.getItem("access") ? true : false,
  user: JSON.parse(localStorage.getItem("user")),
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.accessToken);
      localStorage.setItem("refresh", payload.refreshToken);
      localStorage.setItem("expiresAt", payload.expiresAt);
      return {
        ...state,
        isAuthenticated: true,
        expiresAt: payload.expiresAt,
        access: payload.accessToken,
        refresh: payload.refreshToken,
      };
    case USER_LOADED_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        user: payload,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      return {
        ...state,
        access: null,
        refresh: null,
        expiresAt: null,
        isAuthenticated: false,
        user: null,
      };
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
