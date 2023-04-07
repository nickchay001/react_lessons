const SEND_MESSAGE = 'my-network/dialogsPage/SEND-MESSAGE';

let initialState = {
  dialogs: [
    { id: 1, name: 'Dimych' },
    { id: 2, name: 'Yulia' },
    { id: 3, name: 'Stepan' },
    { id: 4, name: 'Viktor' },
    { id: 5, name: 'Karina' },
    { id: 6, name: 'Artem' },
  ],
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How do you fill ?' },
    { id: 3, message: 'Sorry' },
    { id: 4, message: 'Yo' },
    { id: 5, message: 'Send me' },
    { id: 6, message: 'I love you' },
  ]
}

const dialogsReducer = (state = initialState, action) => {
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


export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer;