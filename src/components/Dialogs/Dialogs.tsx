import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Textarea, createField } from '../common/FormsControls/FormsControls';
import DialogItem from './DialogItem/DialogItem'
import Classes from './Dialogs.module.css'
import Message from './Message/Message'
import { InitialStateType } from '../../redux/dialogs-reduser';





type OwnPropsType = {
  dialogsPage: InitialStateType
  sendMessage: (messageText: string) => void
}
type MapStateType = {

}
type MapDispathcType = {

}


export const Dialogs: React.FC<OwnPropsType> = (props) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} />)
  let messagesElements = state.messages.map(m => <Message key={m.id} message={m.message} />)

  let addNewMessage = (values: { newMessageBody: string }) => {
    props.sendMessage(values.newMessageBody);
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


const maxLength50 = maxLengthCreator(50);

type PropsType = {}

const AddMessageForm:React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<NewMessageFormTypeValuesKeysType>("Enter your message", "newMessageBody", [required, maxLength50], Textarea)}
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}


export type NewMessageFormValuesType ={
  newMessageBody:string
}


export type NewMessageFormTypeValuesKeysType = Extract <keyof NewMessageFormValuesType, string>


const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({ form: "dialogAddMessageForm" })(AddMessageForm)

export default Dialogs