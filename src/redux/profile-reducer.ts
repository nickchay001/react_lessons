import { FormAction, stopSubmit } from "redux-form";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { profileAPI } from "../api/profile-api";

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you', likesCount: 12 },
        { id: 2, message: 'Hi, i am fine', likesCount: 30 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
}

const profileReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'my-socialnetwork/profile/ADD_POST':
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        case 'my-socialnetwork/profile/SET_USER_PROFILE':
            return {
                ...state, profile: action.profile
            };
        case 'my-socialnetwork/profile/SET_STATUS':
            return {
                ...state, status: action.status
            };
        case 'my-socialnetwork/profile/DELETE_POST':
            return {
                ...state, posts: state.posts.filter(
                    p => p.id !== action.postId
                )
            }
        case 'my-socialnetwork/profile/SAVE_PHOTO_SUCCESS':
            return {
                ...state, profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        default:
            return state;
    }

}

export const actions = {
    addPost: (newPostText: string) => ({ type: 'my-socialnetwork/profile/ADD_POST', newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'my-socialnetwork/profile/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'my-socialnetwork/profile/SET_STATUS', status } as const),
    deletePost: (postId: number) => ({ type: 'my-socialnetwork/profile/DELETE_POST', postId } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: 'my-socialnetwork/profile/SAVE_PHOTO_SUCCESS', photos } as const),
}


export const addPost = (newPostText: string): ThunkType => async (dispatch) => {
    dispatch(actions.addPost(newPostText));
}
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    } catch (error) {
    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    //const userId = 28375 // My userId = 28375
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can`t be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }))
        return Promise.reject(data.messages[0])
    }
}



export default profileReducer;


export type InitialStateType = typeof initialState
type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType | FormAction>
