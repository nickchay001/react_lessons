import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { sendMessageCreator,} from '../../redux/dialogs-reduser';
import Dialogs from './Dialogs';




let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }

}
let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(sendMessageCreator(newMessageBody))
    },
  }
}



export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  //withAuthNavigate,
)(Dialogs)
