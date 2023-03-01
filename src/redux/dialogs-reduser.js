const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

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
  ],
  newMessageBody: '',
}

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY: {
      let stateCopy = { ...state };
      stateCopy.newMessageBody = action.body;
      return stateCopy;
    };
    case SEND_MESSAGE: {
      let stateCopy = { ...state };
      let body = stateCopy.newMessageBody;
      stateCopy.newMessageBody = '';
      stateCopy.messages = [ ...state.messages ];
      stateCopy.messages.push({ id: 7, message: body });
      return stateCopy;
    };
    default:
      return state;
  }
}


export const sendMessageCreator = () => ({ type: SEND_MESSAGE })
export const updateNewMessageBodyCreater = (body) =>
  ({ type: UPDATE_NEW_MESSAGE_BODY, body: body });

export default dialogsReducer;