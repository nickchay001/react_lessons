import { connect } from 'react-redux';
import { sendMessageCreator, updateNewMessageBodyCreater } from '../../redux/dialogs-reduser';
import Dialogs from './Dialogs';




let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageBody: () => {
      dispatch(sendMessageCreator())
    },
    sendMessage: (body) => {
      dispatch(updateNewMessageBodyCreater(body))
    },
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);


export default DialogsContainer