import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api.js";

const ADD_POST = 'my-network/profilePage/ADD-POST'
const SET_USER_PROFILE = 'my-network/profilePage/SET_USER_PROFILE';
const SET_STATUS = 'my-network/profilePage/SET_STATUS';
const DELETE_POST = 'my-network/profilePage/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'my-network/profilePage/SAVE_PHOTO_SUCCESS';



let initialState = {

    posts: [
        { id: 1, message: 'Hi, how are you', likesCount: 12 },
        { id: 2, message: 'Hi, i am fine', likesCount: 30 },
    ],
    profile: null,
    status: "",

}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
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
        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state, status: action.status
            };
        case DELETE_POST:
            return {
                ...state, posts: state.posts.filter(
                    p => p.id !== action.postId
                )
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state, profile: { ...state.profile, photos: action.photos }
            }
        default:
            return state;
    }

}

export const addPost = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos });


export const getUserProfile = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);
    debugger
    dispatch(setUserProfile(response.data));
}
export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}
export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(response.data));
    }
}
export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = 28375 // My userId = 28375
    //const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0]);
    }
}



export default profileReducer;