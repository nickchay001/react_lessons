import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reduser";
import sidebarReducer from "./sidebar-reduser";
import usersReducer from "./users-reduser";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk"


let redusers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
})

let store = createStore(redusers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;