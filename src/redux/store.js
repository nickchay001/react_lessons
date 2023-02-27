import dialogsReducer from "./dialogs-reduser";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reduser";



let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Hi, how are you', likesCount: 12 },
        { id: 1, message: 'Hi, i am fine', likesCount: 30 },
      ],
      newPostText: 'memuns'
    },
    dialogsPage: {
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
      newMessageBody: ""
    },
    sidebar: {

    },
  },




  _callSubscriber() {
    console.log('State chenged');
  },



  getState() {
    return this._state
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  }
}





export default store;
