import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { AppStateType, InferActionsTypes } from "./redux-store";
import { ThunkAction } from "redux-thunk";

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you', likesCount: 12 },
        { id: 2, message: 'Hi, i am fine', likesCount: 30 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST':
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost]
            };
        case 'SET_USER_PROFILE':
            return {
                ...state, profile: action.profile
            };
        case 'SET_STATUS':
            return {
                ...state, status: action.status
            };
        case 'DELETE_POST':
            return {
                ...state, posts: state.posts.filter(
                    p => p.id !== action.postId
                )
            }
        case 'SAVE_PHOTO_SUCCESS':
            return {
                ...state, profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        default:
            return state;
    }

}



type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    addPost: (newPostText: string) => ({ type: 'ADD_POST', newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
    deletePost: (postId: number) => ({ type: 'DELETE_POST', postId } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: 'SAVE_PHOTO_SUCCESS', photos } as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const addPost = (newPostText:string):ThunkType => async (dispatch: any) => {
    dispatch(actions.addPost(newPostText));
} 

export const getUserProfile = (userId: number):ThunkType => async (dispatch: any) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(response.data));
}
export const getStatus = (userId: number):ThunkType => async (dispatch: any) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(response.data));
}
export const updateStatus = (status: string):ThunkType => async (dispatch: any) => {
    try {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(actions.setStatus(response.data));
        }
    } catch (error) {
        debugger
    }
}
export const savePhoto = (file: any):ThunkType => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile: ProfileType):ThunkType => async (dispatch: any, getState: any) => {
    //const userId = 28375 // My userId = 28375
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0]);
    }
}



export default profileReducer;