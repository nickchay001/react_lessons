import { connect } from 'react-redux';
import { sendMessageCreator, updateNewMessageBodyCreater } from '../../redux/dialogs-reduser';
import Dialogs from './Dialogs';




let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth,  
  }
  
}
let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => {
      dispatch(sendMessageCreator())
    },
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyCreater(body))
    },
  }
}


const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);


export default DialogsContainer