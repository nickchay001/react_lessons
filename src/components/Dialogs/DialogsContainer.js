import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { sendMessageCreator, updateNewMessageBodyCreater } from '../../redux/dialogs-reduser';
import Dialogs from './Dialogs';




let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
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



export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthNavigate,
)(Dialogs)
