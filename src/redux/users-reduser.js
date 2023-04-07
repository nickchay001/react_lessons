import { usersAPI } from "../api/api.js";
import { updateObjectInArray } from "../utils/object-helpers.js";

const FOLLOW = 'my-network/usersPage/FOLLOW';
const UNFOLLOW = 'my-network/usersPage/UNFOLLOW';
const SET_USERS = 'my-network/usersPage/SET_USERS';
const SET_CURRENT_PAGE = 'my-network/usersPage/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'my-network/usersPage/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'my-network/usersPage/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'my-network/usersPage/TOGGLE_IS_FOLLOWING_PROGRESS';



let initialState = {

    users: [],
    pageSize: 5,
    totalUsersCount: 1000,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            debugger
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            
            return { ...state, totalUsersCount: action.count }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });


export const requestUsers = (page, pageSize, totalCount) => async (dispatch) => {
    debugger
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));
    let data = await usersAPI.getUsers(page, pageSize, totalCount);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    setTotalUsersCount(data.totalCount)
}

const followUnfolowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId) => async (dispatch) => {
    followUnfolowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
}
export const unfollow = (userId) => async (dispatch) => {
    followUnfolowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
}

export default usersReducer;