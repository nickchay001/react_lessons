import { getAuthUserData } from "./auth-reducer";


const INITIALIZED_SUCCESS = 'my-network/app/INITIALIZED_SUCCESS'


export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false,
}

//export type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state
    }
}
export type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS,
}

export const initializedSuccess = ():InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        })
}


export default appReducer
