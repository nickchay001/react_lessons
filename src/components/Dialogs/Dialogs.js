import React, { Component } from 'react'
import DialogItem from './DialogItem/DialogItem'
import Classes from './Dialogs.module.css'
import Message from './Message/Message'







export class Dialogs extends Component {

  render() {
    let state = this.props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} />)
    let messagesElements = state.messages.map(m => <Message key={m.id} message={m.message} />)
    let newMessageBody = state.newMessageBody;

    let onSendMessageClick = () => {
      this.props.sendMessage();  
    }
    let onNewMessageChange = (e) => {
      let body = e.target.value;
      this.props.updateNewMessageBody(body);
    }



    return (
      <div className={Classes.dialogs}>
        <div className={Classes.dialogsItems}>
          {dialogsElements}
        </div>
        <div>
          <div className={Classes.messages}>
            {messagesElements}
          </div>

          <div>
            <textarea
              value={newMessageBody}
              placeholder='Enter your message'
              onChange={onNewMessageChange}
            ></textarea>
          </div>
          <div>
            <button onClick={onSendMessageClick}>Send</button>
          </div>
        </div>

      </div>
    )
  }
}

export default Dialogs