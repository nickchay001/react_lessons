import { Dispatch } from "react";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utils/object-helpers";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { usersAPI } from "../api/user-api";





let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 10000,
    currentPage: 5,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of users ids
}



const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'my-socialnetwork/users/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            }
        case 'my-socialnetwork/users/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }
        case 'my-socialnetwork/users/SET_USERS': {
            return { ...state, users: action.users }
        }
        case 'my-socialnetwork/users/SET_CURRENT_PAGE': {
            debugger
            return { ...state, currentPage: action.currentPage }
        }
        case 'my-socialnetwork/users/SET_TOTAL_USERS_COUNT': {
            return { ...state, totalUsersCount: action.count }
        }
        case 'my-socialnetwork/users/TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }
        case 'my-socialnetwork/users/TOGGLE_IS_FOLLOWING_PROGRESS': {
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






export const actions = {
    followSuccess: (userId: number) => ({ type: 'my-socialnetwork/users/FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'my-socialnetwork/users/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'my-socialnetwork/users/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'my-socialnetwork/users/SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (totalCount: number) => ({ type: 'my-socialnetwork/users/SET_TOTAL_USERS_COUNT', count: totalCount } as const),
    toggleIsFetching: (isFetching: boolean) =>
        ({ type: 'my-socialnetwork/users/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) =>
        ({ type: 'my-socialnetwork/users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const),
}

export const requestUsers = (page: number, pageSize: number): ThunkType =>
    async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        actions.setTotalUsersCount(data.totalCount)
    }

const _followUnfolowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number,
    apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfolowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
}
export const unfollow = (userId: number): ThunkType => async (dispatch: any) => {
    _followUnfolowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
}

export default usersReducer;

type ThunkType = BaseThunkType<ActionsTypes>
type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
