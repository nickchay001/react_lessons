import { Action, applyMiddleware, combineReducers, compose, createStore } from "@reduxjs/toolkit";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reduser";
import sidebarReducer from "./sidebar-reduser";
import usersReducer from "./users-reduser";
import authReducer from "./auth-reducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from "redux-form"
import appReducer from "./app-reducer";



let rootReduser = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})

type RootReduserType = typeof rootReduser
export type AppStateType = ReturnType<RootReduserType>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R , AppStateType , unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReduser, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.__store__ = store

export default store


