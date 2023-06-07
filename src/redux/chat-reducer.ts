import { Dispatch } from "redux";
import { ChatMessageAPIType, StatusType, chatAPI } from "../api/chat-api";
import store, { BaseThunkType, InferActionsTypes } from "./redux-store";
import {v1} from 'uuid'


type ChatMassageType = ChatMessageAPIType & {id:string}


let initialState = {
    messages: [] as ChatMassageType[],
    status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'my-socialnetwor/chat/MESSAGES_RECEVIED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m=> ({...m, id:v1()}))]
                .filter((m, index, array) => index >= array.length - 100)
            }
        case 'my-socialnetwor/chat/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}

export const actions = {
    messagesRecevied: (messages: ChatMessageAPIType[]) => ({
        type: 'my-socialnetwor/chat/MESSAGES_RECEVIED', payload: { messages }
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'my-socialnetwor/chat/STATUS_CHANGED', payload: { status }
    } as const)
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesRecevied(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-recived', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-recived', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}



export default chatReducer


export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
export type DispatchTypes = typeof store.dispatch;