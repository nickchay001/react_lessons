import { InferActionsTypes } from "./redux-store";


type DialogType = {
  id: number
  name: string
}
type MessageType = {
  id: number
  message: string
}

let initialState = {
  dialogs: [
    { id: 1, name: 'Dimych' },
    { id: 2, name: 'Yulia' },
    { id: 3, name: 'Stepan' },
    { id: 4, name: 'Viktor' },
    { id: 5, name: 'Karina' },
    { id: 6, name: 'Artem' },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How do you fill ?' },
    { id: 3, message: 'Sorry' },
    { id: 4, message: 'Yo' },
    { id: 5, message: 'Send me' },
    { id: 6, message: 'I love you' },
  ] as Array<MessageType>
}


const dialogsReducer = (state = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case 'my-socialnetwork/dialogs/SEND_MESSAGE':
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: body.length + 10, message: body }]
      };
    default:
      return state;
  }
}
export const actions = {
  sendMessageCreator: (newMessageBody: string) => ({ type: 'my-socialnetwork/dialogs/SEND_MESSAGE', newMessageBody } as const)
}
export default dialogsReducer;

export type InitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>
