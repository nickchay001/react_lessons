import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import DialogItem from './DialogItem/DialogItem'
import Classes from './Dialogs.module.css'
import Message from './Message/Message'







export class Dialogs extends Component {
  render() {
    let state = this.props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} />)
    let messagesElements = state.messages.map(m => <Message key={m.id} message={m.message} />)

    let addNewMessage = (values) => {
      this.props.sendMessage(values.newMessageBody);
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
          <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>
      </div>
    )
  }
}


const AddMessageForm = (props) => {
  return (
<form onSubmit={props.handleSubmit}>
            <div>
              <Field
                component="textarea"
                name="newMessageBody"
                placeholder="Enter your message"
              ></Field>
            </div>
            <div>
              <button>Send</button>
            </div>
          </form>
  )
}


const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs