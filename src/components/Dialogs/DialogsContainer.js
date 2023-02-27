import React, { Component } from 'react'
import { sendMessageCreator, updateNewMessageBodyCreater } from '../../redux/dialogs-reduser';
import Dialogs from './Dialogs';


export class DialogsContainer extends Component {

  render() {
    let state = this.props.store.getState().dialogsPage;

    let onSendMessageClick = () => {
      this.props.store.dispatch(sendMessageCreator())
    }
    let onNewMessageChange = (body) => {

      this.props.store.dispatch(updateNewMessageBodyCreater(body))
    }



    return (
     <Dialogs
     updateNewMessageBody={onNewMessageChange}
     sendMessage={onSendMessageClick}
     dialogsPage={state}/>
    )
  }
}

export default DialogsContainer