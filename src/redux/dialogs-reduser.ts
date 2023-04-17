const SEND_MESSAGE = 'my-network/dialogsPage/SEND-MESSAGE';

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

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: body.length + 10, message: body }]
      };
    default:
      return state;
  }
}

type SendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE
  newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType =>
  ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer;