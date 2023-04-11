import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api.js";

const SET_USER_DATA = 'my-network/auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'my-network/auth/GET_CAPTCHA_URL_SUCCESS'



let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,// if nul, then captcha is not requred
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
           
            return {
                ...action.payload,
            };
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...action.payload,
            };



        default:
            return {
                state
            }

    }
}

export const setAuthUserData = (userId, email, login, isAuth) =>

    ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })

export const getCaptchaUrlSuccess = (captchaUrl) =>
    ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })

export const getAuthUserData = () => async (dispatch) => {
    const response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        debugger
        dispatch(stopSubmit("login", { _error: message }));
    }
}
export const logout = () => async (dispatch) => {
    const response = await authAPI.logout();
    if (response.data.resultCode === 0) {
         debugger
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}


export default authReducer;