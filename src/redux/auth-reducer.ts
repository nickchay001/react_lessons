import { FormAction, stopSubmit } from "redux-form";
import { ResultCodeEnum, ResultCodeForCaptchaEnum } from "../api/api";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,// if null, then captcha is not requred
}



const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        // case 'my-socialnetwork/auth/SET_USER_DATA':        
        case 'my-socialnetwork/auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}



export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
        ({ type: 'my-socialnetwork/auth/SET_USER_DATA', peyload: { userId, email, login, isAuth } } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) =>
        ({ type: 'my-socialnetwork/auth/GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl } } as const)
}
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const meData = await authAPI.me()
    if (meData.resultCode === ResultCodeEnum.Success) {
        let { id, login, email } = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkType => async (dispatch) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: message }))
    }
}
export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}
export const logout = ():ThunkType => async (dispatch) => {
    const response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}


export default authReducer;


export type InitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType | FormAction>