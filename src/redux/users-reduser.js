const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
let SET_USERS = 'SET_USERS';

let initialState = {
    users: [
        { id: 1, followed: false, fullName: 'Dmitro', status: 'I`m a boss', location: { city: 'Kiev', country: 'Ukraine' } },
        { id: 2, followed: true, fullName: 'Chishtof', status: 'Kurwa to ebana', location: { city: 'Warshawa', country: 'Poland' } },
        { id: 3, followed: true, fullName: 'Angela', status: 'I`m a pretty', location: { city: 'Ankara', country: 'Turkey' } },
        { id: 4, followed: false, fullName: 'Dedur', status: 'Sus', location: { city: 'Poligon', country: 'Ukraine' } },
    ],
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                }),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                }),
            }
        case SET_USERS:
            return {
                ...state, users: [...state.users, ...action.users]
            }
        default:
            return state;
    }

}

export const followAC = (userId) => ({ type: FOLLOW, userId })
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersAC = (users) => ({type: SET_USERS, users})

export default usersReducer;